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
      <span class="btn-label">{option}</span>
      {#if active === i}
        <div class="glow-emerald" aria-hidden="true"></div>
        <div class="fading-border" aria-hidden="true"></div>
        <div class="star star-1" aria-hidden="true"></div>
        <div class="star star-2" aria-hidden="true"></div>
        <div class="star star-3" aria-hidden="true"></div>
        <div class="star star-4" aria-hidden="true"></div>
        <div class="star star-5" aria-hidden="true"></div>
        <div class="star star-6" aria-hidden="true"></div>
        <div class="star star-7" aria-hidden="true"></div>
        <div class="star star-8" aria-hidden="true"></div>
      {/if}
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
    position: relative;
    overflow: hidden;
  }
  .mode-toggle button:focus-visible {
    outline: 2px solid #10BC83;
    outline-offset: -2px;
  }
  .mode-toggle button.active {
    background: rgba(20,184,166,0.2);
    border: none;
    color: #fff;
    font-weight: 500;
  }
  .fading-border {
    position: absolute;
    inset: 0;
    border-radius: 60px;
    border: 1px solid #14b8a6;
    pointer-events: none;
    mask-image: linear-gradient(to bottom, white 0%, transparent 80%);
    -webkit-mask-image: linear-gradient(to bottom, white 0%, transparent 80%);
  }
  .btn-label {
    position: relative;
    z-index: 2;
  }
  .glow-emerald {
    position: absolute;
    width: 98px;
    height: 45px;
    left: 28px;
    bottom: -20px;
    background: #55FFC7;
    border-radius: 50%;
    filter: blur(20px);
    pointer-events: none;
    opacity: 0.3;
  }
  .star {
    position: absolute;
    width: 1px;
    height: 1px;
    border-radius: 50%;
    pointer-events: none;
    z-index: 1;
  }
  .star-1 { left: 104px; top: 26px; background: white; filter: blur(0.5px); }
  .star-2 { left: 89px; top: 31px; background: white; opacity: 0.5; filter: blur(0.5px); }
  .star-3 { left: 53px; top: 4px; background: #acacac; filter: blur(0.5px); }
  .star-4 { left: 74px; top: 35px; background: #acacac; filter: blur(0.5px); }
  .star-5 { left: 92px; top: 8px; background: #acacac; filter: blur(0.5px); }
  .star-6 { left: 52px; top: 32px; background: #acacac; filter: blur(0.5px); }
  .star-7 { left: 35px; top: 11px; background: #8c8c8c; filter: blur(0.5px); }
  .star-8 { left: 13px; top: 28px; background: #8c8c8c; filter: blur(0.5px); }
</style>
