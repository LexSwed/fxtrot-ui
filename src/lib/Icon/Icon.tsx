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
  flexGrow: 0,
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
