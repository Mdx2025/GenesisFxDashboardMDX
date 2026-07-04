<script>
  let { size = 14, color = 'currentColor', ...rest } = $props();
</script>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" {...rest}>
  <path d="M15 18l-6-6 6-6"/>
</svg>
