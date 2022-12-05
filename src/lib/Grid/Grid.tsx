import { type ComponentProps, forwardRef } from 'react';
import { rowGaps, columnGaps, gaps } from '../utils/variants';
import { styled } from '../stitches.config';
import { mainAxisAlignment, crossAxisAlignment } from '../Flex-copy/Flex';
import type { CssStyles } from '..';

interface Props extends ComponentProps<typeof GridStyled> {
  columns?: CssStyles['gridTemplateColumns'];
  rows?: CssStyles['gridTemplateRows'];
  template?: CssStyles['gridTemplate'];
  areas?: CssStyles['gridTemplateAreas'];
  autoColumns?: CssStyles['gridAutoColumns'];
  autoRows?: CssStyles['gridAutoRows'];
  autoFlow?: CssStyles['gridAutoFlow'];
  placeItems?: CssStyles['placeItems'];
}

export const Grid = forwardRef<HTMLDivElement, Props>(
  ({ columns, rows, template, areas, autoColumns, autoRows, autoFlow, placeItems, css, ...props }, ref) => {
    const styles: CssStyles = {
      gridTemplateColumns: columns,
      gridTemplateRows: rows,
      gridTemplate: template,
      gridTemplateAreas: areas,
      gridAutoColumns: autoColumns,
      gridAutoRows: autoRows,
      gridAutoFlow: autoFlow,
      placeItems,
      ...css,
    };
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
    gap: gaps,
    rowGap: rowGaps,
    columnGap: columnGaps,
  },
  defaultVariants: {
    display: 'grid',
    gap: '0',
  },
});
