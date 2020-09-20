import { styled, Scale, Size } from '../stitches.config';

const space: { [T in Scale]: { gap: Size } } = {
  'none': {
    gap: '$0',
  },
  'xs': {
    gap: '$1',
  },
  'sm': {
    gap: '$2',
  },
  'md': {
    gap: '$6',
  },
  'base': {
    gap: '$6',
  },
  'lg': {
    gap: '$8',
  },
  'xl': {
    gap: '$10',
  },
  '2xl': {
    gap: '$16',
  },
};

const Stack = styled('div', {
  display: 'flex',
  flexFlow: 'column',

  variants: {
    space,
    align: {
      start: {
        alignItems: 'flex-start',
      },
      center: {
        alignItems: 'center',
      },
      end: {
        alignItems: 'flex-end',
      },
    },
  },
});

export default Stack;
