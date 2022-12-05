import { ChangeEvent, ComponentProps, FC, useMemo } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

import type { FlexVariants } from '../Flex-copy/Flex';
import { FormField, useFormField } from '../FormField/FormField';
import { Icon } from '../Icon';
import { Label } from '../Label';
import { styled } from '../stitches.config';

interface InputProps extends Omit<ComponentProps<typeof Input>, 'onChange' | 'value' | 'size'>, FlexVariants {
  label?: string;
  secondaryLabel?: string;
  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
}

export interface CheckboxProps extends InputProps, FlexVariants {
  size?: ComponentProps<typeof CheckboxWrapper>['size'];
}

export const Checkbox: FC<CheckboxProps> = ({
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
  size,
  ...props
}) => {
  const ariaProps = useFormField({ id });

  const handleChange = useMemo(() => {
    if (typeof onChange !== 'function') return;

    return (ev: ChangeEvent<HTMLInputElement>) => onChange(ev.target.checked, ev);
  }, [onChange]);

  return (
    <FormField className={className} style={style} css={css} display={display} gap={gap} flow={flow} cross={cross}>
      <CheckboxWrapper size={size}>
        <Input
          aria-checked={checked}
          checked={checked}
          {...props}
          {...ariaProps}
          type="checkbox"
          disabled={disabled}
          onChange={handleChange}
        />
        <CheckMark>
          <Icon as={CheckIcon} size="sm" />
        </CheckMark>
      </CheckboxWrapper>
      {label !== undefined && (
        <Label label={label} secondary={secondaryLabel} disabled={disabled} htmlFor={ariaProps.id} />
      )}
    </FormField>
  );
};

const CheckMark = styled('div', {
  bc: 'transparent',
  border: '1px solid $outline',
  size: '$5',
  position: 'relative',
  transition: '0.24s ease-in-out',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage: 'radial-gradient(circle at center, $colors$primary 50%, transparent 50.2%)',
  backgroundSize: '0 0',
  backgroundPosition: 'center',

  [`& > ${Icon}`]: {
    transition: '0.14s ease-in-out',
    opacity: 0,
  },
});

const CheckboxWrapper = styled('div', {
  variants: {
    size: {
      sm: {
        [`& ${CheckMark}`]: {
          size: '$5',
        },
      },
      md: {
        py: '$1',

        [`& ${CheckMark}`]: {
          size: '$6',
        },
      },
      lg: {
        py: '$2',

        [`& ${CheckMark}`]: {
          size: '$8',

          [`& > ${Icon}`]: {
            size: '$5',
          },
        },
      },
    },
  },
  defaultVariants: {
    size: 'sm',
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
  'transitionProperty': 'background-color, borderColor, color',
  'transitionDuration': '0.24s',
  'transitionTimingFunction': 'ease-in-out',

  '@hover': {
    [`&:where(:hover,:focus) + ${CheckMark}`]: {
      [`& ${Icon}`]: {
        opacity: 0.5,
      },
    },
    [`&:where(:checked:hover) + ${CheckMark}`]: {
      borderColor: '$primary',
      [`& ${Icon}`]: {
        opacity: 1,
      },
    },

    [`&:where(:checked:focus) + ${CheckMark}`]: {
      borderColor: '$surfacePrimary2',
      [`& > ${Icon}`]: {
        opacity: 1,
      },
    },
  },

  [`&:where(:focus):not(:disabled) + ${CheckMark}`]: {
    borderColor: '$primary',
    boxShadow: `0 0 0 4px $colors$surfacePrimary6`,
  },

  [`&:where(:checked) + ${CheckMark}`]: {
    borderColor: '$primary',
    backgroundSize: '200% 200%',
    [`& ${Icon}`]: {
      color: '$onPrimary',
      opacity: 1,
    },
  },

  [`&:where(:disabled,:disabled:checked) + ${CheckMark}`]: {
    borderColor: '$disabled',
    [`& > ${Icon}`]: {
      opacity: 0,
    },
  },

  [`&:where(:disabled:not(:checked)) + ${CheckMark}`]: {
    background: '$disabled',
  },

  [`&:where(:disabled:checked) + ${CheckMark}`]: {
    background: '$disabled',
    [`& > ${Icon}`]: {
      color: '$onDisabled',
      opacity: 0.9,
    },
  },

  'variants': {
    variant: {
      single: {
        [`&  + ${CheckMark}`]: {
          br: '$md',
        },
      },
      group: {
        [`&  + ${CheckMark}`]: {
          br: '$round',
        },
      },
    },
  },

  'defaultVariants': {
    variant: 'single',
  },
});
