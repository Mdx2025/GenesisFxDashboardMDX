<script>
  let { size = 18, color = 'currentColor', ...rest } = $props();
</script>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" {...rest}>
  <circle cx="12" cy="12" r="9"/>
  <path d="M12 7v5l3 3"/>
</svg>
