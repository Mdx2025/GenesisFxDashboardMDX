<script>
  /** @type {{ children: import('svelte').Snippet }} */
  let { children } = $props();
</script>

<button class="w-36 h-12 relative cursor-pointer group" type="button">
  <div class="w-36 h-12 absolute left-0 top-0 rounded-[30px] bg-linear-268 from-teal-950 to-black/0 border-[0.5px] border-zinc-300" aria-hidden="true"></div>
  <div class="w-36 h-12 absolute left-0 top-0 rounded-[30px] bg-black/10 shadow-[inset_0px_0px_4px_0px_rgba(16,188,131,0.59)] border border-white" aria-hidden="true"></div>

  <!-- Sparkle dots -->
  <svg class="absolute left-[139.89px] top-[27.87px]" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
    <circle cx="1.5" cy="1.5" r="0.5" fill="white" filter="url(#sparkle_blur)"/>
  </svg>
  <svg class="absolute left-[124.89px] top-[32.87px] opacity-50" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
    <circle cx="1.5" cy="1.5" r="0.5" fill="white" filter="url(#sparkle_blur)"/>
  </svg>
  <svg class="absolute left-[88.89px] top-[5.87px]" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
    <circle cx="1.5" cy="1.5" r="0.5" fill="#ACACAC" filter="url(#sparkle_blur)"/>
  </svg>
  <svg class="absolute left-[109.89px] top-[36.87px]" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
    <circle cx="1.5" cy="1.5" r="0.5" fill="#ACACAC" filter="url(#sparkle_blur)"/>
  </svg>
  <svg class="absolute left-[127.89px] top-[9.87px]" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
    <circle cx="1.5" cy="1.5" r="0.5" fill="#ACACAC" filter="url(#sparkle_blur)"/>
  </svg>
  <svg class="absolute left-[87.89px] top-[33.87px]" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
    <circle cx="1.5" cy="1.5" r="0.5" fill="#ACACAC" filter="url(#sparkle_blur)"/>
  </svg>
  <svg class="absolute left-[70.89px] top-[12.87px]" width="3" height="3" viewBox="0 0 3 3" fill="none" aria-hidden="true">
    <circle cx="1.5" cy="1.5" r="0.5" fill="#8C8C8C" filter="url(#sparkle_blur)"/>
  </svg>
  <svg class="absolute left-[12.89px] top-[29.87px]" width="4" height="3" viewBox="0 0 4 3" fill="none" aria-hidden="true">
    <ellipse cx="2" cy="1.5" rx="1" ry="0.5" fill="#8C8C8C" filter="url(#sparkle_blur)"/>
  </svg>

  <span class="absolute inset-0 flex items-center justify-center gap-2 text-gfx-neutral-500 text-base font-medium font-acid leading-6 relative z-10">
    {@render children()}
  </span>

  <!-- Shared filter definition -->
  <svg class="absolute w-0 h-0" aria-hidden="true">
    <defs>
      <filter id="sparkle_blur" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="0.5"/>
      </filter>
    </defs>
  </svg>
</button>
