/**
 * Centralised Design Tokens for Tailoring Home & Fabric Home
 *
 * Defines the core design language: colours, typography, spacing,
 * borders, shadows, and transitions for a unified boutique aesthetic.
 */

export const tokens = {
  // 1. Premium Colour Palette
  colors: {
    // Warm Ivory: Primary page background and bright accents
    ivory: {
      50: '#FFFFFF',
      100: '#FDFBF7', // Primary boutique ivory
      200: '#F7F3EB',
      300: '#EFE8DA',
      400: '#E2D7C3',
    },

    // Cream: Soft tactile backgrounds and secondary cards
    cream: {
      DEFAULT: '#F8F5EE', // Default cream
      soft: '#F3EFE6',    // Soft card cream
      muted: '#EAE3D2',   // Muted neutral cream
      border: '#E3D9C6',  // Subtle dividing borders
      dark: '#D8CEBC',
    },

    // Chocolate Brown: Anchoring dark neutral for text and luxury surfaces
    chocolate: {
      50: '#F6F3F1',
      100: '#E7DFDC',
      200: '#D0C0BA',
      300: '#AC9389',
      400: '#886A5E',
      500: '#5C3E32',
      600: '#462B21',
      700: '#382118',
      800: '#2E1C14', // Primary chocolate brand color
      900: '#1D110C', // Deep rich chocolate
      950: '#120A07', // Midnight chocolate
    },

    // Muted Maroon: Sartorial bespoke craft accent
    maroon: {
      50: '#FBF4F5',  // Blush tint
      100: '#F5E2E4',
      200: '#EBC6CA', // Light muted maroon for dark-bg contrast
      300: '#DA9FA6',
      400: '#C16C77',
      500: '#A1434F',
      600: '#822E39',
      700: '#6D242E',
      800: '#5E1F27', // Primary bespoke maroon
      900: '#42141B', // Deep regal maroon
      950: '#2A0A0F',
    },

    // Subtle Gold: Champagne brass and artisan crest highlights
    gold: {
      DEFAULT: '#C5A059', // Classic boutique gold
      light: '#DFC78F',   // Luminous gold for dark backgrounds
      dark: '#9E7D38',    // Deep antique gold for light backgrounds
      muted: '#A38344',
      faint: '#FBF7EE',   // Subtle golden badge tint
    },

    // Functional State Accents
    functional: {
      success: '#2E7D32',
      successBg: '#E8F5E9',
      successBorder: '#C8E6C9',
      warning: '#ED6C02',
      warningBg: '#FFF3E0',
      warningBorder: '#FFE0B2',
      error: '#C62828',
      errorBg: '#FFEBEE',
      errorBorder: '#FFCDD2',
    },
  },

  // 2. Typography Hierarchy
  typography: {
    fonts: {
      serif: '"Playfair Display", "Cormorant Garamond", Georgia, serif',
      display: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
      sans: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    },

    // Type Scales (Font Size, Line Height, Letter Spacing)
    scales: {
      heroTitle: {
        fontSize: 'text-4xl sm:text-5xl lg:text-6xl',
        lineHeight: 'leading-tight',
        letterSpacing: 'tracking-tight',
        fontWeight: 'font-bold',
        fontFamily: 'font-serif',
      },
      sectionTitle: {
        fontSize: 'text-3xl sm:text-4xl',
        lineHeight: 'leading-tight',
        letterSpacing: 'tracking-tight',
        fontWeight: 'font-bold',
        fontFamily: 'font-serif',
      },
      cardTitle: {
        fontSize: 'text-xl sm:text-2xl',
        lineHeight: 'leading-snug',
        fontWeight: 'font-bold',
        fontFamily: 'font-serif',
      },
      eyebrow: {
        fontSize: 'text-xs',
        letterSpacing: 'tracking-widest',
        fontWeight: 'font-semibold',
        textTransform: 'uppercase',
        fontFamily: 'font-sans',
      },
      body: {
        fontSize: 'text-sm sm:text-base',
        lineHeight: 'leading-relaxed',
        fontFamily: 'font-sans',
      },
      bodySmall: {
        fontSize: 'text-xs sm:text-sm',
        lineHeight: 'leading-relaxed',
        fontFamily: 'font-sans',
      },
      caption: {
        fontSize: 'text-xs',
        lineHeight: 'leading-normal',
        fontFamily: 'font-sans',
      },
    },
  },

  // 3. Spacing Scales (Standard Tailwind rem units)
  spacing: {
    sectionPaddingY: 'py-16 md:py-24',
    sectionPaddingX: 'px-4 sm:px-6 lg:px-8',
    containerMaxWidth: 'max-w-7xl mx-auto',
    cardPadding: 'p-6 sm:p-8',
    stackGap: 'space-y-16 md:space-y-24',
  },

  // 4. Border Radius (Sharp boutique tailoring aesthetics)
  borderRadius: {
    none: 'rounded-none',
    xs: 'rounded-[2px]',
    sm: 'rounded-sm', // 4px standard boutique radius
    md: 'rounded',    // 6px
    lg: 'rounded-md', // 8px
    full: 'rounded-full',
  },

  // 5. Shadows (Subtle, layered chocolate-tinted elevations)
  shadows: {
    none: 'shadow-none',
    xs: 'shadow-xs',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    goldGlow: '0 0 20px rgba(197, 160, 89, 0.25)',
    maroonGlow: '0 8px 24px -4px rgba(94, 31, 39, 0.25)',
  },

  // 6. Transitions & Motion
  transitions: {
    fast: 'transition-all duration-150 ease-out',
    default: 'transition-all duration-200 ease-out',
    smooth: 'transition-all duration-300 ease-in-out',
    slow: 'transition-all duration-500 ease-in-out',
  },

  // 7. Focus & Accessibility
  focus: {
    ring: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-700/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory',
    ringGold: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-chocolate-900',
  },
};

export default tokens;

