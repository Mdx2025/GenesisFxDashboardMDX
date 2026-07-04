<script>
  import { SearchIcon } from '$icons';

  /** @type {{ placeholder?: string, value?: string }} */
  let { placeholder = 'Search for', value = $bindable('') } = $props();
</script>

<div class="relative">
  <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gfx-neutral-500" aria-hidden="true">
    <SearchIcon />
  </div>
  <input
    type="search"
    bind:value
    {placeholder}
    aria-label={placeholder}
    class="bg-gfx-card-bg border border-gfx-card-border rounded-xl pl-9 pr-4 py-2.5 text-body2 text-white placeholder-gfx-neutral-500 outline-none focus:border-gfx-green-500/30 focus-visible:ring-1 focus-visible:ring-gfx-green-500/30 w-[200px]"
  />
</div>
