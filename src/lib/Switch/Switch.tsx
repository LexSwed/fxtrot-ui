import React, { useMemo } from 'react';

import Box from '../Box';
import { attribute } from '../FocusRing/focus-visible';
import { FormField } from '../FormField/FormField';
import Label from '../Label';
import { styled } from '../stitches.config';

const SwitchWrapper = styled(Box, {
  position: 'relative',
});

const Toggle = styled('div', {
  'br': '$pill',
  'bc': '$borderStill',
  'border': '1px solid $borderStill',
  'height': '$4',
  'width': '$6',
  'position': 'relative',
  'transition': '0.24s ease-in-out',
  'boxShadow': '$inner',

  '::before': {
    content: `''`,
    display: 'block',
    position: 'absolute',
    size: '$3',
    bc: '#fff',
    br: '$round',
    transition: '0.24s ease-in-out',
    top: '1px',
    transform: 'translateX(1px)',
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
    '::before': {
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
    '::before': {
      boxShadow: '0 0 0 1px $borderStill , 0 0 0 3px $borderActive',
    },
  },

  [`&:focus:checked[${attribute}] + ${Toggle}`]: {
    '::before': {
      borderColor: 'transparent',
      boxShadow: '0 0 0 1px $primaryStill, 0 0 0 3px $borderActive',
    },
  },

  [`&:checked + ${Toggle}`]: {
    'bc': '$primaryStill',
    'borderColor': '$primaryStill',
    '::before': {
      transform: 'translateX(9px)',
      bc: '$surfaceStill',
    },
  },
  [`&:checked:hover + ${Toggle}, &:checked:focus + ${Toggle}`]: {
    bc: '$primaryHover',
    borderColor: '$primaryHover',
  },
});

type WrapperProps = React.ComponentProps<typeof FormField>;
type InputProps = React.ComponentProps<typeof Input>;

type Props = Omit<InputProps, 'onChange'> &
  WrapperProps & {
    label?: string;
    secondaryLabel?: string;
    onChange: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  };

const Switch: React.FC<Props> = ({
  checked,
  onChange,
  css,
  style,
  className,
  flow = 'row',
  label,
  secondaryLabel,
  space = 'sm',
  display = 'inline',
  cross,
  disabled,
  ...props
}) => {
  const handleChange = useMemo(() => {
    if (typeof onChange !== 'function') return;

    return (ev: React.ChangeEvent<HTMLInputElement>) => onChange(ev.target.checked, ev);
  }, [onChange]);

  return (
    <FormField
      as={'label' as any}
      display={display}
      className={className}
      style={style}
      css={css}
      space={space}
      flow={flow}
      cross={cross}
    >
      <SwitchWrapper>
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
      </SwitchWrapper>
      {label && <Label label={label} secondary={secondaryLabel} disabled={disabled} as={'span' as any} />}
    </FormField>
  );
};

export default Switch;
