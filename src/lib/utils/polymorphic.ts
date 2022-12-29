/**
 * React polymorphic types
 * Redistributed as its depricated in the original package
 * @author WorkOS
 * @source https://github.com/radix-ui/primitives
 */

import type * as React from 'react';

type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<C extends React.ElementType, Props = {}> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type PolymorphicComponentPropWithRef<C extends React.ElementType, Props = {}> = PolymorphicComponentProp<C, Props> & {
  ref?: PolymorphicRef<C>;
};

type Merge<P1 = {}, P2 = {}> = Omit<P1, keyof P2> & P2;

type ForwardRefExoticComponent<E, OwnProps> = React.ForwardRefExoticComponent<
  Merge<
    E extends React.ElementType ? React.ComponentPropsWithRef<E> : never,
    OwnProps & {
      as?: E;
    }
  >
>;
interface ForwardRefComponent<
  IntrinsicElementString,
  OwnProps = {}
  /**
   * Extends original type to ensure built in React types play nice
   * with polymorphic components still e.g. `React.ElementRef` etc.
   */
> extends ForwardRefExoticComponent<IntrinsicElementString, OwnProps> {
  /**
   * When `as` prop is passed, use this overload.
   * Merges original own props (without DOM props) and the inferred props
   * from `as` element with the own props taking precendence.
   *
   * We explicitly avoid `React.ElementType` and manually narrow the prop types
   * so that events are typed when using JSX.IntrinsicElements.
   */
  <As = IntrinsicElementString>(
    props: As extends ''
      ? {
          as: keyof JSX.IntrinsicElements;
        }
      : As extends React.ComponentType<infer P>
      ? Merge<
          P,
          OwnProps & {
            as: As;
          }
        >
      : As extends keyof JSX.IntrinsicElements
      ? Merge<
          JSX.IntrinsicElements[As],
          OwnProps & {
            as: As;
          }
        >
      : never
  ): React.ReactElement | null;
}

export type { PolymorphicComponentPropWithRef as PolyProps, PolymorphicRef as PolyRef, ForwardRefComponent };
