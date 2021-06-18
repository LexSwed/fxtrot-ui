import React from 'react';

import Box from '../Box/Box';
import { gaps, flexMainAxisAlignment, flexCrossAxisAlignment, createGaps } from '../utils/variants';
import { styled } from '../stitches.config';
import type { CssStyles } from '../utils/types';

const GridStyled = styled(Box, {
  variants: {
    gap: gaps,
    rowGap: createGaps('rowGap'),
    columnGap: createGaps('columnGap'),
    display: {
      grid: {
        display: 'grid',
      },
      inline: {
        display: 'inline-grid',
      },
    },
    main: flexMainAxisAlignment,
    cross: flexCrossAxisAlignment,
  },
  defaultVariants: {
    display: 'grid',
    gap: 'none',
  },
});

interface Props extends React.ComponentProps<typeof GridStyled> {
  columns?: CssStyles['gridTemplateColumns'];
  rows?: CssStyles['gridTemplateRows'];
}

const Grid = React.forwardRef<HTMLDivElement, Props>(({ columns, rows, ...props }, ref) => {
  return <GridStyled gridTemplateColumns={columns} gridTemplateRows={rows} {...props} ref={ref} />;
});

Grid.displayName = 'Grid';

export default Grid;
