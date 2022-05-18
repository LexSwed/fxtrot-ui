import React from 'react';

import { CssStyles, styled } from '../stitches.config';

interface Props extends Omit<React.ComponentProps<typeof IconBox>, 'as' | 'color' | 'children'> {
  as: React.ElementType;
  color?: CssStyles['color'];
}

export const Icon: React.FC<Props> = React.forwardRef<SVGSVGElement, Props>(
  ({ size = 'md', color, css, ...props }, ref) => {
    const style = color ? ({ ...css, color } as any) : css;
    return <IconBox size={size} {...props} css={style} ref={ref} />;
  }
);

export const IconBox = styled('svg', {
  display: 'inline-block',
  flexShrink: 0,
  variants: {
    size: {
      'xs': {
        blockSize: '$2',
      },
      'sm': {
        blockSize: '$3',
      },
      'md': {
        blockSize: '$4',
      },
      'base': {
        blockSize: '$4',
      },
      'lg': {
        blockSize: '$5',
      },
      'xl': {
        blockSize: '$6',
      },
      '2xl': {
        blockSize: '$8',
      },
      '3xl': {
        blockSize: '$12',
      },
      '4xl': {
        blockSize: '$16',
      },
      '5xl': {
        blockSize: '$20',
      },
      '6xl': {
        blockSize: '$24',
      },
    },
  },
});
