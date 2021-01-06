import type { StitchesProps } from '@stitches/react';
import React from 'react';

import { styled } from '../stitches.config';
import type { StylesObject } from '../utils';

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
        size: '$8',
      },
      '3xl': {
        size: '$12',
      },
      '4xl': {
        size: '$16',
      },
      '5xl': {
        size: '$20',
      },
      '6xl': {
        size: '$24',
      },
    },
  },
});

interface Props extends Omit<StitchesProps<typeof IconBox>, 'as'> {
  as: React.ElementType;
}

const Icon: React.FC<Props> = ({ size = 'md', stroke, fill, css, ...props }) => {
  return <IconBox size={size} {...props} css={{ ...(css as StylesObject), stroke, fill }} />;
};

export default Icon;
