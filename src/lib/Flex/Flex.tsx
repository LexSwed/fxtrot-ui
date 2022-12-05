import { classed as css, VariantProps } from '@tw-classed/core';
import { classed } from '@tw-classed/react';

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
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
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

export const Flex = classed('div', flex);

export const Row = classed(Flex, {
  variants: {
    flow: {
      row: 'flex-row',
      reverse: 'flex-row-reverse',
    },
  },
  defaultVariants: {
    flow: 'row',
  },
});

export const Column = classed(Flex, {
  variants: {
    flow: {
      column: 'flex-col',
      reverse: 'flex-col-reverse',
    },
  },
  defaultVariants: {
    flow: 'column',
  },
});
