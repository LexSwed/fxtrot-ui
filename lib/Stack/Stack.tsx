import React from 'react';
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
    gap: '$3',
  },
  'base': {
    gap: '$3',
  },
  'lg': {
    gap: '$4',
  },
  'xl': {
    gap: '$5',
  },
  '2xl': {
    gap: '$6',
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
