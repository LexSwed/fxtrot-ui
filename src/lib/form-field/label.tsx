import * as React from 'react';
import { classed as css } from '@tw-classed/core';
import { clsx } from 'clsx';
import { Text } from '../text';
import type { ForwardRefComponent } from '../utils/polymorphic';
import { flexCss, type FlexVariants } from '../flex/flex';

import styles from './form-field.module.css';

export interface LabelProps extends FlexVariants {
  label: React.ReactNode;
  secondary?: React.ReactNode;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Label = React.forwardRef(
  (
    {
      as: Component = 'label',
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
    },
    ref
  ) => {
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
) as ForwardRefComponent<'label', LabelProps>;

const labelCss = css(styles.label, flexCss);
