import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        playfairDisplay: ['var(--font-playfair-display)'],
        cinzelDecorative: ['var(--font-cinzel-decorative)'],
      },
    },
  },
  plugins: [],
} satisfies Config
