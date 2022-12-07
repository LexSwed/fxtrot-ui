import { classed as css, VariantProps } from '@tw-classed/core';
import { clsx } from 'clsx';
import { type ComponentProps, type ElementType, forwardRef } from 'react';

interface Props extends ComponentProps<'svg'>, VariantProps<typeof iconCss> {
  as: ElementType;
}

const Icon = forwardRef<SVGSVGElement, Props>(({ color, as: Svg, className, size = 'md', children, ...props }, ref) => {
  return (
    <Svg
      {...props}
      // aria-hidden for empty icon usage, e.g. in Dropdown Menu
      aria-hidden={props['aria-hidden'] || !Svg}
      ref={ref}
      className={clsx(iconCss({ size }), className)}
    />
  );
});

const iconCss = css('inline-block flex-shrink-0 flex-grow-0', {
  variants: {
    size: {
      'xs': 'size-3.5 stroke-[3px]',
      'sm': 'size-4',
      'md': 'size-5',
      'lg': 'size-6',
      'xl': 'size-7',
      '2xl': 'size-8',
      '3xl': 'size-12',
      '4xl': 'size-16',
      '5xl': 'size-20',
      '6xl': 'size-24',
      'inherit': 'size-[1em]',
    },
  },
});

export { Icon };
