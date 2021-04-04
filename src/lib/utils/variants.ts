import type { CssStyles } from './types';
import { scales } from '../theme/scales';
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

export const flexMainAxisAlignment: Record<'start' | 'center' | 'end' | 'stretch' | 'space-between', CssStyles> = {
  'start': {
    justifyContent: 'flex-start',
  },
  'center': {
    justifyContent: 'center',
  },
  'end': {
    justifyContent: 'flex-end',
  },
  'stretch': {
    justifyContent: 'stretch',
  },
  'space-between': {
    justifyContent: 'space-between',
  },
};

export const flexCrossAxisAlignment: Record<'start' | 'center' | 'end' | 'stretch', CssStyles> = {
  start: {
    alignItems: 'flex-start',
  },
  center: {
    alignItems: 'center',
  },
  end: {
    alignItems: 'flex-end',
  },
  stretch: {
    alignItems: 'stretch',
  },
};

export const flexDisplayVariant: Record<'flex' | 'inline', CssStyles> = {
  flex: {
    display: 'flex',
  },
  inline: {
    display: 'inline-flex',
  },
};

export const flexWrapVariant: Record<'wrap' | 'nowrap' | 'revert' | 'wrap-reverse', CssStyles> = {
  'wrap': {
    flexWrap: 'wrap',
  },
  'nowrap': {
    flexWrap: 'nowrap',
  },
  'revert': {
    flexWrap: 'revert',
  },
  'wrap-reverse': {
    flexWrap: 'wrap-reverse',
  },
};

export const flexFlowVariant: Record<'row' | 'row-reverse' | 'column' | 'column-reverse', CssStyles> = {
  'row': {
    flexDirection: 'row',
  },
  'row-reverse': {
    flexDirection: 'row-reverse',
  },
  'column': {
    flexDirection: 'column',
  },
  'column-reverse': {
    flexDirection: 'column-reverse',
  },
};
