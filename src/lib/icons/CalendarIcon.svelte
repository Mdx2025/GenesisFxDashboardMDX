<script>
  let { size = 16, color = 'currentColor', ...rest } = $props();
</script>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" {...rest}>
  <rect x="3" y="4" width="18" height="18" rx="2"/>
  <path d="M16 2v4M8 2v4M3 10h18"/>
</svg>
