<script>
  import { browser } from '$app/environment';

  /** @type {{ data: Array<{value: number, label?: string}>, maxHeight?: number }} */
  let { data = [], maxHeight = 48 } = $props();

  let canvasEl = $state(null);

  $effect(() => {
    if (!browser || !canvasEl || data.length === 0) return;

    let destroyed = false;
    let instance;

    import('chart.js').then(({ Chart, registerables }) => {
      if (destroyed) return;
      Chart.register(...registerables);

      instance = new Chart(canvasEl.getContext('2d'), {
        type: 'bar',
        data: {
          labels: data.map((d, i) => d.label || ''),
          datasets: [{
            data: data.map(d => d.value),
            backgroundColor: (ctx) => {
              const chart = ctx.chart;
              const { ctx: c, chartArea } = chart;
              if (!chartArea) return '#10BC83';
              const g = c.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
              g.addColorStop(0, '#064B34');
              g.addColorStop(1, '#10BC83');
              return g;
            },
            borderRadius: { topLeft: 4, topRight: 4 },
            borderSkipped: false,
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

<div style="height: {maxHeight}px" role="img" aria-label="Bar chart">
  <canvas bind:this={canvasEl}></canvas>
</div>
