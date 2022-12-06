import clsx from 'clsx';
import { ComponentProps, ElementType, forwardRef } from 'react';
import { ButtonVariants, buttonCss } from '../button-1/button';

import styles from '../button-1/button.module.css';
import { Icon } from '../icon-1';

interface Props extends ComponentProps<'a'>, ButtonVariants {
  label?: string;
  icon?: ElementType;
}

const LinkButton = forwardRef<HTMLAnchorElement, Props>(
  (
    {
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
    return (
      <a
        {...props}
        className={clsx(
          buttonCss({ variant, size, main, flow, gap, cross, ...props }),
          icon ? styles['button--icon'] : undefined,
          props.className
        )}
        aria-label={label}
        title={label}
        ref={ref}
      >
        {icon ? <Icon as={icon} size={size} /> : children}
        {children}
      </a>
    );
  }
);

export { LinkButton };
