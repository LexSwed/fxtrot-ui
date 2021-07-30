import React, { useMemo } from 'react';
import { CheckIcon } from '@heroicons/react/outline';

import Box from '../Box';
import type { FlexVariants } from '../Flex/Flex';
import { attribute } from '../FocusRing/focus-visible';
import { FormField } from '../FormField/FormField';
import Icon, { IconBox } from '../Icon/Icon';
import Label from '../Label';
import { styled } from '../stitches.config';

interface InputProps extends Omit<React.ComponentProps<typeof Input>, 'onChange' | 'value'>, FlexVariants {
  label?: string;
  secondaryLabel?: string;
  value?: string;
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
}

// internal props
type Props = FlexVariants & InputProps;
// external props
export interface CheckboxProps extends Props {}

export const Checkbox: React.FC<Props> = ({
  checked,
  onChange,
  css,
  style,
  className,
  flow = 'row',
  label,
  secondaryLabel,
  gap = 'sm',
  display,
  cross,
  disabled,
  id,
  ...props
}) => {
  const handleChange = useMemo(() => {
    if (typeof onChange !== 'function') return;

    return (ev: React.ChangeEvent<HTMLInputElement>) => onChange(ev.target.checked, ev);
  }, [onChange]);

  return (
    <CheckboxFormField
      as={'label' as any}
      display={display}
      className={className}
      style={style}
      css={css}
      gap={gap}
      flow={flow}
      cross={cross}
    >
      <CheckboxWrapper>
        <Input
          aria-checked={checked}
          checked={checked}
          {...props}
          type="checkbox"
          disabled={disabled}
          onChange={handleChange}
        />
        <CheckMark>
          <Icon as={CheckIcon} />
        </CheckMark>
      </CheckboxWrapper>
      {label && <Label label={label} secondary={secondaryLabel} disabled={disabled} as="span" />}
    </CheckboxFormField>
  );
};

export const CheckboxFormField = styled(FormField, {});

const CheckboxWrapper = styled(Box, {
  position: 'relative',
});

export const CheckMark = styled('div', {
  br: '$md',
  bc: 'transparent',
  border: '1px solid $borderStill',
  size: '$5',
  position: 'relative',
  transition: '0.14s ease-in-out',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  [`& > ${IconBox}`]: {
    transition: 'opacity 0.14s ease-in-out',
    opacity: 0,
  },
});

const Input = styled('input', {
  position: 'absolute',
  display: 'block',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: '100%',
  height: '100%',
  bc: 'transparent',
  p: 0,
  m: 0,
  opacity: 0,
  zIndex: 1,
  cursor: 'default',
  transitionProperty: 'background-color, borderColor, color',
  transitionDuration: '0.24s',
  transitionTimingFunction: 'ease-in-out',

  [`&:hover + ${CheckMark}`]: {
    borderColor: '$borderHover',
    [`& ${IconBox}`]: {
      opacity: 0.7,
    },
  },

  [`&:checked + ${CheckMark}`]: {
    borderColor: '$primaryStill',
    bc: '$primaryStill',
    color: '#fff',
    [`& ${IconBox}`]: {
      opacity: 1,
    },
  },
  [`&:checked:hover + ${CheckMark}`]: {
    borderColor: '$primaryHover',
    bc: '$primaryHover',
    [`& ${IconBox}`]: {
      opacity: 1,
    },
  },

  [`&:focus[${attribute}] + ${CheckMark}`]: {
    borderColor: '$primaryActive',
    boxShadow: '0 0 0 3px $colors$focusRing',
  },

  [`&:focus[${attribute}]:checked + ${CheckMark}`]: {
    borderColor: '$primaryStill',
    $boxOutline: '$primaryStill',
    [`& > ${IconBox}`]: {
      opacity: 1,
    },
  },

  [`&:disabled + ${CheckMark}, &:disabled:checked + ${CheckMark}`]: {
    borderColor: '$surfaceDisabled',
    bc: '$surfaceDisabled',
    [`& > ${IconBox}`]: {
      opacity: 0,
    },
  },

  [`&:disabled:checked + ${CheckMark}`]: {
    color: '$textDisabled',
    [`& > ${IconBox}`]: {
      opacity: 1,
    },
  },
});
