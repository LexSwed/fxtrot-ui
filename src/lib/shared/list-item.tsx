import { forwardRef } from 'react';
import { classed as css, type VariantProps } from '@tw-classed/core';
import { clsx } from 'clsx';
import { flexCss, type FlexVariants } from '../flex/flex';
import type { ForwardRefComponent } from '../utils/polymorphic';

import styles from './list-item.module.css';

interface ListItemProps extends ListItemVariants {}

export const ListItem = forwardRef(({ as: Component = 'div', className, ...props }, ref) => {
  return <Component className={clsx(listItemCss(props), className)} {...props} ref={ref} />;
}) as ForwardRefComponent<'div', ListItemProps>;

const listItemCssInner = css(styles['list-item'], flexCss, {
  variants: {
    size: {
      sm: styles['size--sm'],
      md: styles['size--md'],
      lg: styles['size--lg'],
    },
  },
});

export type ListItemVariants = VariantProps<typeof listItemCssInner> & FlexVariants;

export const listItemCss = ({
  flow = 'row',
  gap = 'sm',
  cross = 'center',
  size = 'md',
  display = 'flex',
  ...props
}: ListItemVariants) => listItemCssInner({ flow, gap, cross, size, display, ...props });
