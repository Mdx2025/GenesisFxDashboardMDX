<script>
  import { browser } from '$app/environment';

  let canvasEl = $state(null);
  let chart = $state(null);

  const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const dataPoints = [98, 110, 125, 150, 165, 180, 195, 202, 220, 240, 253, 305];

  $effect(() => {
    if (!browser || !canvasEl) return;

    let destroyed = false;
    let instance;

    import('chart.js').then(({ Chart, registerables }) => {
      if (destroyed) return;
      Chart.register(...registerables);

      const ctx = canvasEl.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 0, canvasEl.height);
      gradient.addColorStop(0, 'rgba(16, 188, 131, 0.25)');
      gradient.addColorStop(1, 'rgba(16, 188, 131, 0)');

      instance = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            data: dataPoints,
            borderColor: '#10BC83',
            backgroundColor: gradient,
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#10BC83',
            pointHoverBorderColor: '#000',
            pointHoverBorderWidth: 2,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { intersect: false, mode: 'index' },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(0,0,0,0.8)',
              titleColor: '#A0A0A0',
              bodyColor: '#fff',
              borderColor: 'rgba(255,255,255,0.1)',
              borderWidth: 1,
              padding: 10,
              displayColors: false,
              callbacks: {
                label: (ctx) => `$${ctx.parsed.y.toFixed(2)}`
              }
            }
          },
          scales: {
            x: {
              grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
              ticks: { color: '#A0A0A0', font: { size: 10 } },
              border: { display: false }
            },
            y: {
              grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
              ticks: {
                color: '#A0A0A0',
                font: { size: 10 },
                callback: (v) => `$${v}`
              },
              border: { display: false }
            }
          }
        }
      });
      chart = instance;
    });

    return () => {
      destroyed = true;
      if (instance) instance.destroy();
    };
  });
</script>

<div class="w-full h-full" role="img" aria-label="Portfolio equity line chart">
  <canvas bind:this={canvasEl}></canvas>
</div>
