<script>
  let { size = 12, color = 'currentColor', ...rest } = $props();
</script>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" {...rest}>
  <path d="M6 9l6 6 6-6"/>
</svg>
