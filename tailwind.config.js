/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte}'],
  theme: {
    extend: {
      fontFamily: {
        acid: ['"FFF Acid Grotesk"', 'sans-serif'],
      },
      colors: {
        'gfx-green': {
          50: '#01130d',
          100: '#021B13',
          200: '#064B34',
          500: '#10BC83',
          glow: '#00f0a0',
        },
        'gfx-neutral': {
          300: '#606060',
          500: '#A0A0A0',
        },
        'gfx-red': '#ff717e',
        'gfx-red-dark': '#ff4d6a',
        'gfx-amber': '#e29d58',
        'gfx-sidebar': '#000705',
        'gfx-main': '#040b09',
        'gfx-card-border': 'rgba(255,255,255,0.06)',
        'gfx-card-bg': 'rgba(255,255,255,0.03)',
        'gfx-bullish': '#0c9104',
        'gfx-bearish': '#b8312b',
      },
      fontSize: {
        'h1': ['50px', { lineHeight: '100%', letterSpacing: '0' }],
        'h2': ['36px', { lineHeight: '100%', letterSpacing: '0' }],
        'h3': ['24px', { lineHeight: '100%', letterSpacing: '0' }],
        'body1': ['14px', { lineHeight: '18.8px', letterSpacing: '0' }],
        'body2': ['12px', { lineHeight: '18.8px', letterSpacing: '0' }],
        'btn': ['16px', { lineHeight: '24.44px', letterSpacing: '0' }],
        'micro': ['16px', { lineHeight: '24.44px', letterSpacing: '0' }],
        'tab': ['12px', { lineHeight: '15.68px', letterSpacing: '2.32px' }],
      },
    }
  },
  plugins: [],
};
