import React, { useMemo } from 'react';

import { FormField } from '../FormField/FormField';
import { Label } from '../Label';
import { styled } from '../stitches.config';
import { Flex, FlexVariants } from '../Flex/Flex';

interface Props extends Omit<React.ComponentProps<typeof Input>, 'onChange'>, FlexVariants {
  label?: string;
  secondaryLabel?: string;
  onChange: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Switch: React.FC<Props> = ({
  checked,
  onChange,
  css,
  style,
  className,
  flow = 'row',
  label,
  secondaryLabel,
  gap = 'sm',
  display = 'inline',
  cross = 'center',
  disabled,
  ...props
}) => {
  const handleChange = useMemo(() => {
    if (typeof onChange !== 'function') return;

    return (ev: React.ChangeEvent<HTMLInputElement>) => onChange(ev.target.checked, ev);
  }, [onChange]);

  return (
    <SwitchFormField
      display={display}
      className={className}
      style={style}
      css={css}
      gap={gap}
      flow={flow}
      cross={cross}
    >
      <div>
        <Input
          aria-checked={checked}
          checked={checked}
          {...props}
          type="checkbox"
          role="switch"
          disabled={disabled}
          onChange={handleChange}
        />
        <Toggle />
      </div>
      {label && <Label label={label} secondary={secondaryLabel} disabled={disabled} />}
    </SwitchFormField>
  );
};

const SwitchFormField = styled('label', Flex, FormField, {});

const Toggle = styled('div', {
  'br': '$pill',
  'bc': '$shape--active',
  'border': '1px solid $shape--active',
  'height': '$5',
  'width': '30px',
  'position': 'relative',
  'transition': '0.24s ease-in-out',
  'boxShadow': '$inner',

  '&::before': {
    content: `''`,
    display: 'block',
    position: 'absolute',
    size: '14px',
    bc: '$surface',
    br: '$round',
    transition: '0.24s ease-in-out',
    top: '2px',
    transform: 'translateX(2px)',
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
  transition: '0.24s ease-in-out',

  [`&:hover + ${Toggle}`]: {
    'bc': '$shape-accent-light--active',
    'borderColor': '$border--hover',
    '&::before': {
      boxShadow: '$sm, $sm',
    },
  },

  [`&:focus:not(:checked) + ${Toggle}`]: {
    '&::before': {
      boxShadow: '0 0 0 1px $colors$border, 0 0 0 3px $colors$border--active',
    },
  },

  [`&:focus:checked + ${Toggle}`]: {
    '&::before': {
      boxShadow: '0 0 0 1px $colors$surface, 0 0 0 3px $colors$border--active',
    },
  },

  [`&:checked + ${Toggle}`]: {
    'bc': '$shape-accent--active',
    'borderColor': '$border-accent--active',
    '&::before': {
      transform: 'translateX(12px)',
      bc: '$surface',
    },
  },
  [`&:checked:hover + ${Toggle}, &:checked:focus + ${Toggle}`]: {
    bc: '$shape-accent--hover',
    borderColor: '$border-accent--hover',
  },

  [`&:disabled:not(:checked) + ${Toggle}`]: {
    'bc': '$shape--disabled',
    'borderColor': '$border--disabled',
    '&::before': {
      bc: '$text--disabled',
      opacity: 0.5,
    },
  },

  [`&:disabled:checked + ${Toggle}`]: {
    'bc': '$shape-accent-light--active',
    'borderColor': '$border--disabled',

    '&::before': {
      bc: '$text--disabled',
      opacity: 0.5,
    },
  },
});
