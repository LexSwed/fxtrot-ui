import { ElementType, forwardRef, ReactNode } from 'react';
import { classed as css } from '@tw-classed/core';
import { clsx } from 'clsx';
import { Text } from '../text';
import type { PolyProps, PolyRef } from '../utils/polymorphic';
import { flexCss, FlexVariants } from '../flex/flex';

import styles from './form-field.module.css';

interface Props extends FlexVariants {
  label: ReactNode;
  secondary?: ReactNode;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Label = forwardRef(function Label<C extends ElementType = 'label'>(
  { as, label, secondary, disabled, display = 'inline', gap = 'xs', size = 'sm', ...props }: PolyProps<C, Props>,
  ref: PolyRef<C>
) {
  const Component = as || 'label';
  const textStyle = `label-${size}` as `label-${typeof size}`;
  return (
    <Component
      aria-disabled={disabled}
      className={clsx(labelCss({ gap, display, ...props }), styles.label, props.className)}
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
});

const labelCss = css(styles.label, flexCss);

Label.displayName = 'Label';
