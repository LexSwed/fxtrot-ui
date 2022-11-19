import type { CSSProperties } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { gaps } from '../utils/variants.css';

export const mainAxisAlignment = {
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
} satisfies Record<string, CSSProperties>;

export const crossAxisAlignment = {
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
} satisfies Record<string, CSSProperties>;


export const flex = recipe({
  variants: {
    display: {
      flex: {
        display: 'flex',
      },
      inline: {
        display: 'inline-flex',
      },
    },
    main: mainAxisAlignment,
    cross: crossAxisAlignment,
    gap: gaps,
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
    display: 'flex',
  },
});

export type FlexVariants = RecipeVariants<typeof flex>;
