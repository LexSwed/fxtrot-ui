import { ElementType, forwardRef } from 'react';
import { classed as css, VariantProps } from '@tw-classed/core';
import { clsx } from 'clsx';

import type { PolyProps, PolyRef } from '../utils/polymorphic';

import styles from './heading.module.css';

type HeadingProps<C extends ElementType = 'h1'> = PolyProps<C, HeadingVariants & { disabled?: boolean }>;
type HeadingComponent = <C extends ElementType = 'h1'>(props: HeadingProps<C>) => React.ReactElement | null;

export const Heading: HeadingComponent = forwardRef(
  <C extends ElementType = 'h1'>(
    { as, variant = 'default', level = '1', dense = true, className, ...props }: HeadingProps<C>,
    ref: PolyRef<C>
  ) => {
    const Component = as || 'h1';
    return <Component className={clsx(headingCss({ variant, level, dense }), className)} {...props} ref={ref} />;
  }
);

type HeadingVariants = VariantProps<typeof headingCss>;
const headingCss = css(styles.heading, {
  variants: {
    level: {
      1: styles['level--1'],
      2: styles['level--2'],
      3: styles['level--3'],
      4: styles['level--4'],
      5: styles['level--5'],
      6: styles['level--6'],
    },
    variant: {
      default: styles.default,
      light: styles.light,
    },
    dense: {
      true: styles.dense,
      false: styles.sparse,
    },
  },
});
