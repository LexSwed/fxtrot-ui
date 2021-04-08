import { styled } from '../stitches.config';

const Text = styled('span', {
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
    ellipsis: {
      true: {
        minWidth: 0,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
    },
  },
  defaultVariants: {
    font: 'default',
  },
});

export default Text;
