import { styled } from '../stitches.config';

export const Text = styled('span', {
  p: 0,
  m: 0,
  variants: {
    textStyle: {
      'body-sm': {
        textSize: '$xs',
      },
      'body-md': {
        textSize: '$sm',
      },
      'body-lg': {
        textSize: '$md',
      },
      'body-xl': {
        textSize: '$lg',
      },
      'label-sm': {
        textSize: '$xs',
      },
      'label-md': {
        textSize: '$sm',
        fontWeight: 600,
      },
      'label-lg': {
        textSize: '$lg',
        fontWeight: 600,
      },
      'title-sm': {
        textSize: '$xl',
      },
      'title-md': {
        textSize: '$2xl',
      },
      'title-lg': {
        textSize: '$3xl',
      },
      'headline-sm': {
        fontFamily: '$heading',
        textSize: '$4xl',
      },
      'headline-md': {
        fontFamily: '$heading',
        textSize: '$5xl',
      },
      'headline-lg': {
        fontFamily: '$heading',
        textSize: '$6xl',
      },
      'overline': {
        fontFamily: '$default',
        textSize: '$xs',
        textTransform: 'uppercase',
      },
      'mono-sm': {
        fontFamily: '$mono',
        textSize: '$xs',
      },
      'mono-md': {
        fontFamily: '$mono',
        textSize: '$sm',
      },
      'mono-lg': {
        fontFamily: '$mono',
        textSize: '$md',
      },
    },
    tone: {
      default: {
        color: 'inherit',
      },
      accent: {
        color: '$primary',
      },
      light: {
        color: '$onSurfaceVariant',
      },
      success: {
        color: '$success',
      },
      danger: {
        color: '$error',
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
    weight: {
      100: {
        fontWeight: 100,
      },
      200: {
        fontWeight: 200,
      },
      300: {
        fontWeight: 300,
      },
      400: {
        fontWeight: 400,
      },
      500: {
        fontWeight: 500,
      },
      600: {
        fontWeight: 600,
      },
      700: {
        fontWeight: 700,
      },
      800: {
        fontWeight: 800,
      },
      900: {
        fontWeight: 900,
      },
    },
  },
  defaultVariants: {
    textStyle: 'body-md',
    tone: 'default',
  },
});
