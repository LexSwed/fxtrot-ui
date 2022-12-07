import { forwardRef, ReactNode } from 'react';
import { Text } from '../Text';
import { classed as css } from '@tw-classed/core';
import clsx from 'clsx';
import type { ForwardRefComponent } from '../utils/polymorphic';
import { flex, FlexVariants } from '../flex/flex';

import styles from './form-field.module.css';

export const labelCss = css(flex, 'text-ellipsis', 'whitespace-nowrap');

export interface Props extends FlexVariants {
  label: ReactNode;
  secondary?: ReactNode;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Label = forwardRef(({ label, secondary, disabled, gap = 'xs', size = 'sm', ...props }, ref) => {
  const { as: As = 'label' } = props;
  const textStyle = `label-${size}` as `label-${typeof size}`;
  return (
    <As className={clsx(labelCss({ gap, ...props }), styles.label, props.className)} {...props} ref={ref}>
      <Text
        textStyle={textStyle}
        weight={500}
        className={clsx({ 'text-on-disabled': disabled }, 'shrink-0 cursor-default select-none leading-none')}
      >
        {label}
      </Text>
      {secondary && (
        <Text textStyle={textStyle} tone="light" className="leading-none">
          {secondary}
        </Text>
      )}
    </As>
  );
}) as ForwardRefComponent<'label', Props>;

Label.displayName = 'Label';
