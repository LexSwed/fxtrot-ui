import React from 'react';

import Box, { Props as BoxProps } from '../Box/Box';
import { forwardRef } from '../utils';
import { gaps } from '../theme/variants';
import { styled } from '../stitches.config';
import type { StitchesVariants } from '@stitches/react';

const GridWithGaps = styled(Box, {
  variants: {
    gap: gaps,
  },
});

interface Props extends Omit<BoxProps, 'display' | 'gap'> {
  display: 'grid' | 'inline-grid';
  rows: BoxProps['gridTemplateRows'];
  columns: BoxProps['gridTemplateColumns'];
  areas: BoxProps['gridTemplateAreas'];
  template: BoxProps['gridTemplate'];
  gap: StitchesVariants<typeof GridWithGaps>['gap'];
}

const Grid = forwardRef<HTMLDivElement, Props>(
  ({ children, display = 'grid', rows, columns, template, areas, gap = 'none', ...props }, ref) => {
    return (
      <GridWithGaps
        {...props}
        gridTemplate={template}
        gridTemplateAreas={areas}
        gridTemplateRows={rows}
        gridTemplateColumns={columns}
        display={display}
        gap={gap}
        ref={ref}
      >
        {children}
      </GridWithGaps>
    );
  }
);

export default Grid;
