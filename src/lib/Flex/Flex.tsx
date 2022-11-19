/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { Primitive } from '@radix-ui/react-primitive';
import type * as Radix from '@radix-ui/react-primitive';
import { flex, FlexVariants } from './flex.css';
import { sprinkles, Sprinkles } from '../style.css';

type FlexElement = React.ElementRef<typeof Primitive.div>;
type PrimitiveDivProps = Radix.ComponentPropsWithoutRef<typeof Primitive.div>;
type GapCss = { gap: Sprinkles['gap'] };

type FlexProps = PrimitiveDivProps & FlexVariants & GapCss;

export const Flex = React.forwardRef<FlexElement, FlexProps>(
  ({ main, cross, display, gap, wrap, flow, ...props }, ref) => {
    return (
      <Primitive.div
        {...props}
        className={[props.className, flex({ main, cross, display, flow, wrap }), sprinkles({ gap })].join(' ')}
        ref={ref}
      />
    );
  }
);

type RowProps = PrimitiveDivProps & FlexVariants & GapCss;
export const Row = React.forwardRef<FlexElement, RowProps>(({ flow = 'row', ...props }, ref) => {
  return <Flex {...props} ref={ref} flow={flow} />;
});

type ColumnProps = PrimitiveDivProps & FlexVariants & GapCss;
export const Column = React.forwardRef<FlexElement, ColumnProps>(({ flow = 'column', ...props }, ref) => {
  return <Flex {...props} ref={ref} flow={flow} />;
});
