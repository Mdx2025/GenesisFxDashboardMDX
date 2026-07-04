<script>
  /** @type {{ periods?: string[], active?: string }} */
  let { periods = ['1D','1W','1M','3M','1Y','ALL'], active = 'ALL' } = $props();

  let selected = $state(active);
</script>

<div class="flex gap-1" role="group" aria-label="Time period selection">
  {#each periods as period}
    <button
      class="period-pill"
      class:active={selected === period}
      onclick={() => selected = period}
      aria-pressed={selected === period}
    >
      {period}
    </button>
  {/each}
</div>

<style>
  .period-pill {
    padding: 6px 14px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 500;
    color: #606060;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.2s;
    background: transparent;
  }
  .period-pill:hover {
    color: #A0A0A0;
  }
  .period-pill:focus-visible {
    outline: 2px solid #10BC83;
    outline-offset: 1px;
  }
  .period-pill.active {
    color: #10BC83;
    border-color: #10BC83;
    background: rgba(16,188,131,0.08);
  }
</style>
