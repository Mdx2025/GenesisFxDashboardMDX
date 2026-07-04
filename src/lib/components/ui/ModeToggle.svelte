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
    height: 44px;
    border-radius: 60px;
    background: rgba(255,255,255,0.05);
    display: flex;
    position: relative;
    overflow: hidden;
  }
  .mode-toggle button {
    flex: 1;
    border: none;
    background: transparent;
    color: #606060;
    font-size: 16px;
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
    background: rgba(20,184,166,0.2);
    border: 0.5px solid #14b8a6;
    color: #fff;
    font-weight: 500;
    position: relative;
  }
</style>
