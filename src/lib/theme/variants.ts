import type { CssStyles } from '../utils/types';
import { scales } from './scales';

const scalesGaps = (Object.keys(scales) as (keyof typeof scales)[]).reduce((res, key) => {
  res[key] = {
    gap: key,
  };
  return res;
}, {} as Record<keyof typeof scales, CssStyles>);

export const gaps: Record<keyof typeof scales | Scale, CssStyles> = {
  ...scalesGaps,
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
    gap: '$6',
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
