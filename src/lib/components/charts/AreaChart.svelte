<script>
  import { browser } from '$app/environment';

  /** @type {{ color?: string, height?: number }} */
  let { color = '#e29d58', height = 48 } = $props();

  let canvasEl = $state(null);

  $effect(() => {
    if (!browser || !canvasEl) return;

    let destroyed = false;
    let instance;

    import('chart.js').then(({ Chart, registerables }) => {
      if (destroyed) return;
      Chart.register(...registerables);

      const ctx = canvasEl.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, color + '4D');
      gradient.addColorStop(1, color + '00');

      instance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['', '', '', '', '', '', ''],
          datasets: [{
            data: [50, 45, 40, 25, 30, 15, 10],
            borderColor: color,
            backgroundColor: gradient,
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 3,
            pointHoverBackgroundColor: color,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(0,0,0,0.8)',
              bodyColor: '#fff',
              borderColor: 'rgba(255,255,255,0.1)',
              borderWidth: 1,
              displayColors: false,
            }
          },
          scales: {
            x: { display: false },
            y: { display: false }
          }
        }
      });
    });

    return () => {
      destroyed = true;
      if (instance) instance.destroy();
    };
  });
</script>

<div class="relative" style="height: {height}px" role="img" aria-label="Area trend chart">
  <canvas bind:this={canvasEl}></canvas>
</div>
