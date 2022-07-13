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
  'bc': 'transparent',
  'border': '1px solid $outline',
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
    bc: '$outline',
    br: '$round',
    transition: '0.24s ease-in-out',
    top: '2px',
    transform: 'translateX(2px) scale(0.9)',
  },
});

const Input = styled('input', {
  'position': 'absolute',
  'display': 'block',
  'top': 0,
  'right': 0,
  'bottom': 0,
  'left': 0,
  'width': '100%',
  'height': '100%',
  'bc': 'transparent',
  'p': 0,
  'm': 0,
  'opacity': 0,
  'zIndex': 1,
  'cursor': 'default',
  'transition': '0.24s ease-in-out',

  '&:where(:checked)': {
    [`& + ${Toggle}`]: {
      'bc': '$primary',
      'borderColor': '$surfacePrimary6',
      '&::before': {
        transform: 'translateX(12px) scale(1.05)',
        bc: '$onPrimary',
      },
    },
  },

  '@hover': {
    [`&:focus + ${Toggle}`]: {
      '&::before': {
        boxShadow: '0 0 0 6px $colors$surfacePrimary6',
      },
    },
    '&:where(:hover):not(:checked)': {
      [`& + ${Toggle}`]: {
        'bc': '$surfacePrimary1',
        '&::before': {
          boxShadow: '$xs, $sm',
        },
      },
    },
  },

  '&:disabled': {
    [`& + ${Toggle}`]: {
      'bc': '$disabled',
      'borderColor': '$disabled',
      '&::before': {
        opacity: 0.6,
      },
    },

    [`&:checked + ${Toggle}`]: {
      'bc': '$surfacePrimary6',
      'borderColor': '$disabled',
      '&::before': {
        bc: '$onDisabled',
      },
    },
  },
});
