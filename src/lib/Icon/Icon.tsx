import type { StitchesProps } from '@stitches/react';
import React from 'react';

import { styled } from '../stitches.config';

export const IconBox = styled('svg', {
  flexShrink: 0,
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

interface Props extends Omit<StitchesProps<typeof IconBox>, 'as'> {
  as: React.ElementType;
}

const Icon: React.FC<Props> = ({ size = 'md', ...props }) => {
  return <IconBox size={size} {...props} />;
};

export default Icon;
