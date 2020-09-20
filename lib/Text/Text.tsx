import { styled, theme } from '../stitches.config';

const Text = styled('span', {
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
  },
});

export default Text;
