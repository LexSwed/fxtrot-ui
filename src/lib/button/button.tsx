import { classed as css, type VariantProps } from '@tw-classed/core';
import { type ComponentProps, type ElementType, forwardRef, Children } from 'react';
import cx from 'clsx';

import { isValidElement } from 'react';
import { flexCss, type FlexVariants } from '../flex/flex';
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
      className={cx(buttonCss(props), isIconButton(props) && styles['button--icon'])}
      aria-label={label}
      title={label}
      disabled={disabled}
      aria-disabled={disabled}
      type={type}
      ref={ref}
    >
      {children}
      {icon ? <Icon as={icon} size={size} /> : null}
    </button>
  );
});

Button.displayName = 'Button';

interface LinkButtonProps extends ButtonOwnProps, ComponentProps<'a'> {}

const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>((props, ref) => {
  const { icon, label, size = 'md', children, ...rest } = props;
  return (
    <a
      {...rest}
      className={cx(buttonCss(props), isIconButton(props) && styles['button--icon'])}
      aria-label={label}
      title={label}
      ref={ref}
    >
      {icon ? <Icon as={icon} size={size} /> : null}
      {children}
    </a>
  );
});

/**
 * Checks if the Button has only icon inside.
 * CSS-only :has(>svg:only-child) would not count text nodes.
 */
function isIconButton(props: ButtonProps | LinkButtonProps) {
  // icon passed as props
  if (props.icon) return Children.count(props.children) === 0;

  // icon used as children
  return Children.count(props.children) === 1 && isValidElement(props.children) && props.children.type === Icon;
}

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
