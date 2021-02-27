// import type { ComponentProps, ElementType, FC, ForwardedRef, ForwardRefRenderFunction, ReactElement } from 'react';
// import React from 'react';
// import type { Merge } from 'type-fest';

import type { InternalCSS,  StitchesCss } from '@stitches/react';
import type { stitchesConfig } from '../stitches.config';

export type CssStyles = StitchesCss<typeof stitchesConfig>;
export type StyleSheet = InternalCSS<typeof stitchesConfig>;

// type As = ElementType;

// export type PropsOf<T extends ElementType> = Omit<
//   T extends IStyledComponent<any, any, any> ? StitchesProps<T> : ComponentProps<T>,
//   'as'
// > & {
//   as?: As;
// };

// export function forwardRef<T extends HTMLElement, P>(
//   component: ForwardRefRenderFunction<T, P>
// ): ForwardRefComponent<T, P> {
//   return React.forwardRef(component as any) as any;
// }

// export interface ForwardRefComponent<T extends HTMLElement, P> extends FC<P> {
//   <TT extends As>(props: { as?: TT } & Merge<PropsOf<TT>, P>, ref: ForwardedRef<T>): ReactElement | null;
//   displayName?: string;
// }
