import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';
import { EffectComposer, EffectPass, RenderPass, BloomEffect } from 'postprocessing';
import gsap from 'gsap';
import type { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { MODEL_URL } from './constants';
import {
  BLOOM_INTENSITY,
  BLOOM_SMOOTHING,
  BLOOM_THRESHOLD,
  PARTICLE_COLOR_A,
} from './defaults';

// A lightweight, self-contained point-cloud globe for the "Trading Sessions"
// section (/market-news). It reuses the homepage's earth idea — the same
// continents GLB sampled into a green THREE.Points cloud with a bloom glow — but
// none of the homepage scroll/water/statue machinery. Its whole job is to frame
// ONE hemisphere at a time and rotate between world locations ("focus"), so a
// pinned city always sits on the visible half of the planet.
//
// Rotation model: the GLOBE STAYS FIXED at the world origin, and OrbitControls
// orbits the CAMERA around that same origin — the globe's CENTROID — so vertical
// drag spins the globe in place rather than swinging it along an arc. The globe is
// framed low in the section NOT by orbiting an off-centre point, but by a constant
// camera-local tilt (framingPitch) applied AFTER each aim; keeping the orbit pivot on
// the centroid is what makes the rotation read as a true spin. This also gives the
// drag its inertial "accumulate + coast" feel for free (OrbitControls damping), and
// vertical drag limits come free too (native min/maxPolarAngle). Because a city's
// lat/lon are just spherical coordinates, "focus a city" is a direct map: its
// longitude → the camera's azimuthal angle (we tween the camera there); its latitude
// → how high on the visible hemisphere it sits.

export interface TradingGlobeMarker {
  id: string;
  lat: number;
  lon: number;
}

export interface MarkerScreenPos {
  id: string;
  x: number; // px within the canvas rect
  y: number;
  visible: boolean; // on the front (camera-facing) hemisphere
  // How directly the pin faces the camera: 1 = at the closest point of the globe
  // (dead-on), 0 = on the limb (silhouette edge), <0 = back side. Drives the
  // "bubble pops as it swings toward you" effect on the HTML pins.
  facing: number;
  // Size multiplier from distance to the camera (PIN_SCALE_MIN..MAX): closer pins
  // are larger. Apply as a CSS scale() on the pin element.
  scale: number;
}

export interface TradingGlobeHandle {
  ready: Promise<void>;
  focus: (id: string) => void;
  onFocusChange: (cb: (id: string) => void) => void;
  onFrame: (cb: (markers: MarkerScreenPos[]) => void) => void;
  dispose: () => void;
}

export interface TradingGlobeOptions {
  autoCycleMs?: number; // 0 disables auto-cycle
  initialId?: string;
  // Run the continuous animation loop (spin + auto-cycle). Defaults to prod only;
  // in dev we render a single static frame instead (cheaper, still shows on Stats).
  loop?: boolean;
}

const DEG = Math.PI / 180;
const SAMPLE_COUNT = 30000;

// --- Framing / staging tunables (safe to nudge) --------------------------------
// The globe is fixed at the world origin; the camera orbits it (OrbitControls).
// These set the *initial* framing camera — distance, height, and the point it
// aims at. From that position OrbitControls derives the base polar (tilt) angle
// that the vertical-drag limit is centred on.
const CAMERA_Z = 2.7; // initial orbit distance (smaller = closer/larger globe)
const CAMERA_HEIGHT = 1; // initial camera height (higher = looks down more steeply)
// Framing only: how far ABOVE the pivot the camera aims, pushing the globe low in
// frame. Applied as a constant camera-local tilt (framingPitch) AFTER the camera is
// aimed at the centroid — NOT as an offset orbit pivot — so vertical drag still
// rotates about the globe's centre. See orbitPivot / recomputeFramingPitch.
const LOOK_AT_HEIGHT = 0.4;
const MARKER_LIFT = 1.015; // seat marker anchors just off the surface
// Vertical alpha fade in VIEW (camera) space — a curtain fixed to the bottom of
// the screen, not the globe. Points at/above FADE_TOP (view Y) are opaque; they
// fade to fully transparent by FADE_BOTTOM, so the bottom of the framing dissolves
// into the background (no visible section edge). Being camera-relative, tilting
// the globe (vertical drag) lifts lower cities like Sydney above the fade so they
// can be seen. Tunable live via the GUI "Bottom fade" folder.
const FADE_TOP = 0.45;
const FADE_BOTTOM = -0.575;
// Depth cue. Point clouds read flat because near and far points blend the same
// (transparent, no depth-write). We dim points by their DISTANCE from the camera
// so the far side of the globe recedes — a soft fog that restores roundness.
// The camera orbits at ~CAMERA_Z, unit-radius sphere, so the front surface sits
// near (dist ≈ CAMERA_Z − 1) and the back near (dist ≈ CAMERA_Z + 1).
const DEPTH_NEAR = CAMERA_Z - 1; // fully bright at/closer than this distance
const DEPTH_FAR = CAMERA_Z + 1; // dimmest at/beyond this distance
const DEPTH_MIN = 0.18; // floor alpha for far points (keep a faint silhouette)
// Depth colour-grade. Beyond dimming, we also shift the point HUE by distance:
// the closest points glow bright mint, the far side recedes into a deep green.
// Colour depth reads much stronger than alpha alone, so the globe feels rounder.
const DEPTH_COLOR_NEAR = '#7dffe0'; // brightest, closest points
const DEPTH_COLOR_FAR = '#064b34'; // far side — deep green (matches the pin accents)
// Atmosphere halo. A back-side sphere shell just outside the cloud with a fresnel
// (rim) glow: brightest at the limb, fading toward centre. Additive so it only
// adds light around the silhouette, giving the globe volume + an eye-catching
// edge. Intensity can exceed 1 to feed the bloom pass.
const ATMOSPHERE_COLOR = '#2fe6b4'; // rim glow colour
const ATMOSPHERE_SCALE = 1.01; // radius vs the unit cloud (bounding radius ≈ 1)
const ATMOSPHERE_POWER = 2; // rim falloff — higher = tighter to the limb
const ATMOSPHERE_INTENSITY = 0.625; // brightness (>1 overdrives into bloom)
// Outer-edge feather. The fresnel peaks AT the silhouette (hard cut); this fades
// it back to 0 as the rim approaches the very edge, so the glow dissolves into
// the background instead of ending abruptly. Lower = softer/wider feather.
const ATMOSPHERE_EDGE = 0.7;
// HTML pin size vs. distance to the camera: a pin at the closest point of the
// globe scales to PIN_SCALE_MAX, one on the far limb to PIN_SCALE_MIN, so pins
// grow as they swing toward you (reinforces the depth / pop).
const PIN_SCALE_MIN = 0.72;
const PIN_SCALE_MAX = 1.15;
// Base orientation of the sampled cloud. The continents model's poles sit on Z
// (same as the homepage globe), so tilt -90° about X to stand it upright with
// north at +Y — that makes the standard lat/lon math below land on the cloud.
const CLOUD_TILT = new THREE.Euler(-Math.PI / 2, 0, 0);
// --- Pin ⇄ cloud alignment ----------------------------------------------------
// The cloud is our fixed source of truth for *shape* (we never mirror it, or the
// continents would come out backwards). Instead we align the PINS to it with two
// controls, because two independent mismatches are possible:
//
//   1. Handedness (mirror). The sampled model's east-west winding may be opposite
//      to the standard lat/lon formula, so increasing longitude runs the wrong way
//      (e.g. New York ends up EAST of London). A rotation can never fix a mirror —
//      only flipping longitude's sign does. LON_DIR is that flip: +1 or -1.
//   2. Meridian offset. The model's zero-longitude isn't Greenwich, so after the
//      handedness is right, every pin is still off by one constant rotation about
//      the pole. LON_OFFSET (degrees) dials that out.
//
// Calibrate LON_DIR first (flip until NYC sits WEST of London), then LON_OFFSET
// (rotate until a coast lines up). Both are live in the GUI "Globe" folder; paste
// the final values here.
const LON_DIR = -1; // +1 or -1 — mirrors east/west (negates lon → flips the pin's z)
const LON_OFFSET = 0; // degrees — rotates all pins about the pole onto Greenwich
// How far, each way, the user may drag the camera vertically off the base
// framing tilt (radians of polar angle). Enforced natively by OrbitControls'
// min/maxPolarAngle; adjustable live via the lil-gui "Drag" folder.
const DRAG_VERTICAL_LIMIT = Math.PI; // 180° each way — effectively unlimited vertical tilt (clamps land at the poles). Lower it to fence the vertical drag.
const AUTO_RESUME_DELAY = 4000; // ms idle after a drag before auto-cycle resumes
const CONTROLS_DAMPING = 0.01; // lower = longer, floatier coast after release
const CONTROLS_ROTATE_SPEED = 1;
// How much a click/focus also tilts the camera vertically toward the city.
// 0 = azimuth-only (old behaviour, city stays at its natural height); 1 = fully
// centre the city on screen. Partial keeps far-south cities like Sydney from
// swinging the camera too hard. Live in the GUI "Camera" folder.
const FOCUS_TILT = 1;
// Focus / auto-cycle sweep between cities. Longer + a gentle in-out ease reads as
// a graceful glide rather than a fast snap (auto-cycle calls focus() on a timer).
const FOCUS_DURATION = 2.6; // seconds per city-to-city sweep
const FOCUS_EASE = 'power2.inOut';

// Unit direction (north pole +Y, lon 0 along +X) for a lat/lon, in the fixed
// world frame the globe sits in. `dir` flips east/west handedness and `offsetDeg`
// rotates the meridian onto Greenwich (see LON_DIR / LON_OFFSET above).
function latLonToUnit(
  lat: number,
  lon: number,
  dir: number,
  offsetDeg: number,
): THREE.Vector3 {
  const phi = (90 - lat) * DEG;
  const theta = (lon * dir + offsetDeg) * DEG;
  return new THREE.Vector3(
    Math.sin(phi) * Math.cos(theta),
    Math.cos(phi),
    Math.sin(phi) * Math.sin(theta),
  );
}

export function initTradingGlobe(
  canvas: HTMLCanvasElement,
  markers: TradingGlobeMarker[],
  options: TradingGlobeOptions = {},
): TradingGlobeHandle {
  const { autoCycleMs = 5000, initialId } = options;
  // Continuous loop in production; a single static frame in dev (see `loop` above).
  const shouldLoop = options.loop ?? import.meta.env.PROD;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: true, // transparent so the section's black + bottom fade show through
    powerPreference: 'high-performance',
    stencil: false,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;

  const rect = canvas.getBoundingClientRect();
  let width = Math.max(1, rect.width);
  let height = Math.max(1, rect.height);
  renderer.setSize(width, height, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
  // The camera orbits (and pins its rotation to) the GLOBE CENTROID = world origin,
  // so vertical drag spins the globe in place instead of swinging it in an arc.
  const orbitPivot = new THREE.Vector3(0, 0, 0);
  camera.position.set(0, CAMERA_HEIGHT, CAMERA_Z);

  // Framing is decoupled from the orbit pivot: after the camera is aimed at the
  // centroid, we tilt it up by a CONSTANT camera-local pitch so the globe sits low in
  // frame. Because the tilt is constant in camera space it produces a fixed screen-space
  // offset for every orbit orientation — the globe centre stays put on screen while the
  // surface rotates. `lookAtY` is the aim height that defines this tilt (framing only).
  let lookAtY = LOOK_AT_HEIGHT;
  let framingPitch = 0;
  const _fpRight = new THREE.Vector3();
  const _fpDir = new THREE.Vector3();
  const _fpAim = new THREE.Vector3();
  const _fpAxis = new THREE.Vector3();
  // Derive the constant tilt from the CURRENT (reference) camera: the signed angle,
  // about the camera's local X, from "look at the pivot" to "look at lookAtY above it".
  // Recompute only when the reference deliberately changes (initial framing, GUI
  // distance / look-height) — never while orbiting, so it stays a fixed screen offset.
  const recomputeFramingPitch = () => {
    camera.lookAt(orbitPivot);
    camera.updateMatrixWorld();
    _fpRight.setFromMatrixColumn(camera.matrixWorld, 0).normalize();
    _fpDir.copy(orbitPivot).sub(camera.position).normalize();
    _fpAim.set(0, lookAtY, 0).sub(camera.position).normalize();
    const angle = _fpDir.angleTo(_fpAim);
    _fpAxis.crossVectors(_fpDir, _fpAim);
    framingPitch = angle * (Math.sign(_fpAxis.dot(_fpRight)) || 1);
  };
  // Re-add the framing tilt on top of an aim at the pivot. Callers MUST have just aimed
  // the camera at the pivot (OrbitControls.update / camera.lookAt(orbitPivot)) so this
  // applies to a fresh orientation rather than accumulating.
  const frameCamera = () => {
    camera.rotateX(framingPitch);
  };
  recomputeFramingPitch();
  frameCamera();

  // --- Bloom composer (matches the homepage globe's soft green glow) ----------
  const composer = new EffectComposer(renderer, {
    frameBufferType: THREE.HalfFloatType,
  });
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new BloomEffect({
    intensity: BLOOM_INTENSITY,
    luminanceThreshold: BLOOM_THRESHOLD,
    luminanceSmoothing: BLOOM_SMOOTHING,
    mipmapBlur: true,
    // Overridden from the shared BLOOM_RADIUS default (0.85) — this section's
    // tighter framing/closer camera reads better with a smaller bloom radius.
    radius: 0.45,
  });
  composer.addPass(new EffectPass(camera, bloom));
  composer.setSize(width, height);

  // --- Globe: fixed at the origin. `cloud` holds the upright base tilt; the
  // markers ride the same frame. Nothing here ever rotates — the camera moves.
  const globe = new THREE.Group();
  scene.add(globe);

  const markerState = markers.map((m) => ({
    ...m,
    anchor: new THREE.Object3D(),
  }));

  let resolveReady!: () => void;
  const ready = new Promise<void>((res) => {
    resolveReady = res;
  });

  let focusChangeCb: ((id: string) => void) | null = null;
  let frameCb: ((markers: MarkerScreenPos[]) => void) | null = null;
  let activeId = initialId ?? markers[0]?.id ?? '';
  let focusTween: gsap.core.Tween | null = null;
  let cloud: THREE.Points | null = null;
  let atmosphere: THREE.Mesh | null = null;
  // Representative radius of the cloud's surface shell, measured from the sampled
  // points once loaded. Markers are seated on this (× MARKER_LIFT) so they hug the
  // real surface rather than the bounding-sphere radius (the outermost point).
  let cloudRadius = 1;
  // OrbitControls is now the real end-user control (not dev-only). Loaded async.
  let controls: OrbitControls | null = null;
  let resumeTimer: ReturnType<typeof setTimeout> | null = null;
  // Live vertical-drag limit, adjustable via the GUI. (The framing aim height `lookAtY`
  // and its derived `framingPitch` are declared with the camera setup above.)
  let polarLimit = DRAG_VERTICAL_LIMIT;
  // How far a focus tilts toward centring the city vertically (see FOCUS_TILT).
  let focusTilt = FOCUS_TILT;
  // Live pin ⇄ cloud alignment (see LON_DIR / LON_OFFSET). `lonDir` flips
  // east/west handedness; `lonOffset` (degrees) rotates the pins onto Greenwich.
  let lonDir = LON_DIR;
  let lonOffset = LON_OFFSET;
  // A city's world direction under the current alignment.
  const geoUnit = (m: TradingGlobeMarker): THREE.Vector3 =>
    latLonToUnit(m.lat, m.lon, lonDir, lonOffset);
  // Re-seat every pin for the current alignment and re-face the active city
  // (called whenever the flip/offset changes in the GUI).
  const reseatMarkers = () => {
    if (!cloud) return; // anchors are seated on load; nothing to move before then
    markerState.forEach((m) => {
      m.anchor.position.copy(geoUnit(m)).multiplyScalar(cloudRadius * MARKER_LIFT);
    });
    const active = markerState.find((s) => s.id === activeId) ?? markerState[0];
    if (active) applyAzimuth(azimuthFor(active));
  };
  // Base framing polar (camera tilt) that the vertical limit is centred on;
  // computed from the framing camera once OrbitControls exists.
  let basePolar = Math.PI / 2;
  // Live uniforms for the vertical alpha fade (injected via onBeforeCompile).
  const fadeTopUniform = { value: FADE_TOP };
  const fadeBottomUniform = { value: FADE_BOTTOM };
  // Live uniforms for the depth (distance) dimming — the roundness cue.
  const depthNearUniform = { value: DEPTH_NEAR };
  const depthFarUniform = { value: DEPTH_FAR };
  const depthMinUniform = { value: DEPTH_MIN };
  const depthColorNearUniform = { value: new THREE.Color(DEPTH_COLOR_NEAR) };
  const depthColorFarUniform = { value: new THREE.Color(DEPTH_COLOR_FAR) };
  // Live uniforms for the atmosphere rim glow (shared with its ShaderMaterial).
  const atmoColorUniform = { value: new THREE.Color(ATMOSPHERE_COLOR) };
  const atmoPowerUniform = { value: ATMOSPHERE_POWER };
  const atmoIntensityUniform = { value: ATMOSPHERE_INTENSITY };
  const atmoEdgeUniform = { value: ATMOSPHERE_EDGE };

  // Scratch vectors for the camera-orbit math (reused each frame — no allocs).
  const _offset = new THREE.Vector3();
  const _spherical = new THREE.Spherical();

  // Re-establish the framing after the aim height (lookAtY) changes. The orbit pivot
  // stays the centroid; only the constant framing tilt is recomputed and re-applied.
  const reaim = () => {
    recomputeFramingPitch();
    controls?.target.copy(orbitPivot);
    controls?.update();
    frameCamera();
  };

  // Clamp the user's vertical (polar) drag to ±polarLimit around the base tilt.
  const applyPolarLimits = () => {
    if (!controls) return;
    controls.minPolarAngle = Math.max(0.001, basePolar - polarLimit);
    controls.maxPolarAngle = Math.min(Math.PI - 0.001, basePolar + polarLimit);
  };

  // Derive the base framing tilt from the current camera, then re-apply limits.
  const recomputeBasePolar = () => {
    _offset.copy(camera.position).sub(orbitPivot);
    const len = _offset.length() || 1;
    basePolar = Math.acos(THREE.MathUtils.clamp(_offset.y / len, -1, 1));
    applyPolarLimits();
  };

  // The camera's azimuth (about world Y) that puts a city's longitude in front of
  // us. A city's lat/lon → a world direction; its azimuth = atan2(x, z) matches
  // OrbitControls' Spherical.theta convention, so this is a direct mapping.
  const azimuthFor = (m: TradingGlobeMarker): number => {
    const dir = geoUnit(m);
    return Math.atan2(dir.x, dir.z);
  };

  // Orbit the camera to a given azimuth, keeping its current distance + polar
  // (so the user's vertical tilt and any distance tuning are preserved, and
  // north stays up). Works before OrbitControls loads too (falls back to lookAt).
  const applyAzimuth = (theta: number) => {
    _offset.copy(camera.position).sub(orbitPivot);
    _spherical.setFromVector3(_offset);
    _spherical.theta = theta;
    _spherical.makeSafe();
    _offset.setFromSpherical(_spherical);
    camera.position.copy(orbitPivot).add(_offset);
    if (controls) controls.update();
    else camera.lookAt(orbitPivot);
    frameCamera();
  };

  // Orbit the camera to a given azimuth AND polar (keeping the current distance).
  // Used by focus so a click can both swing east-west and tilt vertically toward
  // the city. controls.update() re-clamps phi to any active min/maxPolarAngle.
  const applyOrbit = (theta: number, phi: number) => {
    _offset.copy(camera.position).sub(orbitPivot);
    _spherical.setFromVector3(_offset);
    _spherical.theta = theta;
    _spherical.phi = phi;
    _spherical.makeSafe();
    _offset.setFromSpherical(_spherical);
    camera.position.copy(orbitPivot).add(_offset);
    if (controls) controls.update();
    else camera.lookAt(orbitPivot);
    frameCamera();
  };

  // The polar angle (about the centroid pivot) that vertically centres a city on the
  // visible hemisphere. The framing tilt then rides on top, same as any other aim.
  const centerPhiFor = (m: TradingGlobeMarker): number => {
    const off = geoUnit(m).sub(orbitPivot);
    return Math.acos(THREE.MathUtils.clamp(off.y / (off.length() || 1), -1, 1));
  };

  const focus = (id: string) => {
    const m = markerState.find((s) => s.id === id);
    if (!m) return;
    activeId = id;
    focusChangeCb?.(id);
    const to = azimuthFor(m);
    // Vertical target: blend from the resting tilt toward fully centring the city
    // by `focusTilt` (0 = no tilt, 1 = centred). Blending from basePolar keeps the
    // destination consistent regardless of where the user last dragged.
    const toPhi = basePolar + focusTilt * (centerPhiFor(m) - basePolar);
    _offset.copy(camera.position).sub(orbitPivot);
    const from = Math.atan2(_offset.x, _offset.z);
    _spherical.setFromVector3(_offset);
    const fromPhi = _spherical.phi;
    // Shortest angular path (wrap the delta into [-π, π]) so it never spins the
    // long way round.
    let delta = to - from;
    delta = Math.atan2(Math.sin(delta), Math.cos(delta));
    focusTween?.kill();
    const proxy = { t: 0 };
    focusTween = gsap.to(proxy, {
      t: 1,
      duration: FOCUS_DURATION,
      ease: FOCUS_EASE,
      onUpdate: () =>
        applyOrbit(from + delta * proxy.t, fromPhi + (toPhi - fromPhi) * proxy.t),
    });
  };

  // --- Load + sample the continents GLB into the point cloud ------------------
  const loader = new GLTFLoader();
  loader.load(
    MODEL_URL,
    (gltf) => {
      let sourceMesh: THREE.Mesh | null = null;
      gltf.scene.traverse((child) => {
        if (!sourceMesh && (child as THREE.Mesh).isMesh) {
          sourceMesh = child as THREE.Mesh;
        }
      });
      if (!sourceMesh) {
        console.error('[trading-globe] no mesh to sample in', MODEL_URL);
        resolveReady();
        return;
      }

      const sampler = new MeshSurfaceSampler(sourceMesh).build();
      const temp = new THREE.Vector3();
      const positions = new Float32Array(SAMPLE_COUNT * 3);
      for (let i = 0; i < SAMPLE_COUNT; i++) {
        sampler.sample(temp);
        positions[i * 3] = temp.x;
        positions[i * 3 + 1] = temp.y;
        positions[i * 3 + 2] = temp.z;
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      // Centre + normalise to a unit sphere so the framing constants above are
      // model-independent.
      geometry.computeBoundingSphere();
      const bs = geometry.boundingSphere!;
      geometry.translate(-bs.center.x, -bs.center.y, -bs.center.z);
      geometry.scale(1 / bs.radius, 1 / bs.radius, 1 / bs.radius);

      // Measure the mean distance of the (now normalised, in-place) points from
      // the centre. bs.radius put the *outermost* point at 1, so the average
      // shell sits below that — seat markers on this real radius, not a flat 1.
      let radiusSum = 0;
      for (let i = 0; i < SAMPLE_COUNT; i++) {
        radiusSum += Math.hypot(
          positions[i * 3],
          positions[i * 3 + 1],
          positions[i * 3 + 2],
        );
      }
      cloudRadius = radiusSum / SAMPLE_COUNT;

      const material = new THREE.PointsMaterial({
        color: new THREE.Color(PARTICLE_COLOR_A),
        size: 0.01,
        transparent: true,
        depthWrite: false,
        alphaMap: new THREE.TextureLoader().load('/images/glow.png'),
      });
      // Vertical alpha fade: multiply each point's alpha by a smoothstep of its
      // VIEW-space Y, so the bottom of the *screen* dissolves into the background
      // (a curtain anchored to the camera, not the geometry). Because it follows
      // the camera, tilting the globe lifts lower cities above the fade to reveal
      // them. View Y is a varying; the fade edges are live uniforms.
      material.onBeforeCompile = (shader) => {
        shader.uniforms.uFadeTop = fadeTopUniform;
        shader.uniforms.uFadeBottom = fadeBottomUniform;
        shader.uniforms.uDepthNear = depthNearUniform;
        shader.uniforms.uDepthFar = depthFarUniform;
        shader.uniforms.uDepthMin = depthMinUniform;
        shader.uniforms.uColorNear = depthColorNearUniform;
        shader.uniforms.uColorFar = depthColorFarUniform;
        shader.vertexShader = shader.vertexShader
          .replace(
            '#include <common>',
            '#include <common>\nvarying float vFadeY;\nvarying float vDepth;',
          )
          // Compute the view-space position once; feed both the bottom fade
          // (view Y) and the depth cue (distance from camera = −view Z).
          .replace(
            '#include <begin_vertex>',
            '#include <begin_vertex>\nvec4 vGlobeView = modelViewMatrix * vec4( transformed, 1.0 );\nvFadeY = vGlobeView.y;\nvDepth = -vGlobeView.z;',
          );
        shader.fragmentShader = shader.fragmentShader
          .replace(
            '#include <common>',
            '#include <common>\nvarying float vFadeY;\nvarying float vDepth;\nuniform float uFadeTop;\nuniform float uFadeBottom;\nuniform float uDepthNear;\nuniform float uDepthFar;\nuniform float uDepthMin;\nuniform vec3 uColorNear;\nuniform vec3 uColorFar;',
          )
          // map_particle_fragment applies the alphaMap for points; grade after it.
          // One depth factor (1 near → 0 far) drives BOTH the colour grade (bright
          // mint → deep green) and the alpha dimming, so the far side recedes in
          // hue and opacity and the globe reads round.
          .replace(
            '#include <map_particle_fragment>',
            '#include <map_particle_fragment>\nfloat vDepthT = smoothstep( uDepthFar, uDepthNear, vDepth );\ndiffuseColor.rgb = mix( uColorFar, uColorNear, vDepthT );\ndiffuseColor.a *= smoothstep( uFadeBottom, uFadeTop, vFadeY );\ndiffuseColor.a *= mix( uDepthMin, 1.0, vDepthT );',
          );
      };
      cloud = new THREE.Points(geometry, material);
      cloud.setRotationFromEuler(CLOUD_TILT); // stand upright; north → +Y
      globe.add(cloud);

      // Atmosphere halo: a back-side sphere shell just outside the cloud with a
      // fresnel rim glow. Additive, no depth-write, and faded at the bottom in
      // view space (same curtain as the cloud) so it dissolves into the section
      // instead of drawing a hard ring under the framing.
      atmosphere = new THREE.Mesh(
        new THREE.SphereGeometry(1, 64, 64),
        new THREE.ShaderMaterial({
          uniforms: {
            uColor: atmoColorUniform,
            uPower: atmoPowerUniform,
            uIntensity: atmoIntensityUniform,
            uEdge: atmoEdgeUniform,
            uFadeTop: fadeTopUniform,
            uFadeBottom: fadeBottomUniform,
          },
          vertexShader: `
            varying vec3 vWorldNormal;
            varying vec3 vViewDir;
            varying float vFadeY;
            void main() {
              vec4 worldPos = modelMatrix * vec4( position, 1.0 );
              vWorldNormal = normalize( mat3( modelMatrix ) * normal );
              vViewDir = normalize( cameraPosition - worldPos.xyz );
              vec4 mvPos = viewMatrix * worldPos;
              vFadeY = mvPos.y;
              gl_Position = projectionMatrix * mvPos;
            }
          `,
          fragmentShader: `
            varying vec3 vWorldNormal;
            varying vec3 vViewDir;
            varying float vFadeY;
            uniform vec3 uColor;
            uniform float uPower;
            uniform float uIntensity;
            uniform float uEdge;
            uniform float uFadeTop;
            uniform float uFadeBottom;
            void main() {
              float f = 1.0 - abs( dot( vWorldNormal, vViewDir ) );
              float rim = pow( f, uPower );
              // Feather the outermost edge back to 0 so the halo dissolves into
              // the background instead of hard-cutting at the silhouette.
              float outer = 1.0 - smoothstep( uEdge, 1.0, f );
              float fade = smoothstep( uFadeBottom, uFadeTop, vFadeY );
              float glow = rim * outer * fade;
              // Drive ALPHA with the same fresnel so zero-glow areas (centre,
              // feathered edge, faded bottom) stay transparent instead of stamping
              // an opaque black disc. Colour is premultiplied by glow, so the
              // custom One/One blend below is a true additive glow that can still
              // overdrive past 1 (uIntensity) into the bloom pass.
              gl_FragColor = vec4( uColor * glow * uIntensity, glow );
            }
          `,
          transparent: true,
          side: THREE.BackSide,
          // Premultiplied additive: rgb adds to the frame, alpha accumulates the
          // glow so the halo composites correctly over the transparent canvas.
          blending: THREE.CustomBlending,
          blendEquation: THREE.AddEquation,
          blendSrc: THREE.OneFactor,
          blendDst: THREE.OneFactor,
          depthWrite: false,
        }),
      );
      atmosphere.scale.setScalar(ATMOSPHERE_SCALE);
      globe.add(atmosphere);

      // Seat each marker anchor just off the surface at its lat/lon (under the
      // current pin alignment). The camera orbits to face them; anchors only move
      // when the GUI flip/offset changes (reseatMarkers).
      markerState.forEach((m) => {
        m.anchor.position.copy(geoUnit(m)).multiplyScalar(cloudRadius * MARKER_LIFT);
        globe.add(m.anchor);
      });

      // Snap the camera to the initial location's azimuth (no animation).
      applyAzimuth(
        azimuthFor(markerState.find((s) => s.id === activeId) ?? markerState[0]),
      );
      focusChangeCb?.(activeId);

      // Debug GUI removed for dashboard build (stats.js/lil-gui not bundled)

      // Dev / non-loop: paint the initial static frame now that the cloud exists
      // (if the section is already on screen; otherwise the IO draws it on entry).
      if (!shouldLoop) renderOnce();

      resolveReady();
    },
    undefined,
    (err) => {
      console.error('[trading-globe] failed to load GLB', err);
      resolveReady();
    },
  );

  // --- Per-frame marker projection (drives the HTML pins) ---------------------
  const worldPos = new THREE.Vector3();
  const globeCenter = new THREE.Vector3();
  const centerToAnchor = new THREE.Vector3();
  const camDir = new THREE.Vector3();

  const projectMarkers = () => {
    if (!frameCb || !cloud) return;
    globe.getWorldPosition(globeCenter);
    // Marker seat radius + camera→centre distance, so pin distance maps to a
    // size the same way regardless of zoom: near point → 1, far side → 0.
    const markerRadius = cloudRadius * MARKER_LIFT * globe.scale.x;
    const camToCenter = camera.position.distanceTo(globeCenter);
    const out: MarkerScreenPos[] = markerState.map((m) => {
      m.anchor.getWorldPosition(worldPos);
      centerToAnchor.copy(worldPos).sub(globeCenter).normalize();
      camDir.copy(camera.position).sub(worldPos).normalize();
      const facing = centerToAnchor.dot(camDir);
      const front = facing > 0.12;
      const dist = camera.position.distanceTo(worldPos);
      const t = THREE.MathUtils.clamp(
        (camToCenter + markerRadius - dist) / (2 * markerRadius),
        0,
        1,
      );
      worldPos.project(camera);
      return {
        id: m.id,
        x: (worldPos.x * 0.5 + 0.5) * width,
        y: (-worldPos.y * 0.5 + 0.5) * height,
        visible: front && worldPos.z < 1,
        facing,
        scale: PIN_SCALE_MIN + (PIN_SCALE_MAX - PIN_SCALE_MIN) * t,
      };
    });
    frameCb(out);
  };

  // --- Render loop, gated on visibility ---------------------------------------
  const timer = new THREE.Timer(); // Clock is deprecated in three ≥0.184
  let running = false;
  const renderFrame = () => {
    // stats removed
    timer.update();
    const dt = Math.min(timer.getDelta(), 0.05);
    // Re-aim at the pivot (OrbitControls does this when present; damping settles here),
    // then re-add the constant framing tilt. Re-aiming every frame is required so the
    // tilt applies to a fresh orientation instead of accumulating.
    if (controls) controls.update();
    else camera.lookAt(orbitPivot);
    frameCamera();
    composer.render(dt);
    projectMarkers();
    // stats removed
  };
  let visible = false;
  const start = () => {
    if (running) return;
    running = true;
    timer.reset(); // avoid a huge first delta after a pause
    renderer.setAnimationLoop(renderFrame);
  };
  const stop = () => {
    if (!running) return;
    running = false;
    renderer.setAnimationLoop(null);
  };
  // Single-frame render (dev / non-loop mode) — only when on screen.
  const renderOnce = () => {
    if (visible) renderFrame();
  };

  // Auto-cycle through the markers; paused whenever rendering is paused, or while
  // the user is dragging (see the OrbitControls 'start'/'end' handlers below).
  // `autoCycleEnabled` is a live master switch (GUI toggle) — off means it never
  // starts, regardless of visibility/idle-resume.
  let cycleTimer: ReturnType<typeof setInterval> | null = null;
  let autoCycleEnabled = true;
  const startCycle = () => {
    if (!autoCycleEnabled) return;
    if (cycleTimer || autoCycleMs <= 0 || markerState.length < 2) return;
    cycleTimer = setInterval(() => {
      const i = markerState.findIndex((s) => s.id === activeId);
      focus(markerState[(i + 1) % markerState.length].id);
    }, autoCycleMs);
  };
  const stopCycle = () => {
    if (cycleTimer) clearInterval(cycleTimer);
    cycleTimer = null;
  };

  // --- OrbitControls: the real end-user rotation control ----------------------
  // Orbits the camera around the fixed globe. Damping gives the "drag accumulates
  // then coasts" feel; enableZoom/enablePan are off so it's rotate-only; the
  // vertical range is clamped via min/maxPolarAngle (see applyPolarLimits). User
  // grabs pause the auto-cycle and cancel any in-flight focus tween; releases
  // schedule a resume. Every frame the render loop calls controls.update().
  canvas.style.cursor = 'grab';
  canvas.style.touchAction = 'none'; // dragging the globe shouldn't scroll the page
  import('three/addons/controls/OrbitControls.js').then(({ OrbitControls: OC }) => {
    const c = new OC(camera, renderer.domElement);
    c.enableDamping = true;
    c.dampingFactor = CONTROLS_DAMPING;
    c.rotateSpeed = CONTROLS_ROTATE_SPEED;
    c.enableZoom = false; // orbit distance is a design constant / GUI-tuned, not user zoom
    c.enablePan = false;
    c.target.copy(orbitPivot);

    c.addEventListener('start', () => {
      focusTween?.kill(); // a user grab overrides the auto-focus tween
      stopCycle();
      if (resumeTimer) clearTimeout(resumeTimer);
      canvas.style.cursor = 'grabbing';
    });
    c.addEventListener('end', () => {
      canvas.style.cursor = 'grab';
      // Resume the auto-cycle from wherever the user left off, once idle.
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => startCycle(), AUTO_RESUME_DELAY);
    });

    controls = c;
    recomputeBasePolar(); // base tilt + polar limits from the framing camera
    recomputeFramingPitch(); // constant framing tilt from this reference camera
    c.update();
    frameCamera();

    // Non-loop (dev static) mode has no continuous loop, but damping needs
    // per-frame updates while it eases — run one for the duration of a drag +
    // settle, then park it again.
    if (!shouldLoop) {
      let settleTimer: ReturnType<typeof setTimeout>;
      const runWhileOrbiting = () => {
        renderer.setAnimationLoop(renderFrame);
        clearTimeout(settleTimer);
        settleTimer = setTimeout(() => renderer.setAnimationLoop(null), 700);
      };
      c.addEventListener('start', runWhileOrbiting);
      c.addEventListener('change', runWhileOrbiting);
    }
  });

  // While on screen + tab visible: run the loop (prod) or draw one frame (dev).
  const io = new IntersectionObserver(
    (entries) => {
      visible = entries.some((e) => e.isIntersecting) && !document.hidden;
      if (visible) {
        if (shouldLoop) {
          start();
          startCycle();
        } else {
          renderOnce();
        }
      } else if (shouldLoop) {
        stop();
        stopCycle();
      }
    },
    { threshold: 0.05 },
  );
  io.observe(canvas);

  const onVisibility = () => {
    if (document.hidden) {
      visible = false;
      stop();
      stopCycle();
    }
  };
  document.addEventListener('visibilitychange', onVisibility);

  // --- Resize -----------------------------------------------------------------
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      width = Math.max(1, Math.floor(entry.contentRect.width));
      height = Math.max(1, Math.floor(entry.contentRect.height));
      renderer.setSize(width, height, false);
      composer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      // Non-loop mode won't repaint on its own — redraw the static frame.
      if (!shouldLoop) renderOnce();
    }
  });
  resizeObserver.observe(canvas);

  const dispose = () => {
    focusTween?.kill();
    stop();
    stopCycle();
    if (resumeTimer) clearTimeout(resumeTimer);
    controls?.dispose();
    io.disconnect();
    resizeObserver.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    composer.dispose();
    renderer.dispose();
    scene.traverse((obj) => {
      const mesh = obj as THREE.Points;
      if (mesh.geometry) mesh.geometry.dispose();
      const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mat)) mat.forEach((mm) => mm.dispose());
      else if (mat) mat.dispose();
    });
  };

  return {
    ready,
    focus,
    onFocusChange: (cb) => {
      focusChangeCb = cb;
    },
    onFrame: (cb) => {
      frameCb = cb;
    },
    dispose,
  };
}
