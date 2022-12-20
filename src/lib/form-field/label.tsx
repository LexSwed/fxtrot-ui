import { ElementType, forwardRef, ReactElement, ReactNode } from 'react';
import { classed as css } from '@tw-classed/core';
import { clsx } from 'clsx';
import { Text } from '../text';
import type { PolyProps, PolyRef } from '../utils/polymorphic';
import { flexCss, FlexVariants } from '../flex/flex';

import styles from './form-field.module.css';

export type LabelProps<C extends ElementType> = PolyProps<
  C,
  FlexVariants & {
    label: ReactNode;
    secondary?: ReactNode;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
  }
>;
export type LabelComponent = <C extends ElementType = 'label'>(props: LabelProps<C>) => ReactElement | null;

export const Label: LabelComponent = forwardRef(
  <C extends ElementType = 'label'>(
    {
      as,
      label,
      secondary,
      disabled,
      display = 'inline',
      gap = 'xs',
      size = 'sm',
      main,
      cross,
      flow,
      wrap,
      ...props
    }: LabelProps<C>,
    ref: PolyRef<C>
  ) => {
    const Component = as || 'label';
    const textStyle = `label-${size}` as `label-${typeof size}`;
    return (
      <Component
        aria-disabled={disabled}
        className={clsx(labelCss({ gap, display, main, cross, flow, wrap }), styles.label, props.className)}
        {...props}
        ref={ref}
      >
        <Text textStyle={textStyle}>{label}</Text>
        {secondary && (
          <Text textStyle={textStyle} tone="light">
            {secondary}
          </Text>
        )}
      </Component>
    );
  }
);

const labelCss = css(styles.label, flexCss);
