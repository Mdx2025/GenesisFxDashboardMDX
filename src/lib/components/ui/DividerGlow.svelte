<script>
  let { variant = 'white' } = $props();
</script>

<div
  class="{variant === 'green' ? 'divider-green' : 'divider-glow'} absolute top-0 left-[10%] right-[10%]"
></div>
