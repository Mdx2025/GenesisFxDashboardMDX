<script>
  let { size = 18, color = 'currentColor', ...rest } = $props();
</script>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" {...rest}>
  <path d="M4 19V5M8 19V9M12 19v-6M16 19V7M20 19v-8"/>
</svg>
