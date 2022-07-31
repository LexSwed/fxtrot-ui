import { scales } from '../theme/scales';

import type { Theme } from '../stitches.config';

export const gaps = createScale('gap');

// intentionally do not use CssKeys
export function createScale<T extends 'gap' | 'rowGap' | 'columnGap'>(property: T) {
  return {
    ...(Object.keys(scales).reduce((res, key) => {
      res[key] = {
        [property]: `$${key}`,
      };
      return res;
    }, {} as any) as Record<keyof Theme['space'], Record<T, `$${keyof Theme['space']}`>>),
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
  } as const;
}

export type Scale = 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | 'none';

export type TextStyle =
  | 'body-sm'
  | 'body-md'
  | 'body-lg'
  | 'label'
  | 'title-sm'
  | 'title-md'
  | 'title-lg'
  | 'headline'
  | 'overline'
  | 'mono';
