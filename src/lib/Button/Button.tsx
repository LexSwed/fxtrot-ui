import { classed as css, VariantProps } from '@tw-classed/core';
import { Children, ComponentProps, ElementType, forwardRef, isValidElement } from 'react';
import { clsx } from 'clsx';

import { flex } from '../flex/flex';
import { Icon } from '../Icon';

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

interface Props extends ButtonVariants, ComponentProps<'button'> {
  icon?: ElementType;
  label?: string;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    // can't put defaultVariants for inherited flex styles(
    {
      type = 'button',
      variant = 'flat',
      size = 'md',
      main = 'center',
      cross = 'center',
      flow = 'row',
      gap = 'sm',
      icon,
      children,
      label,
      ...props
    },
    ref
  ) => {
    const isIconButton =
      !!icon || (Children.count(children) === 1 && isValidElement(children) && children.type === Icon);
    return (
      <button
        {...props}
        className={clsx(
          buttonCss({ variant, size, main, flow, gap, cross, ...props }),
          isIconButton ? styles['button--icon'] : undefined,
          props.className
        )}
        aria-label={label}
        title={label}
        aria-disabled={props.disabled}
        type={type}
        ref={ref}
      >
        {icon ? <Icon as={icon} size={size} /> : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
