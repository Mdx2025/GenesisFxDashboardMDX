<script>
  /** @type {{ size?: 'default' | 'small', children: import('svelte').Snippet }} */
  let { size = 'default', children } = $props();
</script>

<button class="sparkle-btn" class:small={size === 'small'}>
  {@render children()}
</button>

<style>
  .sparkle-btn {
    position: relative;
    overflow: hidden;
    border-radius: 60px;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(16,188,131,0.2) 100%);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 10px 24px;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    cursor: pointer;
    backdrop-filter: blur(10px);
  }
  .sparkle-btn:focus-visible {
    outline: 2px solid #10BC83;
    outline-offset: 2px;
  }
  .sparkle-btn.small {
    padding: 8px 20px;
    font-size: 13px;
  }
  .sparkle-btn::before {
    content: '\2726';
    position: absolute;
    left: 8px;
    top: 4px;
    font-size: 8px;
    color: rgba(0,240,160,0.4);
  }
  .sparkle-btn::after {
    content: '\2726';
    position: absolute;
    right: 8px;
    bottom: 4px;
    font-size: 6px;
    color: rgba(255,255,255,0.2);
  }
</style>
