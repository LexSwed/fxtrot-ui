import { styled } from '../stitches.config';

export const Text = styled('span', {
  p: 0,
  m: 0,
  variants: {
    font: {
      default: {
        fontFamily: '$default',
      },
      mono: {
        fontFamily: '$mono',
      },
    },
    size: {
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
      '7xl': {
        textSize: '$7xl',
      },
      '8xl': {
        textSize: '$8xl',
      },
      '9xl': {
        textSize: '$9xl',
      },
    },
    tone: {
      subtle: {
        color: '$textSubtle',
      },
      light: {
        color: '$textLight',
      },
      success: {
        color: '$success',
      },
      danger: {
        color: '$danger',
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
        overflowX: 'hidden',
      },
      2: {
        display: '-webkit-inline-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2,
        overflowX: 'hidden',
      },
      3: {
        display: '-webkit-inline-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 3,
        overflowX: 'hidden',
      },
      4: {
        display: '-webkit-inline-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 4,
        overflowX: 'hidden',
      },
      5: {
        display: '-webkit-inline-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 5,
        overflowX: 'hidden',
      },
      6: {
        display: '-webkit-inline-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 6,
        overflowX: 'hidden',
      },
    },
  },
  defaultVariants: {
    font: 'default',
  },
});
