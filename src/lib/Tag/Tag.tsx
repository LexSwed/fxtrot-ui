import React from 'react';

import { IconBox } from '../Icon/Icon';
import { styled } from '../stitches.config';

interface Props extends Omit<React.ComponentProps<typeof Block>, 'children'> {
  label: string;
}

export const Tag = ({ size = 'md', variant = 'primary', label, ...props }: Props) => {
  return (
    <Block size={size} variant={variant} {...props}>
      {label}
    </Block>
  );
};

const Block = styled('div', {
  transition: '0.2s ease-in-out',
  fontFamily: '$default',
  border: '1px solid transparent',
  br: '$base',
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
        height: '$6',
        fontSize: '$xs',
        fontWeight: 400,
        px: '$1',
      },
      md: {
        height: '$8',
        lineHeight: '$6',
        textSize: '$xs',
        px: '$2',
      },
      lg: {
        height: '$12',
        lineHeight: '$8',
        textSize: '$base',
        fontWeight: 500,
        px: '$3',
      },
    },
    variant: {
      primary: {
        bc: '$secondaryContainer',
        color: '$onSecondaryContainer',
        borderColor: '$secondaryContainer',
      },
      outline: {
        color: '$primary',
        bc: '$surfacePrimary1',
        borderColor: '$primary',
      },
      neutral: {
        bc: '$surface1',
        color: '$onSurfaceVariant',
        borderColor: '$surfaceVariant',
      },
    },
  },
});
