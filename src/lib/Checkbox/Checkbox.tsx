import React, { useMemo } from 'react';
import { HiCheck } from 'react-icons/hi';

import Box from '../Box';
import type { FlexVariants } from '../Flex/Flex';
import { attribute } from '../FocusRing/focus-visible';
import { FormField, FormFieldProps } from '../FormField/FormField';
import Icon, { IconBox } from '../Icon/Icon';
import Label from '../Label';
import { styled } from '../stitches.config';

const CheckboxWrapper = styled(Box, {
  position: 'relative',
});

const CheckMark = styled('div', {
  br: '$md',
  bc: 'transparent',
  border: '1px solid $borderStill',
  size: '$5',
  position: 'relative',
  transition: '0.24s ease-in-out',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  [`& > ${IconBox}`]: {
    transition: '0.14s ease-in-out',
    size: '$4',
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
    [`& ${IconBox}`]: {
      opacity: 0.7,
    },
  },

  [`:checked + ${CheckMark}`]: {
    borderColor: '$primaryStill',
    bc: '$primaryStill',
    [`& ${IconBox}`]: {
      opacity: 1,
      fill: '#fff',
    },
  },
  [`:checked:hover + ${CheckMark}`]: {
    borderColor: '$primaryHover',
    bc: '$primaryHover',
    [`& ${IconBox}`]: {
      opacity: 1,
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
    [`& > ${IconBox}`]: {
      opacity: 1,
    },
  },

  [`:disabled + ${CheckMark}`]: {
    borderColor: '$surfaceDisabled',
    bc: '$surfaceDisabled',
    [`& > ${IconBox}`]: {
      opacity: 0,
    },
  },

  [`:disabled:checked + ${CheckMark}`]: {
    [`& > ${IconBox}`]: {
      opacity: 1,
      fill: '$textDisabled',
    },
  },
});

interface InputProps extends React.ComponentProps<typeof Input>, FlexVariants {
  label?: string;
  secondaryLabel?: string;
}

const Checkbox: React.FC<FormFieldProps & InputProps> = ({
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

    return (ev: React.ChangeEvent<HTMLInputElement>) => ev.target.checked;
  }, [onChange]);

  return (
    <FormField
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
          <Icon as={HiCheck} />
        </CheckMark>
      </CheckboxWrapper>
      {label && <Label label={label} secondary={secondaryLabel} disabled={disabled} as="span" />}
    </FormField>
  );
};

export default Checkbox;
