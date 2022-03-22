import * as colors from './colors';

export const defaultColors: ThemeColors = {
  'surface': 'hsl(0deg 0% 100%)',
  'surface--hover': colors.slate.slate1,
  'surface--elevated': colors.slate.slate2,

  'surface-accent': colors.indigoA.indigoA1,
  'surface-accent--hover': colors.indigoA.indigoA2,
  'surface-accent--elevated': colors.indigoA.indigoA1,

  'surface-success': colors.green.green1,
  'surface-danger': colors.red.red1,

  // elements
  'shape': 'transparent',
  'shape--hover': colors.slateA.slateA3,
  'shape--active': colors.slateA.slateA5,
  'shape--disabled': colors.slateA.slateA2,

  'shape-accent': colors.indigo.indigo9,
  'shape-accent--hover': colors.indigo.indigo10,
  'shape-accent--active': colors.indigo.indigo11,
  'shape-accent--disabled': '$shape--disabled',

  'shape-accent-light': colors.indigo.indigo1,
  'shape-accent-light--hover': colors.indigo.indigo3,
  'shape-accent-light--active': colors.indigo.indigo4,

  'shape-success': colors.green.green9,
  'shape-success--hover': colors.green.green10,
  'shape-success--active': colors.green.green11,

  'shape-danger': colors.red.red9,
  'shape-danger--hover': colors.red.red10,
  'shape-danger--active': colors.red.red11,

  // borders
  'border': colors.slateA.slateA9,
  'border--hover': colors.slateA.slateA10,
  'border--active': colors.slateA.slateA11,
  'border--light': colors.slateA.slateA5,
  'border--disabled': '$shape--disabled',

  'border-accent': colors.indigo.indigo7,
  'border-accent--hover': colors.indigo.indigo8,
  'border-accent--active': colors.indigo.indigo9,
  'border-accent--light': colors.indigo.indigo5,
  'border-accent--disabled': '$shape--disabled',

  // text
  'text': colors.slate.slate12,
  'text--light': colors.slate.slate10,
  'text--disabled': colors.slate.slate9,

  'text-accent': colors.indigo.indigo11,
  'text-accent--light': colors.indigo.indigo8,
  'text-accent--disabled': '$text--disabled',

  'text-onAccent': 'hsl(0deg 0% 100%)',
  'text-onAccent--disabled': '$text--disabled',

  'text-success': colors.green.green11,
  'text-danger': colors.red.red11,

  'focusRing': colors.slateA.slateA11,
} as const;

// use dashed syntax to align with CSS vars syntax, stitches doesn't do any sanitization
export interface ThemeColors {
  // non-interactive
  'surface': string;
  'surface--hover': string;
  'surface--elevated': string;

  'surface-accent': string;
  'surface-accent--hover': string;
  'surface-accent--elevated': string;

  'surface-success': string;
  'surface-danger': string;

  // elements
  'shape': string;
  'shape--hover': string;
  'shape--active': string;
  'shape--disabled': string;

  'shape-accent': string;
  'shape-accent--hover': string;
  'shape-accent--active': string;
  'shape-accent--disabled': string;

  'shape-accent-light': string;
  'shape-accent-light--hover': string;
  'shape-accent-light--active': string;

  'shape-success': string;
  'shape-success--hover': string;
  'shape-success--active': string;

  'shape-danger': string;
  'shape-danger--hover': string;
  'shape-danger--active': string;

  // borders
  'border': string;
  'border--hover': string;
  'border--active': string;
  'border--light': string;
  'border--disabled': string;

  'border-accent': string;
  'border-accent--hover': string;
  'border-accent--active': string;
  'border-accent--light': string;
  'border-accent--disabled': string;

  // text
  'text': string;
  'text--light': string;
  'text--disabled': string;

  'text-accent': string;
  'text-accent--light': string;
  'text-accent--disabled': string;

  'text-onAccent': string;
  'text-onAccent--disabled': string;

  'text-success': string;
  'text-danger': string;

  'focusRing': string;
}
