import { forwardRef } from 'react';
import { classed as css, type VariantProps } from '@tw-classed/core';
import { clsx } from 'clsx';

import type { ForwardRefComponent } from '../utils/polymorphic';

import styles from './heading.module.css';

interface HeadingProps extends HeadingVariants {
  disabled?: boolean;
}

export const Heading = forwardRef(
  ({ as: Component = 'h1', variant = 'default', level = '1', dense = true, className, ...props }, ref) => {
    return <Component className={clsx(headingCss({ variant, level, dense }), className)} {...props} ref={ref} />;
  }
) as ForwardRefComponent<'h1', HeadingProps>;

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
