import { styled } from '../stitches.config';

const IconBox = styled('i', {
  variants: {
    size: {
      'xs': {
        size: '$2',
      },
      'sm': {
        size: '$3',
      },
      'md': {
        size: '$4',
      },
      'base': {
        size: '$4',
      },
      'lg': {
        size: '$5',
      },
      'xl': {
        size: '$6',
      },
      '2xl': {
        size: '$12',
      },
      '3xl': {
        size: '$16',
      },
      '4xl': {
        size: '$20',
      },
      '5xl': {
        size: '$24',
      },
      '6xl': {
        size: '$32',
      },
    },
  },
});

IconBox.defaultProps = {
  size: 'md',
};

export default IconBox;
