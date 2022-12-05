import { classed as css, VariantProps } from '@tw-classed/core';
import clsx from 'clsx';
import { ComponentProps, forwardRef } from 'react';
import type { ForwardRefComponent } from '../utils/polymorphic';

export const flex = css('flex', {
  variants: {
    display: {
      inline: 'inline-flex',
      flex: 'flex',
    },
    gap: {
      'none': 'gap-none',
      'xs': 'gap-xs',
      'sm': 'gap-sm',
      'md': 'gap-md',
      'lg': 'gap-lg',
      'xl': 'gap-xl',
      '2xl': 'gap-2xl',
    },
    main: {
      'start': 'justify-start',
      'center': 'justify-center',
      'end': 'justify-end',
      'space-between': 'justify-between',
      'around': 'justify-around',
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

interface FlexProps extends FlexVariants, ComponentProps<'div'> {}

export const Flex = forwardRef((props, ref) => {
  const { as: As = 'div' } = props;
  return <As className={clsx(flex(props), props.className)} {...props} ref={ref} />;
}) as ForwardRefComponent<'div', FlexProps>;

interface RowProps extends FlexProps {
  flow?: Extract<FlexVariants['flow'], 'row' | 'row-reverse'>;
}
export const Row = forwardRef(({ as: As = 'div', flow = 'row', className, ...props }, ref) => {
  return <As className={clsx(flex({ ...props, flow }), className)} {...props} ref={ref} />;
}) as ForwardRefComponent<'div', RowProps>;

interface ColumnProps extends FlexProps {
  flow?: Extract<FlexVariants['flow'], 'column' | 'column-reverse'>;
}
export const Column = forwardRef(({ as: As = 'div', flow = 'column', className, ...props }, ref) => {
  return <As className={clsx(flex({ ...props, flow }), className)} {...props} ref={ref} />;
}) as ForwardRefComponent<'div', ColumnProps>;
