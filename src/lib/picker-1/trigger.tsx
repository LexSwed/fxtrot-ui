import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import * as RdxSelect from '@radix-ui/react-select';
import type { ComponentProps } from 'react';

import { styled } from '../stitches.config';
import { Column, FlexVariants } from '../flex/flex';
import { FormFieldWrapper, Hint, useFormField } from '../form-field/form-field';
import { Icon } from '../icon';
import { Label } from '../form-field';
import { fieldBox, FieldBoxVariants } from '../TextField/shared';

import styles from './picker.module.css';

export interface PickerTriggerProps
  extends FlexVariants,
    FieldBoxVariants,
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
  gap,
  style,
  className,
  id,
  validity,
  disabled,
  placeholder,
  variant = 'boxed',
  size,
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
          <TriggerButton validity={validity} variant={variant} {...ariaProps} {...props} fieldSize={size}>
            <RdxSelect.Value placeholder={placeholder} />
            <RdxSelect.Icon asChild>
              <Icon as={ChevronUpDownIcon} />
            </RdxSelect.Icon>
          </TriggerButton>
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

const TriggerButton = styled('button', fieldBox, {
  'position': 'relative',
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'space-between',
  'fontSize': '$sm',

  '&[data-placeholder]': {
    color: '$onSurfaceVariant',
  },

  '& > span:first-of-type': {
    minWidth: 0,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  [`& > ${Icon}`]: {
    pl: '$1',
  },

  'variants': {
    fieldSize: {
      sm: {
        [`& > ${Icon}`]: {
          size: '$4',
          strokeWidth: 1.5,
        },
      },
      md: {
        [`& > ${Icon}`]: {
          size: '$6',
          strokeWidth: 1.5,
        },
      },
      lg: {
        [`& > ${Icon}`]: {
          size: '$6',
          strokeWidth: 1.8,
        },
      },
      xl: {
        [`& > ${Icon}`]: {
          size: '$8',
          strokeWidth: 1.8,
        },
      },
    },
  },
});
