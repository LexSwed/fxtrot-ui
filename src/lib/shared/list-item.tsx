import { classed as css, VariantProps } from '@tw-classed/core';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { flexCss, FlexVariants } from '../flex/flex';
import type { ForwardRefComponent } from '../utils/polymorphic';

import styles from './list-item.module.css';

interface ListItemProps extends ListItemVariants {}

const ListItem = forwardRef(
  ({ as: As = 'div', gap = 'sm', cross = 'center', className, size = 'md', ...props }, ref) => {
    return <As className={clsx(listItemCss({ size }), className)} {...props} ref={ref} />;
  }
) as ForwardRefComponent<'div', ListItemProps>;

export { ListItem };

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

export const listItemCss = ({ flow = 'row', gap = 'sm', cross = 'center', size = 'md', ...props }: ListItemVariants) =>
  listItemCssInner({ flow, gap, cross, size, ...props });
