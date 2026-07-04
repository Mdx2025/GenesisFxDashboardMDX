<script>
  import DividerGlow from './DividerGlow.svelte';

  /** @type {{ variant?: 'light' | 'heavy', divider?: 'white' | 'green' | 'none', rounded?: string, className?: string, children: import('svelte').Snippet }} */
  let { variant = 'light', divider = 'white', rounded = '19px', className = '', children } = $props();
</script>

<div
  class="{variant === 'heavy' ? 'glass-card-heavy' : 'glass-card'} relative {className}"
  style="border-radius: {rounded};"
>
  {#if divider !== 'none'}
    <DividerGlow variant={divider} />
  {/if}
  {@render children()}
</div>
