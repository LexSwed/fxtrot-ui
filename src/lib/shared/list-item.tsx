import { ElementType, forwardRef, ReactElement } from 'react';
import { classed as css, VariantProps } from '@tw-classed/core';
import { clsx } from 'clsx';
import { flexCss, FlexVariants } from '../flex/flex';
import type { PolyProps, PolyRef } from '../utils/polymorphic';

import styles from './list-item.module.css';

type ListItemProps<C extends ElementType> = PolyProps<C, ListItemVariants>;
type ListItemComponent = <C extends ElementType = 'span'>(props: ListItemProps<C>) => ReactElement | null;

export const ListItem: ListItemComponent = forwardRef(
  <C extends ElementType = 'div'>({ as, className, ...props }: ListItemProps<C>, ref: PolyRef<C>) => {
    const Component = as || 'div';
    return <Component className={clsx(listItemCss(props), className)} {...props} ref={ref} />;
  }
);

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
