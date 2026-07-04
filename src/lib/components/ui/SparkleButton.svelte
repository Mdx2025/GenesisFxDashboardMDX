<script>
  /** @type {{ children: import('svelte').Snippet }} */
  let { children } = $props();
</script>

<button class="min-w-12 w-auto sm:w-36 h-12 px-4 sm:px-0 relative cursor-pointer group" type="button">
  <div class="absolute inset-0 rounded-[30px] bg-gradient-to-t from-[#1040308f] to-black/0" aria-hidden="true"></div>

  <!-- Fading border: solid top, fades toward bottom -->
  <div class="absolute inset-0 rounded-[30px] border border-zinc-300/60 pointer-events-none" style="mask-image:linear-gradient(to bottom, white 0%, transparent 80%);-webkit-mask-image:linear-gradient(to bottom, white 0%, transparent 80%)" aria-hidden="true"></div>

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

  <svg class="absolute w-0 h-0" aria-hidden="true">
    <defs>
      <filter id="sparkle_blur" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="0.5"/>
      </filter>
    </defs>
  </svg>
</button>
