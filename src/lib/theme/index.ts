import { createColorVariations } from './createColorVariations';
import { lightColors } from './default';

export const colors = createColorVariations(lightColors);
export const fonts = {
  default: '"Noto Sans Display", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, sans-serif',
  heading: '"Source Sans Pro", apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, sans-serif',
  mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;',
} as const;
export const scales = {
  '0': '0rem',
  '1': '0.25rem',
  '2': '0.5rem',
  '3': '0.75rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '7': '1.75rem',
  '8': '2rem',
  '9': '2.25rem',
  '10': '2.5rem',
  '11': '2.75rem',
  '12': '3rem',
  '13': '4rem',
  '14': '4.5rem',
  '15': '5rem',
  '16': '6rem',
  '17': '8rem',
  '18': '10rem',
  '19': '12rem',
  '20': '14rem',
  get 'none'() {
    return scales['0'];
  },
  get 'xs'() {
    return scales['1'];
  },
  get 'sm'() {
    return scales['2'];
  },
  get 'md'() {
    return scales['6'];
  },
  get 'lg'() {
    return scales['8'];
  },
  get 'xl'() {
    return scales['10'];
  },
  get '2xl'() {
    return scales['16'];
  },
  get 'base'() {
    return scales['10'];
  },
} as const;
export const fontSizes = {
  'xs': '0.75rem',
  'sm': '0.875rem',
  'md': '1rem',
  'lg': '1.125rem',
  'xl': '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
  '7xl': '4.5rem',
  '8xl': '6rem',
  '9xl': '8rem',
  'base': '$md',
} as const;
export const lineHeights = {
  'xs': '1rem',
  'sm': '1.25em',
  'md': '1.5em',
  'lg': '1.75em',
  'xl': '1.75em',
  '2xl': '2em',
  '3xl': '2.25em',
  '4xl': '2.5em',
  '5xl': '1',
  '6xl': '1',
  '7xl': '1',
  '8xl': '1',
  '9xl': '1',
  get 'base'() {
    return lineHeights['md'];
  },
} as const;
export const radii = {
  '0': '0',
  'xs': '2px',
  'sm': '3px',
  'md': '5px',
  'lg': '12px',
  'xl': '16px',
  '2xl': '32px',
  '3xl': '64px',
  'round': '50%',
  'pill': '9999px',
  get 'base'() {
    return radii['md'];
  },
} as const;
export const zIndices = {
  '1': '100',
  '2': '200',
  '3': '300',
  '4': '400',
  'max': '9999',
} as const;
export const shadows = {
  'xs': '0 0 0 1px rgba(0, 0, 0, 0.05)',
  'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
  'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  get 'popper'() {
    return `0 0 2px ${colors.surface5}, ${shadows.xl}`;
  },
  get 'base'() {
    return shadows.xs;
  },
  get 'base--hover'() {
    return `${shadows.sm}, ${shadows.sm}`;
  },
  'none': 'none',
} as const;
