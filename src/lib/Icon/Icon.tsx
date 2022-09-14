import React from 'react';
import { CssStyles, styled } from '../stitches.config';

interface Props extends Omit<React.ComponentProps<typeof IconSvg>, 'as' | 'color' | 'children'> {
  as: React.ElementType;
  color?: CssStyles['color'];
}

const Icon = React.forwardRef<SVGSVGElement, Props>(({ color, css, ...props }, ref) => {
  return (
    <IconSvg {...props} css={color ? { color, ...css } : css} aria-hidden={props['aria-hidden'] || false} ref={ref} />
  );
});

const IconSvg = styled('svg', {
  display: 'inline-block',
  flexShrink: 0,
  flexGrow: 0,
  variants: {
    size: {
      'xs': {
        blockSize: '$2',
        minInlineSize: '$2',
      },
      'sm': {
        blockSize: '$3',
        minInlineSize: '$3',
      },
      'md': {
        blockSize: '$4',
        minInlineSize: '$4',
      },
      'base': {
        blockSize: '$4',
        minInlineSize: '$4',
      },
      'lg': {
        blockSize: '$5',
        minInlineSize: '$5',
      },
      'xl': {
        blockSize: '$6',
        minInlineSize: '$6',
      },
      '2xl': {
        blockSize: '$8',
        minInlineSize: '$8',
      },
      '3xl': {
        blockSize: '$12',
        minInlineSize: '$12',
      },
      '4xl': {
        blockSize: '$16',
        minInlineSize: '$16',
      },
      '5xl': {
        blockSize: '$20',
        minInlineSize: '$20',
      },
      '6xl': {
        blockSize: '$24',
        minInlineSize: '$24',
      },
      'inherit': {
        blockSize: '1em',
        minInlineSize: '1em',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const { selector, className, toString } = IconSvg;

// copy stitches-specific properties
Object.assign(Icon, { selector, className, toString });

export { Icon };
