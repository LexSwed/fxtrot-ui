import React, { useMemo } from 'react';
import { HiCheck } from 'react-icons/hi';
import Flex from '../Flex';
import { attribute } from '../FocusRing/focus-visible';
import Icon from '../Icon';
import Label from '../Label';
import { styled } from '../stitches.config';

const Wrapper = styled(Flex, {
  position: 'relative',
});

const CheckMark = styled('div', {
  br: '$md',
  bc: 'transparent',
  border: '1px solid $borderStill',
  size: '$4',
  position: 'relative',
  transition: '0.24s ease-in-out',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  [`& > ${Icon}`]: {
    transition: '0.14s ease-in-out',
    size: '$3',
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
  transition: '0.24s ease-in-out',

  [`:hover:not(:checked) + ${CheckMark}`]: {
    borderColor: '$borderHover',
    [`& > ${Icon}`]: {
      opacity: 0.7,
    },
  },

  [`:checked + ${CheckMark}`]: {
    'borderColor': '$primaryStill',
    'bc': '$primaryStill',
    [`& > ${Icon}`]: {
      opacity: 1,
    },
    '& svg': {
      fill: '#fff',
    },
  },
  [`:checked:hover + ${CheckMark}`]: {
    'borderColor': '$primaryHover',
    'bc': '$primaryHover',
    '& svg': {
      fill: '#fff',
    },
  },

  [`:focus[${attribute}] + ${CheckMark}`]: {
    borderColor: '$borderActive',
    boxShadow: '0 0 0 1px $borderActive',
  },

  [`:focus[${attribute}]:checked + ${CheckMark}`]: {
    borderColor: '$primaryStill',
    $boxOutline: '$primaryStill',
  },

  [`:disabled + ${CheckMark}`]: {
    borderColor: '$surfaceDisabled',
    bc: '$surfaceDisabled',
    [`& > ${Icon}`]: {
      opacity: 0,
    },
  },

  [`:disabled:checked + ${CheckMark}`]: {
    [`& > ${Icon}`]: {
      opacity: 1,
    },
    '& svg': {
      fill: '$textDisabled',
    },
  },
});

type WrapperProps = React.ComponentProps<typeof Wrapper>;
type InputProps = React.ComponentProps<typeof Input>;

type Props = InputProps & WrapperProps & { label?: string; secondaryLabel?: string };

const Checkbox: React.FC<Props> = ({
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

    return (ev: React.ChangeEvent<HTMLInputElement>) => ev.target.checked;
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
        disabled={disabled}
        onChange={handleChange}
      />
      <CheckMark>
        <Icon as={HiCheck} />
      </CheckMark>
      {label && <Label label={label} secondary={secondaryLabel} disabled={disabled} as="span" />}
    </Wrapper>
  );
};

export default Checkbox;
