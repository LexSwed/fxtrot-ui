import React from 'react';
import { SelectorIcon } from '@heroicons/react/solid';
import * as RdxSelect from '@radix-ui/react-select';

import { styled, CssStyles } from '../stitches.config';
import type { FlexVariants } from '../Flex/Flex';
import { FormField, FormFieldProps, Hint, HintBox, useFormField } from '../FormField/FormField';
import { Icon } from '../Icon';
import { Label } from '../Label';
import { fieldBox, FieldBoxVariants } from '../TextField/shared';

export interface PickerTriggerProps
  extends FlexVariants,
    FieldBoxVariants,
    Omit<React.ComponentProps<'button'>, 'validity' | 'type' | 'value' | 'size' | 'ref'> {
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
  placeholder = 'Select an option',
  variant = 'boxed',
  children,
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
              <Icon as={SelectorIcon} />
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
  'pr': '$2',
  'minWidth': 0,
  'overflow': 'hidden',
  'whiteSpace': 'nowrap',
  'textOverflow': 'ellipsis',
  'cursor': 'default',

  '& > span:first-child': {
    '&:empty:before': {
      content: 'attr(placeholder)',
      color: '$textSubtle',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  },

  '&:not(:only-child)': {
    pr: '$2',
  },

  [`& > ${Icon}`]: {
    pl: '$1',
    size: '$5',
  },
});
