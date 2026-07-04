<script>
  /** @type {{ title: string, subtitle: string, icon: import('svelte').Snippet }} */
  let { title, subtitle, icon } = $props();
</script>

<button class="w-full h-24 relative rounded-2xl outline outline-[1.25px] outline-offset-[-1.25px] outline-white/5 flex items-center gap-4 px-5 cursor-pointer transition-all duration-200 hover:bg-white/[0.03] focus-visible:outline-2 focus-visible:outline-gfx-green-500" type="button">
  <div class="size-14 shrink-0 bg-teal-500/5 rounded-xl outline outline-[1.25px] outline-offset-[-1.25px] outline-teal-500/10 flex items-center justify-center">
    {@render icon()}
  </div>
  <div>
    <div class="text-white text-base font-medium font-acid leading-6">{title}</div>
    <div class="text-gfx-neutral-300 text-sm font-normal font-acid leading-5">{subtitle}</div>
  </div>
</button>
