import { rowGaps, columnGaps, gaps } from '../utils/variants.css';
import { mainAxisAlignment, crossAxisAlignment } from '../Flex/flex.css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

export const grid = recipe({
  variants: {
    display: {
      grid: {
        display: 'grid',
      },
      inline: {
        display: 'inline-grid',
      },
    },
    main: mainAxisAlignment,
    cross: crossAxisAlignment,
    gap: gaps,
    rowGap: rowGaps,
    columnGap: columnGaps,
  },
});

export type GridVariants = RecipeVariants<typeof grid>;
