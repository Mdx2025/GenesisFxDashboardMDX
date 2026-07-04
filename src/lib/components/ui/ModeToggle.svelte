<script>
  /** @type {{ options?: string[], activeIndex?: number }} */
  let { options = ['Client', 'Partner'], activeIndex = 0 } = $props();

  let active = $state(activeIndex);
</script>

<div class="mode-toggle" role="group" aria-label="Mode selection">
  {#each options as option, i}
    <button
      class:active={active === i}
      onclick={() => active = i}
      aria-pressed={active === i}
    >
      {option}
    </button>
  {/each}
</div>

<style>
  .mode-toggle {
    width: 100%;
    height: 46px;
    border-radius: 60px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    display: flex;
    position: relative;
    overflow: hidden;
  }
  .mode-toggle button {
    flex: 1;
    border: none;
    background: transparent;
    color: #606060;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    z-index: 1;
    border-radius: 60px;
    transition: all 0.3s;
  }
  .mode-toggle button:focus-visible {
    outline: 2px solid #10BC83;
    outline-offset: -2px;
  }
  .mode-toggle button.active {
    background: #10BC83;
    color: #000;
    font-weight: 700;
  }
</style>
