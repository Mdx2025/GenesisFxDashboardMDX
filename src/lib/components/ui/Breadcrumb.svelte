<script>
  import { HomeIcon } from '$icons';

  /** @type {{ items: Array<{ label: string, href?: string, current?: boolean }> }} */
  let { items } = $props();
</script>

<nav aria-label="Breadcrumb">
  <ol class="flex items-center gap-4 text-body2" style="color: #606060">
    <li class="flex items-center">
      <HomeIcon />
    </li>

    {#each items as item, i}
      {#if i > 0}
        <span style="color: #606060">/</span>
      {/if}
      <li class="flex items-center">
        {#if item.current}
          <span class="font-normal" style="color: #606060">{item.label}</span>
        {:else}
          <a href={item.href || '#'} class="hover:opacity-80 transition-colors" style="color: #606060">
            {item.label}
          </a>
        {/if}
      </li>
    {/each}
  </ol>
</nav>
