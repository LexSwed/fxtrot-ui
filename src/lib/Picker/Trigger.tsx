import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import * as RdxSelect from '@radix-ui/react-select';

import { styled, CssStyles } from '../stitches.config';
import type { FlexVariants } from '../Flex-copy/Flex';
import { FormField, FormFieldProps, Hint, HintBox, useFormField } from '../FormField/FormField';
import { Icon } from '../icon';
import { Label } from '../label';
import { fieldBox, FieldBoxVariants } from '../TextField/shared';
import type { ComponentProps } from 'react';

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
  validity?: FormFieldProps['validity'];
  css?: CssStyles;
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
  css,
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
    <FormField
      main={main}
      cross={cross}
      flow={flow}
      display={display}
      gap={gap}
      css={css}
      style={style}
      className={className}
      hasHint={!!hint}
    >
      {label !== undefined && (
        <Label label={label} secondary={secondaryLabel} id={ariaProps['aria-labelledby']} disabled={disabled} />
      )}
      <HintBox>
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
      </HintBox>
    </FormField>
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
