import { classed as css, type VariantProps } from '@tw-classed/core';
import { type ComponentProps, type ElementType, forwardRef } from 'react';

import { flexCss, FlexVariants } from '../flex/flex';
import { Icon } from '../icon';

import styles from './button.module.css';

interface ButtonOwnProps extends VariantProps<typeof buttonCss> {
  icon?: ElementType;
  label?: string;
}

interface ButtonProps extends ButtonOwnProps, ComponentProps<'button'> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { icon, label, type = 'button', size = 'md', disabled, children, ...rest } = props;
  return (
    <button
      {...rest}
      className={buttonCss(props)}
      aria-label={label}
      title={label}
      disabled={disabled}
      aria-disabled={disabled}
      type={type}
      ref={ref}
    >
      {children}
      {icon ? <Icon as={icon} size={size} className={styles.icon} /> : null}
    </button>
  );
});

Button.displayName = 'Button';

interface LinkButtonProps extends ButtonOwnProps, ComponentProps<'a'> {}

const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>((props, ref) => {
  const { icon, label, size = 'md', children, ...rest } = props;
  return (
    <a {...rest} className={buttonCss(props)} aria-label={label} title={label} ref={ref}>
      {icon ? <Icon as={icon} size={size} /> : null}
      {children}
    </a>
  );
});

const buttonCss = css(styles.button, flexCss, {
  variants: {
    variant: {
      flat: styles['variant--flat'],
      primary: styles['variant--primary'],
      tonal: styles['variant--tonal'],
      outline: styles['variant--outline'],
      link: styles['variant--link'],
    },
    size: {
      xs: styles['size--xs'],
      sm: styles['size--sm'],
      md: styles['size--md'],
      lg: styles['size--lg'],
    },
    intent: {
      danger: styles['intent--danger'],
    },
  },
  defaultVariants: {
    ...{
      ...({
        display: 'inline',
        main: 'center',
        cross: 'center',
        flow: 'row',
        gap: 'sm',
      } satisfies FlexVariants),
    },
    variant: 'flat',
    size: 'md',
  },
});

export { Button, LinkButton };
