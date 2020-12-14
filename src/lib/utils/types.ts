import type { TCss, TCssProperties } from '@stitches/core';
import type { BreakPointsKeys, IStyledComponent, StitchesProps, TCssProp, TCssWithBreakpoints } from '@stitches/react';
import type { ComponentProps, ElementType, FC, ForwardedRef, ForwardRefRenderFunction, ReactElement } from 'react';
import React from 'react';
import type { Merge } from 'type-fest';

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

type As = ElementType;

export type PropsOf<T extends ElementType> = Omit<
  T extends IStyledComponent<any, any, any> ? StitchesProps<T> : ComponentProps<T>,
  'as'
> & {
  as?: As;
};

export function forwardRef<T extends HTMLElement, P>(
  component: ForwardRefRenderFunction<T, P>
): ForwardRefComponent<T, P> {
  return React.forwardRef(component as any) as any;
}

export interface ForwardRefComponent<T extends HTMLElement, P> extends FC<P> {
  <TT extends As>(props: { as?: TT } & Merge<PropsOf<TT>, P>, ref: ForwardedRef<T>): ReactElement | null;
  displayName?: string;
}
