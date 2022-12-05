import { classed as css, VariantProps } from '@tw-classed/core';
import { ComponentProps, forwardRef } from 'react';
import { clsx } from 'clsx';

import { flex } from '../flex/flex';

import styles from './button.module.css';

export const buttonCss = css(styles.button, flex, {
  variants: {
    variant: {
      flat: styles['button--flat'],
      primary: styles['button--primary'],
      tonal: styles['button--tonal'],
      outline: styles['button--outline'],
      link: styles['button--link'],
    },
    size: {
      xs: styles['button--xs'],
      sm: styles['button--sm'],
      md: styles['button--md'],
      lg: styles['button--lg'],
    },
    intent: {
      danger: styles['button--danger'],
    },
  },
});

export type ButtonVariants = VariantProps<typeof buttonCss>;

interface Props extends ButtonVariants, ComponentProps<'button'> {}

const Button = forwardRef<HTMLButtonElement, Props>(
  // we can't put defaultVariants for inherited flex styles
  (
    {
      type = 'button',
      variant = 'flat',
      size = 'md',
      main = 'center',
      cross = 'center',
      flow = 'row',
      gap = 'xs',
      ...props
    },
    ref
  ) => {
    return (
      <button
        {...props}
        className={clsx(buttonCss({ variant, size, main, flow, gap, cross, ...props }), props.className)}
        aria-disabled={props.disabled}
        type={type}
        ref={ref}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
