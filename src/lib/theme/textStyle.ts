import type { CssStyles } from '../stitches.config';

export type TextStyle = 'body1' | 'body2' | 'subtitle1' | 'subtitle2' | 'overline' | 'caption' | 'code';

export const textStyle: Record<TextStyle, CssStyles> = {
  body1: {
    fontFamily: '$default',
    textSize: '$base',
  },
  body2: {
    fontFamily: '$default',
    textSize: '$sm',
  },
  subtitle1: {
    fontFamily: '$heading',
    textSize: '$lg',
  },
  subtitle2: {
    fontFamily: '$heading',
    textSize: '$md',
  },
  overline: {
    fontFamily: '$default',
    textSize: '$xs',
    textTransform: 'uppercase',
  },
  caption: {
    fontFamily: '$default',
    textSize: '$sm',
  },
  code: {
    fontFamily: '$mono',
    textSize: '$sm',
  },
} as const;
