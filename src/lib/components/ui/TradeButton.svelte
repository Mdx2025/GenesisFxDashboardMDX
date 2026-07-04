<script>
  /** @type {{ children: import('svelte').Snippet }} */
  let { children } = $props();
</script>

<button class="w-28 h-12 relative cursor-pointer group" type="button">
  <div class="w-28 h-11 absolute left-[7px] top-[3px] rounded-[276px] bg-gradient-to-b from-neutral-300/0 to-teal-700 blur-xl" aria-hidden="true"></div>
  <div class="w-28 h-12 absolute left-0 top-0 rounded-[240px] bg-gradient-to-b from-neutral-300/0 to-teal-400 blur-md" aria-hidden="true"></div>
  <div class="w-28 h-11 absolute left-0 top-[3px] rounded-[300px] bg-gradient-to-br from-neutral-300 via-teal-100 to-teal-100" aria-hidden="true"></div>
  <div class="w-28 h-11 absolute left-0 top-[3px] rounded-[300px] bg-gradient-to-l from-neutral-300 to-teal-200/0 blur-xs" aria-hidden="true"></div>
  <div class="w-28 h-11 absolute left-0 top-[3px] rounded-[300px] bg-gradient-to-l from-cyan-50 to-teal-200/0 blur-xs" aria-hidden="true"></div>
  <span class="absolute inset-0 flex items-center justify-center text-black text-base font-medium font-acid leading-6 relative z-10">
    {@render children()}
  </span>
</button>
