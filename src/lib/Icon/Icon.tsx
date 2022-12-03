import { type ComponentProps, type ElementType, forwardRef } from 'react';
import { CssStyles, styled } from '../stitches.config';

interface Props extends Omit<ComponentProps<typeof IconSvg>, 'as' | 'color' | 'children'> {
  as: ElementType;
  color?: CssStyles['color'];
}

const Icon = forwardRef<SVGSVGElement, Props>(({ color, css, ...props }, ref) => {
  return (
    <IconSvg
      {...props}
      css={color ? { color, ...css } : css}
      // aria-hidden for empty icon usage, e.g. in Dropdown Menu
      aria-hidden={props['aria-hidden'] || !props.as}
      ref={ref}
    />
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
        inlineSize: '$2',
      },
      'sm': {
        blockSize: '$3',
        inlineSize: '$3',
      },
      'md': {
        blockSize: '$4',
        inlineSize: '$4',
      },
      'base': {
        blockSize: '$4',
        inlineSize: '$4',
      },
      'lg': {
        blockSize: '$5',
        inlineSize: '$5',
      },
      'xl': {
        blockSize: '$6',
        inlineSize: '$6',
      },
      '2xl': {
        blockSize: '$8',
        inlineSize: '$8',
      },
      '3xl': {
        blockSize: '$12',
        inlineSize: '$12',
      },
      '4xl': {
        blockSize: '$16',
        inlineSize: '$16',
      },
      '5xl': {
        blockSize: '$20',
        inlineSize: '$20',
      },
      '6xl': {
        blockSize: '$24',
        inlineSize: '$24',
      },
      'inherit': {
        blockSize: '1em',
        inlineSize: '1em',
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
