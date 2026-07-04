<script>
  /** @type {{ color?: string, height?: number }} */
  let { color = '#e29d58', height = 48 } = $props();
  const id = `area-${Math.random().toString(36).slice(2, 8)}`;
</script>

<div class="relative" style="height: {height}px">
  <svg width="100%" height={height} viewBox="0 0 280 60" preserveAspectRatio="none">
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color={color} stop-opacity="0.3"/>
        <stop offset="100%" stop-color={color} stop-opacity="0"/>
      </linearGradient>
    </defs>
    <path d="M0,50 Q30,45 60,40 T120,25 T180,30 T240,15 T280,10 V60 H0 Z" fill="url(#{id})"/>
    <path d="M0,50 Q30,45 60,40 T120,25 T180,30 T240,15 T280,10" fill="none" stroke={color} stroke-width="2"/>
  </svg>
</div>
