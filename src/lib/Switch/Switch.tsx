import { ChangeEvent, ComponentProps, useMemo } from 'react';

import { FormField } from '../FormField/FormField';
import { Label } from '../label-1';
import { styled } from '../stitches.config';
import { Flex, FlexVariants } from '../Flex-copy/Flex';

interface Props extends Omit<ComponentProps<typeof Input>, 'onChange' | 'value'>, FlexVariants {
  label: string;
  secondaryLabel?: string;
  value?: string;
  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
}

export const Switch = ({
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
}: Props) => {
  const handleChange = useMemo(() => {
    if (typeof onChange !== 'function') return;

    return (ev: ChangeEvent<HTMLInputElement>) => onChange(ev.target.checked, ev);
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
      {label && <Label label={label} secondary={secondaryLabel} disabled={disabled} as="span" />}
    </SwitchFormField>
  );
};

const SwitchFormField = styled('label', Flex, FormField, {
  minHeight: '$base',
  my: '-$2',
});

const Toggle = styled('div', {
  '$$size': '$sizes$5',
  'br': '$pill',
  'bc': 'transparent',
  'border': '1px solid $outline',
  'height': '$$size',
  'width': '30px',
  'position': 'relative',
  'transition': '0.24s ease-in-out',
  'boxShadow': '$inner',

  '&::before': {
    content: `''`,
    display: 'block',
    position: 'absolute',
    height: '100%',
    aspectRatio: '1 / 1',
    bc: '$outline',
    br: '$round',
    transformOrigin: 'center',
    transition: '0.24s ease-in-out',
    transform: 'scale(0.7)',
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

  '&:where(:focus)': {
    [`& + ${Toggle}`]: {
      '&::before': {
        bc: '$onSurface',
      },
    },
  },

  '&:where(:checked)': {
    [`& + ${Toggle}`]: {
      'bc': '$primary',
      'borderColor': '$surfacePrimary6',
      '&::before': {
        transform: 'translateX(10px) scale(0.85)',
        bc: '$onPrimary',
      },
    },
  },

  '@hover': {
    '&:where(:hover:not(:checked))': {
      [`& + ${Toggle}`]: {
        'bc': '$surfacePrimary1',
        '&::before': {
          boxShadow: '$xs, $sm',
        },
      },
    },
    [`&:where(:focus) + ${Toggle}`]: {
      '&::before': {
        boxShadow: '0 0 0 4px $colors$surface9',
      },
    },
    [`&:where(:focus:checked) + ${Toggle}`]: {
      '&::before': {
        boxShadow: '0 0 0 6px $colors$surfacePrimary9',
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
