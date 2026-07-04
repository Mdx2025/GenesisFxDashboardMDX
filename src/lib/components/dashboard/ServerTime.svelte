<script>
  import { onMount } from 'svelte';

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

<div class="mt-3 relative bg-gfx-green-50 rounded-xl outline outline-[1.25px] outline-offset-[-1.25px] outline-teal-500/10 px-[18px] py-5">
  <div class="flex items-center justify-between mb-3">
    <span class="text-gfx-neutral-300 text-sm font-normal font-acid leading-5">Server Time</span>
    <div class="flex items-center gap-1">
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" class="-my-2" aria-hidden="true">
        <g filter="url(#filter0_d_server_dot)">
          <rect x="12.5333" y="12.5333" width="8.77332" height="8.77332" rx="4.38666" fill="#10BC83"/>
        </g>
        <defs>
          <filter id="filter0_d_server_dot" x="0" y="0" width="33.84" height="33.84" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="6.26665"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.941176 0 0 0 0 0.627451 0 0 0 0.8 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
          </filter>
        </defs>
      </svg>
      <span class="text-gfx-green-500 text-sm font-normal font-acid leading-5">Markets Open</span>
    </div>
  </div>
  <div class="flex items-baseline gap-2">
    <span class="text-white text-2xl font-normal font-acid">{time}</span>
    <span class="text-white/30 text-xs font-normal font-acid leading-5">UTC-3</span>
  </div>
</div>
