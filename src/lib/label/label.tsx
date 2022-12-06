import { forwardRef, ReactNode } from 'react';
import { Text } from '../Text';
import { classed as css } from '@tw-classed/core';
import clsx from 'clsx';
import type { ForwardRefComponent } from '../utils/polymorphic';
import { flex, FlexVariants } from '../flex/flex';

export const labelCss = css(flex, 'text-ellipsis', 'whitespace-nowrap');

export interface Props extends FlexVariants {
  label: ReactNode;
  secondary?: ReactNode;
  disabled?: boolean;
}

export const Label = forwardRef(({ label, secondary, disabled, ...props }, ref) => {
  const { as: As = 'label' } = props;
  return (
    <As className={clsx(labelCss(props), props.className)} {...props} ref={ref}>
      <Text
        textStyle="label-sm"
        weight={500}
        className={clsx({ 'text-on-disabled': disabled }, 'shrink-0 cursor-default select-none leading-none')}
      >
        {label}
      </Text>
      {secondary && (
        <Text textStyle="label-sm" tone="light" className="leading-none">
          {secondary}
        </Text>
      )}
    </As>
  );
}) as ForwardRefComponent<'label', Props>;

Label.displayName = 'Label';
