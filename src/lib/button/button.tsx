import { classed as css, VariantProps } from '@tw-classed/core';
import { Children, ComponentProps, ElementType, forwardRef, isValidElement } from 'react';
import { clsx } from 'clsx';

import { flexCss } from '../flex/flex';
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
      className={buttonCssWithDefaults(props)}
      aria-label={label}
      title={label}
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
    <a {...rest} className={buttonCssWithDefaults(props)} aria-label={label} title={label} ref={ref}>
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
});

const buttonCssWithDefaults = <T extends keyof JSX.IntrinsicElements>({
  variant = 'flat',
  size = 'md',
  main = 'center',
  cross = 'center',
  flow = 'row',
  gap = 'sm',
  icon,
  className,
  children,
  ...props
}: ButtonOwnProps & ComponentProps<T>) => {
  const isIconButton =
    (Children.count(children) === 1 && isValidElement(children) && children.type === Icon) ||
    (Children.count(children) === 0 && !!icon);
  return clsx(
    buttonCss({ variant, size, main, flow, gap, cross, ...props }),
    isIconButton ? styles['button--icon'] : undefined,
    className
  );
};

export { Button, LinkButton };
