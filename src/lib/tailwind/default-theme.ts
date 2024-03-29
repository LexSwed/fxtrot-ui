import tailwindTheme from 'tailwindcss/defaultTheme';
import { type Theme } from '../theme-provider/types';

const defaultTheme = {
  colors: {
    'primary': 'hsl(202 100% 30.6%)',
    'on-primary': 'hsl(0 0% 100%)',
    'primary-container': 'hsl(212 100% 90%)',
    'on-primary-container': 'hsl(206 100% 10%)',
    'secondary': 'hsl(227 43% 46%)',
    'on-secondary': 'hsl(0 0% 100%)',
    'secondary-container': 'hsl(231 100% 93%)',
    'on-secondary-container': 'hsl(224 100% 16%)',
    'tertiary': 'hsl(328 95.8% 37.1%)',
    'on-tertiary': 'hsl(0 0% 100%)',
    'tertiary-container': 'hsl(343 100% 92.5%)',
    'on-tertiary-container': 'hsl(333 100% 12.2%)',
    'success': 'hsl(167 100% 21%)',
    'on-success': 'hsl(0 0% 100%)',
    'success-container': 'hsl(162 90% 73%)',
    'on-success-container': 'hsl(165 94% 6%)',
    'error': 'hsl(340 71% 41%)',
    'on-error': 'hsl(0 0% 100%)',
    'error-container': 'hsl(351 100% 93%)',
    'on-error-container': 'hsl(341 100% 13%)',
    'outline': 'hsl(217 5% 47%)',
    'background': 'hsl(202 100% 99.9%)',
    'on-background': 'hsl(0 0% 10.6%)',
    'surface': 'hsl(222 100% 99.8%)',
    'on-surface': 'hsl(0 0% 10.6%)',
    'surface-variant': 'hsl(217 5% 90%)',
    'on-surface-variant': 'hsl(215 6% 40%)',
    'inverse-surface': 'hsl(225 4.1% 19.2%)',
    'inverse-on-surface': 'hsl(255 15.4% 94.9%)',
    'disabled': 'hsl(0deg 0% 91%)',
    'on-disabled': 'hsl(204 9.1% 41%)',
  },
  boxShadow: {
    ...tailwindTheme.boxShadow,
    xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
    popper: `0 0 2px rgb(0 0 0 / 0.3), 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)`,
  },
  spacing: {
    xs: tailwindTheme.spacing['1'],
    sm: tailwindTheme.spacing['2'],
    md: tailwindTheme.spacing['6'],
    lg: tailwindTheme.spacing['8'],
    xl: tailwindTheme.spacing['10'],
  },
  fontFamily: {
    sans: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, sans-serif',
    serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    mono: 'Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
  },
  fontSize: {
    'xs': ['0.75rem', '0.875rem'],
    'sm': ['0.875rem', '1.25rem'],
    'md': ['1rem', '1.5rem'],
    'lg': ['1.125rem', '1.75rem'],
    'xl': ['1.25rem', '1.75rem'],
    '2xl': ['1.5rem', '2rem'],
    '3xl': ['1.875rem', '2.25rem'],
    '4xl': ['2.25rem', '2.5rem'],
    '5xl': ['3rem', '1'],
    '6xl': ['3.75rem', '1'],
    '7xl': ['4.5rem', '1'],
    '8xl': ['6rem', '1'],
    '9xl': ['8rem', '1'],
  },
  // tailwind defaults
  borderRadius: {
    'none': '0px',
    'sm': '0.275rem',
    'DEFAULT': '0.375rem',
    'md': '0.375rem',
    'lg': '0.5rem',
    'xl': '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    'full': '9999px',
  },
} satisfies Theme;

export default defaultTheme;
