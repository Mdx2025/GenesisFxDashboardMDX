<script>
  import '../app.css';
  import { onMount } from 'svelte';
  import Lenis from 'lenis';

  let { children } = $props();

  onMount(() => {
    const mainEl = document.querySelector('main');
    if (!mainEl) return;

    const lenis = new Lenis({
      wrapper: mainEl,
      content: mainEl.firstElementChild,
      smoothWheel: true,
      lerp: 0.1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  });
</script>

{@render children()}
