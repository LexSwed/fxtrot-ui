import React from 'react';
import type { PropertyValue } from '@stitches/react';

import { createScale } from '../utils/variants';
import { styled } from '../stitches.config';
import { mainAxisAlignment, crossAxisAlignment } from '../Flex/Flex';

interface Props extends React.ComponentProps<typeof GridStyled> {
  columns?: PropertyValue<'gridTemplateColumns'>;
  rows?: PropertyValue<'gridTemplateRows'>;
  template?: PropertyValue<'gridTemplate'>;
  areas?: PropertyValue<'gridTemplateAreas'>;
  autoColumns?: PropertyValue<'gridAutoColumns'>;
  autoRows?: PropertyValue<'gridAutoRows'>;
  autoFlow?: PropertyValue<'gridAutoFlow'>;
}

export const Grid = React.forwardRef<HTMLDivElement, Props>(
  ({ columns, rows, template, areas, autoColumns, autoRows, autoFlow, css, ...props }, ref) => {
    return (
      <GridStyled
        css={
          {
            gridTemplateColumns: columns,
            gridTemplateRows: rows,
            gridTemplate: template,
            gridTemplateAreas: areas,
            gridAutoColumns: autoColumns,
            gridAutoRows: autoRows,
            gridAutoFlow: autoFlow,
            ...css,
          } as any
        }
        {...props}
        ref={ref}
      />
    );
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
  },
});
