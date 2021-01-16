import type { CssWithBreakpoints } from '../utils/types';
import { scales } from './scales';

const gapScale: ScalesMap = {
  'none': '$0',
  'xs': '$1',
  'sm': '$2',
  'md': '$6',
  'base': '$6',
  'lg': '$8',
  'xl': '$10',
  '2xl': '$16',
};

export const createVariant = <Variants extends string>(config: { [K in Variants]: CssWithBreakpoints }) => config;

const createScalesVariant = <P extends string = string>(
  property: P,
  customScales: ScalesMap
): {
  [K in keyof typeof scales | Scale]: { [T in P]: string };
} =>
  Object.fromEntries(
    Object.keys(scales)
      .map((scale) => [scale, { [property]: scale }])
      .concat(
        Object.keys(customScales).map((scale) => [
          scale,
          { [property]: customScales[scale as keyof typeof customScales] },
        ])
      )
  );

export const gaps = createScalesVariant('gap', gapScale);

export const textSize = createVariant({
  'xs': {
    textSize: '$xs',
  },
  'sm': {
    textSize: '$sm',
  },
  'md': {
    textSize: '$md',
  },
  'base': {
    textSize: '$base',
  },
  'lg': {
    textSize: '$lg',
  },
  'xl': {
    textSize: '$xl',
  },
  '2xl': {
    textSize: '$2xl',
  },
  '3xl': {
    textSize: '$3xl',
  },
  '4xl': {
    textSize: '$4xl',
  },
  '5xl': {
    textSize: '$5xl',
  },
  '6xl': {
    textSize: '$6xl',
  },
});

export const font = createVariant({
  default: {
    font: '$default',
  },
  mono: {
    font: '$mono',
  },
});

type Scale = 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | 'none';

type ScalesMap = {
  [K in Scale]: keyof typeof scales;
};
