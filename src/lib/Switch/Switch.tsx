import React, { useMemo } from 'react';

import Flex from '../Flex';
import { attribute } from '../FocusRing/focus-visible';
import Label from '../Label';
import { styled } from '../stitches.config';

const Wrapper = styled(Flex, {
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

type WrapperProps = React.ComponentProps<typeof Wrapper>;
type InputProps = React.ComponentProps<typeof Input>;

type Props = InputProps & WrapperProps & { label?: string; secondaryLabel?: string };

const Switch: React.FC<Props> = ({
  checked,
  onChange,
  css,
  style,
  className,
  flow = 'row',
  label,
  secondaryLabel,
  space = 'xs',
  display = 'inline',
  cross = 'center',
  disabled,
  ...props
}) => {
  const handleChange = useMemo(() => {
    if (typeof onChange !== 'function') return;

    return (ev: React.ChangeEvent<HTMLInputElement>) => onChange(ev.target.checked);
  }, [onChange]);

  return (
    <Wrapper
      as="label"
      display={display}
      className={className}
      style={style}
      css={css}
      space={space}
      flow={flow}
      cross={cross}
    >
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
      {label && <Label label={label} secondary={secondaryLabel} disabled={disabled} as="span" />}
    </Wrapper>
  );
};

export default Switch;
