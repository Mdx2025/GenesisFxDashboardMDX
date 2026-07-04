<script>
  import { browser } from '$app/environment';

  /** @type {{ data: Array<{wickTop: number, body: number, wickBottom: number, bullish: boolean}>, className?: string }} */
  let { data = [], className = 'h-14' } = $props();

  let canvasEl = $state(null);

  $effect(() => {
    if (!browser || !canvasEl || data.length === 0) return;

    let destroyed = false;
    let instance;

    import('chart.js').then(({ Chart, registerables }) => {
      if (destroyed) return;
      Chart.register(...registerables);

      const barData = data.map(c => c.body);
      const colors = data.map(c => c.bullish ? '#10BC83' : '#ff717e');

      instance = new Chart(canvasEl.getContext('2d'), {
        type: 'bar',
        data: {
          labels: data.map(() => ''),
          datasets: [{
            data: barData,
            backgroundColor: colors,
            borderRadius: 2,
            borderSkipped: false,
            barPercentage: 0.5,
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

<div class={className} role="img" aria-label="Candlestick chart">
  <canvas bind:this={canvasEl}></canvas>
</div>
