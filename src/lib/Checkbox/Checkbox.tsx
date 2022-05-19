import React, { useMemo } from 'react';
import { CheckIcon } from '@heroicons/react/outline';

import { Flex, FlexVariants } from '../Flex/Flex';
import { FormField } from '../FormField/FormField';
import { Icon, IconBox } from '../Icon/Icon';
import { Label } from '../Label';
import { styled } from '../stitches.config';

interface InputProps extends Omit<React.ComponentProps<typeof Input>, 'onChange' | 'value'>, FlexVariants {
  label?: string;
  secondaryLabel?: string;
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CheckboxProps extends InputProps, FlexVariants {}

export const Checkbox: React.FC<CheckboxProps> = ({
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
      className={className}
      style={style}
      css={css}
      display={display}
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
      {label !== undefined && <Label label={label} secondary={secondaryLabel} disabled={disabled} as="span" />}
    </CheckboxFormField>
  );
};

export const CheckboxFormField = styled('label', FormField, Flex, {});

const CheckboxWrapper = styled('div', {
  size: '$5',
});

export const CheckMark = styled('div', {
  br: '$md',
  bc: 'transparent',
  border: '1px solid $outline',
  size: '$5',
  position: 'relative',
  transition: '0.24s cubic-bezier(0,1,.9,1)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage: 'radial-gradient(circle at center, $colors$primary 50%, transparent 50.2%)',
  backgroundSize: '0 0',
  backgroundPosition: 'center',

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
    borderColor: '$outline',
    [`& ${IconBox}`]: {
      opacity: 0.6,
    },
  },

  [`&:focus + ${CheckMark}`]: {
    borderColor: '$primary',
    boxShadow: '0 0 0 3px $colors$surface6',
  },

  [`&:checked + ${CheckMark}`]: {
    borderColor: '$primary',
    backgroundSize: '200% 200%',
    [`& ${IconBox}`]: {
      color: '$onPrimary',
      opacity: 1,
    },
  },
  [`&:checked:hover + ${CheckMark}`]: {
    borderColor: '$primary',
    [`& ${IconBox}`]: {
      opacity: 1,
    },
  },

  [`&:checked:focus + ${CheckMark}`]: {
    borderColor: '$primarySurface2',
    [`& > ${IconBox}`]: {
      opacity: 1,
    },
  },

  [`&:disabled + ${CheckMark}, &:disabled:checked + ${CheckMark}`]: {
    borderColor: '$disabled',
    [`& > ${IconBox}`]: {
      opacity: 0,
    },
  },

  [`&:disabled:not(:checked) + ${CheckMark}`]: {
    background: '$disabled',
  },

  [`&:disabled:checked + ${CheckMark}`]: {
    background: '$disabled',
    [`& > ${IconBox}`]: {
      color: '$onDisabled',
      opacity: 0.8,
    },
  },
});
