<script>
  /** @type {{ children: import('svelte').Snippet }} */
  let { children } = $props();
</script>

<button class="trade-btn">
  {@render children()}
</button>

<style>
  .trade-btn {
    background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(16,188,131,0.15) 50%, rgba(255,255,255,0.05) 100%);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 60px;
    padding: 8px 20px;
    font-size: 12px;
    font-weight: 500;
    color: #fff;
    cursor: pointer;
    backdrop-filter: blur(8px);
  }
</style>
