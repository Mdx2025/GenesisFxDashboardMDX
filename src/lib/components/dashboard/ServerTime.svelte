<script>
  import { onMount } from 'svelte';
  import { GreenDot } from '$components/ui';

  let time = $state('00:00:00');

  onMount(() => {
    function update() {
      const now = new Date();
      const h = String(((now.getUTCHours() - 3) + 24) % 24).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      time = `${h}:${m}:${s}`;
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  });
</script>

<div class="mt-3 p-3 rounded-[15px] border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.02)]">
  <div class="flex items-center justify-between mb-1">
    <span class="text-body2 text-gfx-neutral-500 font-medium">Server Time</span>
    <div class="flex items-center gap-1.5">
      <GreenDot size={6} />
      <span class="text-gfx-green-500 text-[11px] font-medium">Markets Open</span>
    </div>
  </div>
  <div class="text-white text-[18px] font-medium tracking-wider">{time}</div>
  <div class="text-gfx-neutral-500 text-[11px]">UTC-3</div>
</div>
