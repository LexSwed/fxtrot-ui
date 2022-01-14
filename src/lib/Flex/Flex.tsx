import type { VariantProps } from '@stitches/react';

import { styled, css } from '../stitches.config';
import { createScale } from '../utils/variants';

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
      baseline: {
        alignItems: 'baseline',
      },
    },
  },
});

export const flexCss = css(mainAxisAlignment, crossAxisAlignment, {
  variants: {
    display: {
      flex: {
        display: 'flex',
      },
      inline: {
        display: 'inline-flex',
      },
    },
    gap: createScale('gap'),
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

export const Flex = styled('div', flexCss);

export const Row = styled('div', flexCss, {
  variants: {
    flow: {
      row: {
        flexDirection: 'row',
      },
      reverse: {
        flexDirection: 'row-reverse',
      },
    },
  },
  defaultVariants: {
    flow: 'row',
  },
});

export const Column = styled('div', flexCss, {
  variants: {
    flow: {
      column: {
        flexDirection: 'column',
      },
      reverse: {
        flexDirection: 'column-reverse',
      },
    },
  },
  defaultVariants: {
    flow: 'column',
  },
});

export type FlexVariants = VariantProps<typeof Flex>;
