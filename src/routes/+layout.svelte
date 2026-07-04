<script>
  import '../app.css';
  import 'lenis/dist/lenis.css';
  import { browser } from '$app/environment';

  let { children } = $props();

  let lenisInstance = $state(null);

  $effect(() => {
    if (!browser) return;

    let destroyed = false;
    let lenis;
    let rafId;

    import('lenis').then(({ default: Lenis }) => {
      if (destroyed) return;

      const wrapper = document.querySelector('main');
      if (!wrapper) return;

      lenis = new Lenis({
        wrapper,
        content: wrapper.firstElementChild,
        smoothWheel: true,
        lerp: 0.1,
        autoResize: true,
      });

      lenisInstance = lenis;

      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      destroyed = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
      lenisInstance = null;
    };
  });
</script>

{@render children()}
