import { classed as css, VariantProps } from '@tw-classed/core';
import { Children, ComponentProps, ElementType, forwardRef, isValidElement } from 'react';
import { clsx } from 'clsx';

import { flex } from '../flex/flex';
import { Icon } from '../icon';

import styles from './button.module.css';

interface ButtonOwnProps extends VariantProps<typeof buttonCss> {
  icon?: ElementType;
  label?: string;
}

interface ButtonProps extends ButtonOwnProps, ComponentProps<'button'> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { icon, label, type = 'button', size, disabled, children } = props;
  return (
    <button
      {...props}
      className={buttonCssWithDefaults(props)}
      aria-label={label}
      title={label}
      aria-disabled={disabled}
      type={type}
      ref={ref}
    >
      {icon ? <Icon as={icon} size={size} /> : null}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

interface LinkButtonProps extends ButtonOwnProps, ComponentProps<'a'> {}

const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>((props, ref) => {
  const { icon, label, size, children } = props;
  return (
    <a {...props} className={buttonCssWithDefaults(props)} aria-label={label} title={label} ref={ref}>
      {icon ? <Icon as={icon} size={size} /> : null}
      {children}
    </a>
  );
});

const buttonCss = css(styles.button, flex, {
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
  const isIconButton = !!icon || (Children.count(children) === 1 && isValidElement(children) && children.type === Icon);
  return clsx(
    buttonCss({ variant, size, main, flow, gap, cross, ...props }),
    isIconButton ? styles['button--icon'] : undefined,
    className
  );
};

export { Button, LinkButton };
