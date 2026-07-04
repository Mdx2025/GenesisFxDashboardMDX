<script>
  /** @type {{ active?: boolean, href?: string, children: import('svelte').Snippet }} */
  let { active = false, href = '#', children } = $props();
</script>

<button class="nav-btn" class:active>
  {@render children()}
</button>

<style>
  .nav-btn {
    width: 100%;
    height: 46px;
    border-radius: 10px;
    border: 1px solid transparent;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 16px;
    cursor: pointer;
    transition: all 0.2s;
    color: #A0A0A0;
    font-size: 14px;
    background: transparent;
  }
  .nav-btn:hover {
    background: rgba(255,255,255,0.03);
  }
  .nav-btn.active {
    background: #141414;
    border-color: #0d1e18;
    color: #fff;
    position: relative;
  }
  .nav-btn.active::before {
    content: '';
    position: absolute;
    left: -10px;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,240,160,0.15) 0%, transparent 70%);
  }
</style>
