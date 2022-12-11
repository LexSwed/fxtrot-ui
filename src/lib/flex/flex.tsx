import { classed as css, VariantProps } from '@tw-classed/core';
import { clsx } from 'clsx';
import { forwardRef, ElementType } from 'react';
import type { PolyProps, PolyRef } from '../utils/polymorphic';

import styles from './flex.module.css';

const gap = {
  'none': styles['gap--none'],
  'xs': styles['gap--xs'],
  'sm': styles['gap--sm'],
  'md': styles['gap--md'],
  'lg': styles['gap--lg'],
  'xl': styles['gap--xl'],
  '2xl': styles['gap--2xl'],
  '3xl': styles['gap--3xl'],
} as const;

export const flexCss = css({
  variants: {
    display: {
      inline: styles['display--inline'],
      flex: styles['display--flex'],
    },
    gap,
    main: {
      'start': styles['main--start'],
      'center': styles['main--center'],
      'end': styles['main--end'],
      'space-between': styles['main--space-between'],
      'evenly': styles['main--evenly'],
    },
    cross: {
      start: styles['cross--start'],
      center: styles['cross--center'],
      end: styles['cross--end'],
      baseline: styles['cross--baseline'],
      stretch: styles['cross--stretch'],
    },
    flow: {
      'row': styles['flow--row'],
      'column': styles['flow--column'],
      'row-reverse': styles['flow--row-reverse'],
      'column-reverse': styles['flow--column-reverse'],
    },
    wrap: {
      wrap: styles['wrap--wrap'],
      nowrap: styles['wrap--nowrap'],
      reverse: styles['wrap--reverse'],
    },
    flex: {
      auto: styles['flex--auto'],
      initial: styles['flex--initial'],
      none: styles['flex--none'],
    },
  },
});

export type FlexVariants = VariantProps<typeof flexCss>;

interface FlexProps extends FlexVariants {}

export const Flex = forwardRef(function Flex<C extends ElementType = 'div'>(
  { as, display = 'flex', gap, main, cross, flow, wrap, flex, className, ...props }: PolyProps<C, FlexProps>,
  ref: PolyRef<C>
) {
  const Component = as || 'div';
  return (
    <Component
      className={clsx(flexCss({ display, gap, main, cross, flow, wrap, flex }), className)}
      {...props}
      ref={ref}
    />
  );
});

interface RowProps extends FlexVariants {
  flow?: Extract<FlexVariants['flow'], 'row' | 'row-reverse'>;
}
export const Row = forwardRef(function Row<C extends ElementType = 'div'>(
  { flow = 'row', ...props }: PolyProps<C, RowProps>,
  ref: PolyRef<C>
) {
  return <Flex flow={flow} {...props} ref={ref} />;
});

interface ColumnProps extends FlexVariants {
  flow?: Extract<FlexVariants['flow'], 'column' | 'column-reverse'>;
}
export const Column = forwardRef(function Column<C extends ElementType = 'div'>(
  { flow = 'column', ...props }: PolyProps<C, ColumnProps>,
  ref: PolyRef<C>
) {
  return <Flex flow={flow} {...props} ref={ref} />;
});

const grid = css({
  variants: {
    display: {
      grid: styles['display--grid'],
      inline: styles['display--inline-grid'],
    },
    gap,
    rowGap: gap,
    columnGap: gap,
    placeItems: {
      start: styles['place-items--start'],
      center: styles['place-items--center'],
      end: styles['place-items--end'],
      baseline: styles['place-items--baseline'],
      stretch: styles['place-items--stretch'],
    },
    rows: {
      none: styles['rows--none'],
      1: styles['rows--1'],
      2: styles['rows--2'],
      3: styles['rows--3'],
      4: styles['rows--4'],
      5: styles['rows--5'],
      6: styles['rows--6'],
    },
    columns: {
      none: styles['columns--none'],
      1: styles['columns--1'],
      2: styles['columns--2'],
      3: styles['columns--3'],
      4: styles['columns--4'],
      5: styles['columns--5'],
      6: styles['columns--6'],
    },
    flow: {
      'row': styles['grid-flow--row'],
      'column': styles['grid-flow--column'],
      'dense': styles['grid-flow--dense'],
      'row-dense': styles['grid-flow--row-dense'],
      'column-dense': styles['grid-flow--column-dense'],
    },
  },
  defaultVariants: {
    display: 'grid',
  },
});

interface GridProps extends VariantProps<typeof grid> {}

export const Grid = forwardRef(function Grid<C extends ElementType = 'div'>(
  {
    as,
    display,
    placeItems,
    flow,
    rows,
    columns,
    columnGap,
    rowGap,
    gap,
    className,
    ...props
  }: PolyProps<C, GridProps>,
  ref: PolyRef<C>
) {
  const Component = as || 'div';
  return (
    <Component
      className={clsx(grid({ display, placeItems, flow, rows, columns, columnGap, rowGap, gap }), className)}
      {...props}
      ref={ref}
    />
  );
});
