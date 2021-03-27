import type { CssStyles } from '../utils/types';
import { scales } from './scales';
import type { Theme } from '../stitches.config';

const scalesGaps = Object.keys(scales).reduce((res, key) => {
  res[key] = {
    gap: `$${key}`,
  };
  return res;
}, {} as Record<string, CssStyles>);

export const gaps: Record<keyof Theme['space'] | Scale, CssStyles> = {
  ...(scalesGaps as any),
  'none': {
    gap: '$0',
  },
  'xs': {
    gap: '$1',
  },
  'sm': {
    gap: '$2',
  },
  'base': {
    gap: '$base',
  },
  'md': {
    gap: '$6',
  },
  'lg': {
    gap: '$8',
  },
  'xl': {
    gap: '$10',
  },
  '2xl': {
    gap: '$16',
  },
};

type Scale = 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | 'none';
