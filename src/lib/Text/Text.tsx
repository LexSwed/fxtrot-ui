import { styled } from '../stitches.config';

const Text = styled('span', {
  p: 0,
  m: 0,
  fontFamily: '$default',
  textSize: '$base',
  variants: {
    font: {
      default: {
        font: '$default',
      },
      mono: {
        font: '$mono',
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
});

export default Text;
