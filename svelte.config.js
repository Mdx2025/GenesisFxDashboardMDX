import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true
    }),
    alias: {
      '$components': 'src/lib/components',
      '$icons': 'src/lib/icons',
      '$data': 'src/lib/data',
      '$tokens': 'src/lib/tokens',
      '$stores': 'src/lib/stores'
    }
  }
};

export default config;
