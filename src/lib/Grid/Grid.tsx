import React from 'react';

import { createScale } from '../utils/variants';
import { styled } from '../stitches.config';
import { mainAxisAlignment, crossAxisAlignment } from '../Flex/Flex';
import type { CssStyles } from '..';

interface Props extends React.ComponentProps<typeof GridStyled> {
  columns?: CssStyles['gridTemplateColumns'];
  rows?: CssStyles['gridTemplateRows'];
  template?: CssStyles['gridTemplate'];
  areas?: CssStyles['gridTemplateAreas'];
  autoColumns?: CssStyles['gridAutoColumns'];
  autoRows?: CssStyles['gridAutoRows'];
  autoFlow?: CssStyles['gridAutoFlow'];
  placeItems?: CssStyles['placeItems'];
}

export const Grid = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      columns: gridTemplateColumns,
      rows: gridTemplateRows,
      template: gridTemplate,
      areas: gridTemplateAreas,
      autoColumns: gridAutoColumns,
      autoRows: gridAutoRows,
      autoFlow: gridAutoFlow,
      placeItems,
      css,
      ...props
    },
    ref
  ) => {
    const styles = {
      columns: gridTemplateColumns,
      rows: gridTemplateRows,
      template: gridTemplate,
      areas: gridTemplateAreas,
      autoColumns: gridAutoColumns,
      autoRows: gridAutoRows,
      autoFlow: gridAutoFlow,
      placeItems,
      ...css,
    } as const;
    Object.keys(styles).forEach((key) => {
      if (!styles[key as keyof typeof styles]) {
        delete styles[key as keyof typeof styles];
      }
    });
    return <GridStyled css={styles} {...props} ref={ref} />;
  }
);

Grid.displayName = 'Grid';

const GridStyled = styled('div', mainAxisAlignment, crossAxisAlignment, {
  variants: {
    display: {
      grid: {
        display: 'grid',
      },
      inline: {
        display: 'inline-grid',
      },
    },
    gap: createScale('gap'),
    rowGap: createScale('rowGap'),
    columnGap: createScale('columnGap'),
  },
  defaultVariants: {
    display: 'grid',
    gap: '0',
  },
});
