import { classed as css, VariantProps } from '@tw-classed/core';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import type { ForwardRefComponent } from '../utils/polymorphic';

const gap = {
  'none': 'gap-none',
  'xs': 'gap-xs',
  'sm': 'gap-sm',
  'md': 'gap-md',
  'lg': 'gap-lg',
  'xl': 'gap-xl',
  '2xl': 'gap-2xl',
} as const;

export const flex = css('flex', {
  variants: {
    display: {
      inline: 'inline-flex',
      flex: 'flex',
    },
    gap,
    main: {
      'start': 'justify-start',
      'center': 'justify-center',
      'end': 'justify-end',
      'space-between': 'justify-between',
      'evenly': 'justify-evenly',
    },
    cross: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
    },
    flow: {
      'row': 'flex-row',
      'column': 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'column-reverse': 'flex-col-reverse',
    },
    wrap: {
      wrap: 'flex-wrap',
      nowrap: 'flex-nowrap',
      reverse: 'flex-wrap-reverse',
    },
    flex: {
      auto: 'flex-auto',
      initial: 'flex-initial',
      none: 'flex-none',
    },
  },
  defaultVariants: {
    display: 'flex',
  },
});

export type FlexVariants = VariantProps<typeof flex>;

interface FlexProps extends FlexVariants {}

export const Flex = forwardRef((props, ref) => {
  const { as: As = 'div' } = props;
  return <As className={clsx(flex(props), props.className)} {...props} ref={ref} />;
}) as ForwardRefComponent<'div', FlexProps>;

interface RowProps extends FlexVariants {
  flow?: Extract<FlexVariants['flow'], 'row' | 'row-reverse'>;
}
export const Row = forwardRef(({ as: As = 'div', flow = 'row', className, ...props }, ref) => {
  return <As className={clsx(flex({ ...props, flow }), className)} {...props} ref={ref} />;
}) as ForwardRefComponent<'div', RowProps>;

interface ColumnProps extends FlexVariants {
  flow?: Extract<FlexVariants['flow'], 'column' | 'column-reverse'>;
}
export const Column = forwardRef(({ as: As = 'div', flow = 'column', className, ...props }, ref) => {
  return <As className={clsx(flex({ ...props, flow }), className)} {...props} ref={ref} />;
}) as ForwardRefComponent<'div', ColumnProps>;

const grid = css({
  variants: {
    display: {
      grid: 'grid',
      inline: 'inline-grid',
    },
    gap,
    rowGap: gap,
    columnGap: gap,
    placeItems: {
      start: 'place-items-start',
      center: 'place-items-end',
      end: 'place-items-end',
      baseline: 'place-items-baseline',
      stretch: 'place-items-stretch',
    },
    rows: {
      none: 'grid-rows-none',
      1: 'grid-rows-1',
      2: 'grid-rows-2',
      3: 'grid-rows-3',
      4: 'grid-rows-4',
      5: 'grid-rows-5',
      6: 'grid-rows-6',
    },
    columns: {
      none: 'grid-cols-none',
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
    },
    flow: {
      'row': 'grid-flow-row',
      'column': 'grid-flow-col',
      'dense': 'grid-flow-dense',
      'row-dense': 'grid-flow-row-dense',
      'column-dense': 'grid-flow-col-dense',
    },
  },
  defaultVariants: {
    display: 'grid',
  },
});

interface GridProps extends VariantProps<typeof grid> {}

export const Grid = forwardRef(({ as: As = 'div', className, ...props }, ref) => {
  return <As className={clsx(grid(props), className)} {...props} ref={ref} />;
}) as ForwardRefComponent<'div', GridProps>;
