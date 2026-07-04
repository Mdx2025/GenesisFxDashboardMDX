<script>
  import IconWrap from './IconWrap.svelte';

  /** @type {{ title: string, subtitle: string, icon: import('svelte').Snippet }} */
  let { title, subtitle, icon } = $props();
</script>

<button class="action-item">
  <IconWrap>
    {@render icon()}
  </IconWrap>
  <div>
    <div class="text-white text-body1 font-medium">{title}</div>
    <div class="text-gfx-neutral-500 text-body2">{subtitle}</div>
  </div>
</button>

<style>
  .action-item {
    flex: 1;
    min-height: 62px;
    border-radius: 13px;
    border: 1.25px solid rgba(255,255,255,0.04);
    background: rgba(255,255,255,0.02);
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 16px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .action-item:hover {
    background: rgba(255,255,255,0.04);
  }
  .action-item:focus-visible {
    outline: 2px solid #10BC83;
    outline-offset: 2px;
  }
</style>
