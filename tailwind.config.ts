import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        chart: {
          '1': 'var(--chart-1)',
          '2': 'var(--chart-2)',
          '3': 'var(--chart-3)',
          '4': 'var(--chart-4)',
          '5': 'var(--chart-5)',
        },
        // Design System Colors
        'brand-black': 'var(--color-brand-black)',
        'brand-blue': 'var(--color-brand-blue)',
        'brand-gray': 'var(--color-brand-gray)',
        danger: 'var(--color-danger)',
        warning: 'var(--color-warning)',
        success: 'var(--color-success)',
        info: 'var(--color-info)',
        // Job category colors
        'category-teal': 'var(--color-category-teal)',
        'category-green': 'var(--color-category-green)',
        'category-purple': 'var(--color-category-purple)',
        'category-lime': 'var(--color-category-lime)',
        'category-yellow': 'var(--color-category-yellow)',
        'category-orange': 'var(--color-category-orange)',
        'category-magenta': 'var(--color-category-magenta)',
        'category-pink': 'var(--color-category-pink)',
        // Calendar colors
        'calendar-red': 'var(--color-calendar-red)',
        'calendar-lavender': 'var(--color-calendar-lavender)',
        'calendar-purple': 'var(--color-calendar-purple)',
        'calendar-light-blue': 'var(--color-calendar-light-blue)',
        'calendar-mint': 'var(--color-calendar-mint)',
        'calendar-rose': 'var(--color-calendar-rose)',
        'calendar-light-purple': 'var(--color-calendar-light-purple)',
        // Status colors
        'status-pending': 'var(--color-status-pending)',
        'status-active': 'var(--color-status-active)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        heading: ['var(--font-playfair-display)', 'serif'],
        body: ['var(--font-source-sans-pro)', 'sans-serif'],
        secondary: ['var(--font-inter)', 'sans-serif'],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],         // 12px
        sm: ['0.875rem', { lineHeight: '1.25rem' }],     // 14px
        base: ['1rem', { lineHeight: '1.5rem' }],        // 16px
        lg: ['1.125rem', { lineHeight: '1.75rem' }],     // 18px
        xl: ['1.25rem', { lineHeight: '1.75rem' }],      // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],       // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],  // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],    // 36px
        '5xl': ['3rem', { lineHeight: '1' }],            // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }],         // 60px
        '7xl': ['4.5rem', { lineHeight: '1' }],          // 72px
        '8xl': ['6rem', { lineHeight: '1' }],            // 96px
        '9xl': ['8rem', { lineHeight: '1' }],            // 128px
        // Typography scale
        'display-2xl': ['4.5rem', { lineHeight: '1.25', letterSpacing: '-0.05em' }],   // 72px
        'display-xl': ['3.75rem', { lineHeight: '1.25', letterSpacing: '-0.05em' }],   // 60px  
        'display-lg': ['3rem', { lineHeight: '1.25', letterSpacing: '-0.025em' }],     // 48px
        'display-md': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.025em' }],  // 36px
        'display-sm': ['1.875rem', { lineHeight: '1.375' }],                           // 30px
        'heading-xl': ['1.5rem', { lineHeight: '1.375', letterSpacing: '-0.025em' }],  // 24px
        'heading-lg': ['1.25rem', { lineHeight: '1.375', letterSpacing: '-0.025em' }], // 20px
        'heading-md': ['1.125rem', { lineHeight: '1.375' }],                           // 18px
        'heading-sm': ['1rem', { lineHeight: '1.375' }],                               // 16px
        'body-xl': ['1.25rem', { lineHeight: '1.625' }],                               // 20px
        'body-lg': ['1.125rem', { lineHeight: '1.625' }],                              // 18px
        'body-md': ['1rem', { lineHeight: '1.5' }],                                    // 16px
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],                                // 14px
        'body-xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.025em' }],       // 12px
        'label-lg': ['1rem', { lineHeight: '1.5' }],                                   // 16px
        'label-md': ['0.875rem', { lineHeight: '1.5' }],                               // 14px
        'label-sm': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.025em' }],      // 12px
      },
      lineHeight: {
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}

export default config 