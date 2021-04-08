import type { CssStyles } from './types';
import { scales } from '../theme/scales';
import type { Theme } from '../stitches.config';

export const gaps: Record<keyof Theme['space'] | Scale, CssStyles> = createGaps('gap');

export function createGaps(property: keyof CssStyles): Record<keyof Theme['space'] | Scale, CssStyles> {
  return {
    ...(Object.keys(scales).reduce((res, key) => {
      res[key] = {
        [property]: `$${key}`,
      };
      return res;
    }, {} as Record<string, CssStyles>) as any),
    'none': {
      [property]: '$0',
    },
    'xs': {
      [property]: '$1',
    },
    'sm': {
      [property]: '$2',
    },
    'base': {
      [property]: '$base',
    },
    'md': {
      [property]: '$6',
    },
    'lg': {
      [property]: '$8',
    },
    'xl': {
      [property]: '$10',
    },
    '2xl': {
      [property]: '$16',
    },
  };
}

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
