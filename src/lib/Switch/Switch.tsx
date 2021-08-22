import React, { useMemo } from 'react';

import { attribute } from '../utils/focus-visible';
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
  'bc': '$borderStill',
  'border': '1px solid $borderStill',
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
    bc: '#fff',
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

  [`&:hover:not(:checked) + ${Toggle}`]: {
    '&::before': {
      boxShadow: '$sm',
    },
  },

  [`&:focus:not(:checked) + ${Toggle}`]: {
    '&::before': {
      boxShadow: '$md',
    },
  },

  [`&:disabled + ${Toggle}`]: {
    'bc': '$primaryLightActive',
    'borderColor': '$primaryLightActive',

    '&::before': {
      bc: '$surfaceStill',
    },
  },

  [`&:focus:not(:checked)[${attribute}] + ${Toggle}`]: {
    '&::before': {
      boxShadow: '0 0 0 1px $borderStill , 0 0 0 3px $borderActive',
    },
  },

  [`&:focus:checked[${attribute}] + ${Toggle}`]: {
    '&::before': {
      borderColor: 'transparent',
      boxShadow: '0 0 0 1px $primaryStill, 0 0 0 3px $borderActive',
    },
  },

  [`&:checked + ${Toggle}`]: {
    'bc': '$primaryStill',
    'borderColor': '$primaryStill',
    '&::before': {
      transform: 'translateX(12px)',
      bc: '$surfaceStill',
    },
  },
  [`&:checked:hover + ${Toggle}, &:checked:focus + ${Toggle}`]: {
    bc: '$primaryHover',
    borderColor: '$primaryHover',
  },
});
