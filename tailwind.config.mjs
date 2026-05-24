/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        paper: 'var(--color-paper)',
        'paper-2': 'var(--color-paper-2)',
        ink: 'var(--color-ink)',
        'ink-muted': 'var(--color-ink-muted)',
        accent: 'var(--color-accent)',
        sand: 'var(--color-sand)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        mono: 'var(--font-mono)',
      },
      borderRadius: {
        none: '0',
        DEFAULT: '0',
        sm: '0',
        md: '0',
        lg: '0',
        xl: '0',
        '2xl': '0',
        '3xl': '0',
        full: '9999px',
      },
    },
  },
  plugins: [],
};
