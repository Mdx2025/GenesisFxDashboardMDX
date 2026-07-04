<script>
  /** @type {{ variant?: 'genfx' | '10x' | 'status', children: import('svelte').Snippet }} */
  let { variant = 'genfx', children } = $props();

  const styles = {
    genfx: 'background: rgba(16,188,131,0.15); color: #10BC83; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 400; letter-spacing: 0.5px;',
    '10x': 'background: rgba(226,157,88,0.15); color: #e29d58; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 400; letter-spacing: 0.5px;',
    status: 'background: rgba(16,188,131,0.12); color: #10BC83; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 400; letter-spacing: 0.05em;'
  };
</script>

<span style="{styles[variant]} display: inline-flex; align-items: center;">
  {@render children()}
</span>
