import React from 'react';
import { Primitive } from '@radix-ui/react-primitive';
import type * as Radix from '@radix-ui/react-primitive';
import { flex, FlexVariants } from './flex.css';
import { style } from '@vanilla-extract/css';

type FlexElement = React.ElementRef<typeof Primitive.div>;
type PrimitiveDivProps = Radix.ComponentPropsWithoutRef<typeof Primitive.div>;

type FlexProps = PrimitiveDivProps & FlexVariants;

export const Flex = React.forwardRef<FlexElement, FlexProps>((props, ref) => {
  return <Primitive.div {...props} className={style([props.className, flex(props)])} ref={ref} />;
});

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
