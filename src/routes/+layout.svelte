<script>
  import '../app.css';
  import 'lenis/dist/lenis.css';
  import { onMount } from 'svelte';
  import Lenis from 'lenis';

  let { children } = $props();

  onMount(() => {
    const wrapper = document.querySelector('main');
    if (!wrapper) return;

    const lenis = new Lenis({
      wrapper,
      content: wrapper.firstElementChild,
      smoothWheel: true,
      lerp: 0.1,
      autoResize: true,
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
