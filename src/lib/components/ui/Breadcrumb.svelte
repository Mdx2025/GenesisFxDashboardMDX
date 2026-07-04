<script>
  import { HomeIcon } from '$icons';

  /** @type {{ items: Array<{ label: string, href?: string, current?: boolean }> }} */
  let { items } = $props();
</script>

<nav aria-label="Breadcrumb">
  <ol class="flex items-center gap-2 text-body2">
    {#each items as item, i}
      {#if i > 0}
        <span class="text-gfx-neutral-500">/</span>
      {/if}
      <li class="flex items-center gap-1.5">
        {#if i === 0}
          <span class="{item.current ? 'text-white' : 'text-gfx-neutral-500'}">
            <HomeIcon />
          </span>
        {/if}
        {#if item.current}
          <span class="text-white font-medium">{item.label}</span>
        {:else}
          <a href={item.href || '#'} class="text-gfx-neutral-500 hover:text-gfx-neutral-300 transition-colors">
            {item.label}
          </a>
        {/if}
      </li>
    {/each}
  </ol>
</nav>
