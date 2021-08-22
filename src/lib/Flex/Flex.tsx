import type { VariantProps } from '@stitches/react';

import { styled, css } from '../stitches.config';

export const mainAxisAlignment = css({
  variants: {
    main: {
      'start': {
        justifyContent: 'flex-start',
      },
      'center': {
        justifyContent: 'center',
      },
      'end': {
        justifyContent: 'flex-end',
      },
      'stretch': {
        justifyContent: 'stretch',
      },
      'space-between': {
        justifyContent: 'space-between',
      },
    },
  },
});

export const crossAxisAlignment = css({
  variants: {
    cross: {
      start: {
        alignItems: 'flex-start',
      },
      center: {
        alignItems: 'center',
      },
      end: {
        alignItems: 'flex-end',
      },
      stretch: {
        alignItems: 'stretch',
      },
    },
  },
});

export const Flex = styled('div', mainAxisAlignment, crossAxisAlignment, {
  variants: {
    display: {
      flex: {
        display: 'flex',
      },
      inline: {
        display: 'inline-flex',
      },
    },
    gap: {
      'none': {
        gap: '$0',
      },
      'xs': {
        gap: '$1',
      },
      'sm': {
        gap: '$2',
      },
      'base': {
        gap: '$base',
      },
      'md': {
        gap: '$6',
      },
      'lg': {
        gap: '$8',
      },
      'xl': {
        gap: '$10',
      },
      '2xl': {
        gap: '$16',
      },
    },
    wrap: {
      'wrap': {
        flexWrap: 'wrap',
      },
      'nowrap': {
        flexWrap: 'nowrap',
      },
      'revert': {
        flexWrap: 'revert',
      },
      'wrap-reverse': {
        flexWrap: 'wrap-reverse',
      },
    },
    flow: {
      'row': {
        flexDirection: 'row',
      },
      'row-reverse': {
        flexDirection: 'row-reverse',
      },
      'column': {
        flexDirection: 'column',
      },
      'column-reverse': {
        flexDirection: 'column-reverse',
      },
    },
  },
  defaultVariants: {
    gap: 'none',
    display: 'flex',
  },
});

export type FlexVariants = VariantProps<typeof Flex>;
