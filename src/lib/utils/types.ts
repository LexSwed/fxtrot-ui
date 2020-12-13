import type { TCss, TCssProperties } from '@stitches/core';
import type { BreakPointsKeys, TCssProp, TCssWithBreakpoints } from '@stitches/react';
import * as React from 'react';

import type { css } from '../stitches.config';

export interface Config extends GetConfig<typeof css> {}
export type CssWithBreakpoints = TCssWithBreakpoints<Config>;
export type StylesObject = TCssProperties<Config>;
export type StylesWithVariants = TCssProperties<Config>;
export type CssProperties = TCssProperties<Config> &
  {
    [key in BreakPointsKeys<Config>]?: TCssProp<Config>;
  };

type GetConfig<S> = S extends TCss<infer T> ? T : never;

type As = React.ElementType;

type PropsOf<T extends As> = React.ComponentProps<T>;

export interface ComponentWithAs<T extends As, P> {
  <TT extends As>(
    props: { as?: TT } & (PropsOf<T> extends { transition?: any } ? Omit<P, 'transition'> : P) &
      Omit<PropsOf<TT>, keyof PropsOf<T>>
  ): JSX.Element;
  displayName?: string;
}

export function forwardRef<P, T extends As>(
  component: (
    props: React.PropsWithChildren<P> & Omit<PropsOf<T>, keyof P | 'color' | 'ref'> & { as?: As },
    ref: React.Ref<any>
  ) => React.ReactElement | null
) {
  return (React.forwardRef(component as any) as unknown) as ComponentWithAs<T, P>;
}
