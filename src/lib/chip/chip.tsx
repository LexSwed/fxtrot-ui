import { type AriaAttributes, type ComponentProps, type ElementType, forwardRef } from 'react';
import { classed as css, type VariantProps } from '@tw-classed/core';
import { clsx } from 'clsx';

import { Flex } from '../flex';
import type { FlexVariants } from '../flex/flex';
import { Icon } from '../icon';
import styles from './chip.module.css';

type SelectableProps<T> = T extends { 'role': 'option'; 'aria-selected': AriaAttributes['aria-selected'] }
  ? ComponentProps<'button'>
  : ComponentProps<'div'>;
type Props<T> = VariantProps<typeof chipCss> &
  FlexVariants &
  SelectableProps<T> & {
    icon?: ElementType;
  };

export const Chip = forwardRef(function Chip<T>(
  {
    size = 'md',
    main = 'center',
    cross = 'center',
    gap = size === 'sm' ? 'xs' : 'sm',
    className,
    children,
    icon,
    ...props
  }: Props<T>,
  ref: Props<T>['ref']
) {
  const selectable = typeof props['aria-selected'] !== 'undefined';
  return (
    <Flex
      {...(props as any)}
      main={main}
      cross={cross}
      gap={gap}
      className={clsx(chipCss({ size }), className)}
      role={selectable ? 'option' : undefined}
      as={selectable ? 'button' : 'div'}
      ref={ref as any}
    >
      {icon ? <Icon as={icon} size={size} /> : null}
      {children}
    </Flex>
  );
});

const chipCss = css(styles.chip, {
  variants: {
    size: {
      sm: styles['size--sm'],
      md: styles['size--md'],
      lg: styles['size--lg'],
    },
  },
});
