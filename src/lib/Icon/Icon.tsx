import React from 'react';
import { css, CssStyles, styled } from '../stitches.config';

interface Props extends Omit<React.ComponentProps<typeof IconSvg>, 'as' | 'color' | 'children'> {
  as: React.ElementType;
  color?: CssStyles['color'];
}

const IconComponent = React.forwardRef<SVGSVGElement, Props>(({ color, css, ...props }, ref) => {
  return <IconSvg {...props} css={{ color, ...css }} ref={ref} />;
});

const IconSvg = styled('svg', {
  // create new stitches CSS selector
  '&:empty': {},
});

const iconCss = css({
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
  defaultVariants: {
    size: 'md',
  },
});

export const Icon = styled(IconComponent, iconCss);
