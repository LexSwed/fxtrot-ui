import { classed as css, type VariantProps } from '@tw-classed/core';
import { clsx } from 'clsx';
import { type ComponentProps, type ElementType, forwardRef } from 'react';

import styles from './icon.module.css';

interface Props extends ComponentProps<'svg'>, VariantProps<typeof iconCss> {
  as?: ElementType;
}

const Icon = forwardRef<SVGSVGElement, Props>(
  ({ color, as: Svg = 'svg', className, size = 'md', children, ...props }, ref) => {
    const hidden = props['aria-hidden'] || !Svg || !(props['aria-label'] || props['aria-labelledby']);
    return (
      <Svg
        {...props}
        // aria-hidden for empty icon usage, e.g. in Dropdown Menu
        aria-hidden={hidden}
        ref={ref}
        className={clsx(iconCss({ size }), className)}
      />
    );
  }
);

const iconCss = css(styles.icon, {
  variants: {
    size: {
      'xs': styles['icon--xs'],
      'sm': styles['icon--sm'],
      'md': styles['icon--md'],
      'lg': styles['icon--lg'],
      'xl': styles['icon--xl'],
      '2xl': styles['icon--2xl'],
      '3xl': styles['icon--3xl'],
      '4xl': styles['icon--4xl'],
      '5xl': styles['icon--5xl'],
      '6xl': styles['icon--6xl'],
      'inherit': styles['icon--inherit'],
    },
  },
});

export { Icon };
