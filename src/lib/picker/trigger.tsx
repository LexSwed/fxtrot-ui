import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import * as RdxSelect from '@radix-ui/react-select';
import { classed as css } from '@tw-classed/core';
import { clsx } from 'clsx';
import type { ComponentProps } from 'react';

import { Column, type FlexVariants } from '../flex/flex';
import { FormFieldWrapper, Hint, useFormField, fieldBoxCss, type FieldVariants } from '../form-field/form-field';
import { Icon } from '../icon';
import { Label } from '../form-field';

import styles from './picker.module.css';

export interface PickerTriggerProps
  extends FlexVariants,
    FieldVariants,
    Omit<ComponentProps<'button'>, 'validity' | 'type' | 'value' | 'size' | 'ref'> {
  id?: string;
  placeholder?: string;
  label?: string;
  secondaryLabel?: string;
  hint?: string;
  disabled?: boolean;
}

export const PickerTrigger = ({
  label,
  secondaryLabel,
  hint,
  main,
  cross,
  flow,
  display,
  style,
  className,
  id,
  validity,
  disabled,
  placeholder,
  variant = 'boxed',
  size = 'md',
  gap,
  ...props
}: PickerTriggerProps) => {
  const ariaProps = useFormField({ id, hint, label });
  return (
    <FormFieldWrapper
      main={main}
      cross={cross}
      flow={flow}
      display={display}
      gap={gap}
      style={style}
      className={className}
    >
      {label !== undefined && (
        <Label label={label} secondary={secondaryLabel} id={ariaProps['aria-labelledby']} disabled={disabled} />
      )}
      <Column gap="xs">
        <RdxSelect.Trigger asChild>
          <button
            {...ariaProps}
            {...props}
            className={clsx(triggerButtonCss({ size }), fieldBoxCss({ variant, size, validity }))}
          >
            <RdxSelect.Value placeholder={placeholder} />
            <RdxSelect.Icon asChild>
              <Icon as={ChevronUpDownIcon} className={styles['trigger-icon']} />
            </RdxSelect.Icon>
          </button>
        </RdxSelect.Trigger>
        {hint && (
          <Hint id={ariaProps['aria-describedby']} validity={validity}>
            {hint}
          </Hint>
        )}
      </Column>
    </FormFieldWrapper>
  );
};

const triggerButtonCss = css(styles.trigger, {
  variants: {
    size: {
      sm: styles['size--sm'],
      md: styles['size--md'],
      lg: styles['size--lg'],
      xl: styles['size--xl'],
    },
  },
});
