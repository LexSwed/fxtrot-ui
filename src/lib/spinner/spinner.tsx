import { classed as css, type VariantProps } from '@tw-classed/core';
import { clsx } from 'clsx';
import type { ComponentProps } from 'react';

import styles from './spinner.module.css';

interface Props extends ComponentProps<'svg'>, VariantProps<typeof spinnerCss> {}

export const Spinner = ({ size = 'md', className, ...props }: Props) => {
  return (
    <svg
      className={clsx(spinnerCss({ size }), className)}
      {...props}
      viewBox="0 0 50 50"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <circle cx="25" cy="25" r="20" fill="none" strokeWidth="4" className={styles.circle} />
    </svg>
  );
};
const spinnerCss = css(styles.spinner, {
  variants: {
    size: {
      sm: styles['size--sm'],
      md: styles['size--md'],
      lg: styles['size--lg'],
      xl: styles['size--xl'],
    },
  },
});
