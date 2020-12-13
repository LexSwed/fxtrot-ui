import type { StitchesProps } from '@stitches/react';
import React from 'react';

import { IconBox } from '../Icon/Icon';
import { styled } from '../stitches.config';

const Block = styled('div', {
  transition: '0.2s ease-in-out',
  fontFamily: '$default',
  border: '1px solid transparent',
  br: '$sm',
  cursor: 'default',
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',

  [`& > ${IconBox}:first-child:last-child`]: {
    ml: '-$1',
    mr: '-$1',
  },

  variants: {
    size: {
      sm: {
        height: '$4',
        fontSize: '10px',
        fontWeight: 400,
        px: '$1',
      },
      md: {
        height: '$6',
        lineHeight: '$6',
        textSize: '$sm',
        fontWeight: 500,
        px: '$2',
      },
      lg: {
        height: '$8',
        lineHeight: '$8',
        textSize: '$md',
        fontWeight: 500,
        px: '$3',
      },
    },
    variant: {
      primary: {
        bc: '$primaryStill',
        color: 'white',
        borderColor: '$primaryStill',
      },
      secondary: {
        bc: '$surfaceStill',
        color: '$text',
        borderColor: '$borderStill',
      },
      outline: {
        color: '$primaryStill',
        bc: 'transparent',
        borderColor: '$primaryStill',
      },
    },
  },
});

interface Props extends Omit<StitchesProps<typeof Block>, 'children'> {
  label: string;
}

const Tag: React.FC<Props> = ({ size = 'md', variant = 'primary', label, ...props }) => {
  return (
    <Block size={size} variant={variant} {...props}>
      {label}
    </Block>
  );
};

export default Tag;
