<script>
  /** @type {{ active?: boolean, href?: string, children: import('svelte').Snippet }} */
  let { active = false, href = '#', children } = $props();
</script>

<button class="nav-btn" class:active aria-current={active ? 'page' : undefined}>
  {@render children()}
  {#if active}
    <div class="active-indicator" aria-hidden="true"></div>
  {/if}
</button>

<style>
  .nav-btn {
    width: 100%;
    height: 46px;
    border-radius: 10px;
    border: 1px solid rgba(23,23,23,1);
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 16px;
    cursor: pointer;
    transition: all 0.2s;
    color: #A0A0A0;
    font-size: 14px;
    background: transparent;
    position: relative;
    overflow: hidden;
  }
  .nav-btn:hover {
    background: rgba(255,255,255,0.03);
  }
  .nav-btn:focus-visible {
    outline: 2px solid #10BC83;
    outline-offset: -2px;
  }
  .nav-btn.active {
    background: #141414;
    border-color: #171717;
    color: #fff;
  }
  .nav-btn.active::before {
    content: '';
    position: absolute;
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,240,160,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .nav-btn.active::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 100px;
    height: 60px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(16,185,131,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .active-indicator {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 2px;
    height: 14px;
    background: white;
    border-radius: 1px;
  }
</style>
