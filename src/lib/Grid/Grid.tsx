/* eslint-disable react/jsx-pascal-case */
import React from 'react';

import { Primitive } from '@radix-ui/react-primitive';
import type * as Radix from '@radix-ui/react-primitive';
import { grid, GridVariants } from './grid.css';

type GridElement = React.ElementRef<typeof Primitive.div>;
type PrimitiveDivProps = Radix.ComponentPropsWithoutRef<typeof Primitive.div>;

type GridProps = PrimitiveDivProps & GridVariants;

export const Grid = React.forwardRef<GridElement, GridProps>(
  ({ main, cross, gap, rowGap, columnGap, display, ...props }, ref) => {
    return (
      <Primitive.div
        {...props}
        className={[props.className, grid({ main, cross, gap, rowGap, columnGap, display })].join(' ')}
        ref={ref}
      />
    );
  }
);

Grid.displayName = 'Grid';
