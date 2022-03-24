import { styled } from '../stitches.config';

export const Text = styled('span', {
  p: 0,
  m: 0,
  variants: {
    textStyle: {
      body1: {
        textStyle: 'body1',
      },
      body2: {
        textStyle: 'body2',
      },
      subtitle1: {
        textStyle: 'subtitle1',
      },
      subtitle2: {
        textStyle: 'subtitle2',
      },
      overline: {
        textStyle: 'overline',
      },
      caption: {
        textStyle: 'caption',
      },
      label: {
        textStyle: 'label',
      },
      hint: {
        textStyle: 'hint',
      },
      mono: {
        textStyle: 'mono',
      },
    },
    tone: {
      default: {
        color: '$text',
      },
      accent: {
        color: '$text-accent',
      },
      light: {
        color: '$text--light',
      },
      success: {
        color: '$text-success',
      },
      danger: {
        color: '$text-danger',
      },
    },
    align: {
      start: {
        textAlign: 'start',
      },
      center: {
        textAlign: 'center',
      },
      end: {
        textAlign: 'end',
      },
      justify: {
        textAlign: 'justify',
      },
    },
    lineClamp: {
      // line clamp doesn't really work within flex layout
      1: {
        display: 'inline-block',
        minWidth: 0,
        maxWidth: '100%',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      },
      2: {
        display: '-webkit-inline-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2,
        overflow: 'hidden',
      },
      3: {
        display: '-webkit-inline-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 3,
        overflow: 'hidden',
      },
      4: {
        display: '-webkit-inline-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 4,
        overflow: 'hidden',
      },
      5: {
        display: '-webkit-inline-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 5,
        overflow: 'hidden',
      },
      6: {
        display: '-webkit-inline-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 6,
        overflow: 'hidden',
      },
    },
  },
  defaultVariants: {
    textStyle: 'body1',
    tone: 'default',
  },
});
