<script>
  /** @type {{ size?: number, children: import('svelte').Snippet }} */
  let { size = 38, children } = $props();
</script>

<div
  class="flex items-center justify-center"
  style="width: {size}px; height: {size}px; border-radius: 10px; background: rgba(0,240,160,0.06); border: 1px solid rgba(0,240,160,0.1);"
>
  {@render children()}
</div>
