import React from 'react';
import type { VariantProps } from '@stitches/react';

import { styled, css } from '../stitches.config';

export const iconStyles = css({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  height: 'inherit',
  width: '$8',
  outline: 'none',
  br: '$md',
});

export const IconWrapper = styled('div', iconStyles, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
  transition: '0.1s ease-in',
  pr: '$1',
});

export const fieldBox = css({
  'width': '100%',
  'color': '$text',
  'px': '$2',
  'display': 'inline-flex',
  'transition': '0.2s ease-in-out',
  'transitionProperty': 'background, border-color, box-shadow',
  'bc': '$surface',
  'border': '1px solid transparent',

  '&::placeholder': {
    color: '$onSurfaceVariant',
  },
  '&:focus': {
    outline: 'none',
  },

  'variants': {
    variant: {
      boxed: {
        'br': '$base',
        'borderColor': '$outline',
        'focusRing': '$surface5',
        '&:hover': {
          borderColor: '$border--hover',
        },
        '&:focus': {
          borderColor: '$border--active',
          boxShadow: '0 0 0 1px $border--active inset',
        },
      },
      underlined: {
        '$$borderColor': '$colors$outline',
        'bc': '$surface',
        'borderTopLeftRadius': '$base',
        'borderTopRightRadius': '$base',
        'backgroundImage': 'linear-gradient(to top, $$borderColor 2px, $colors$surface 2px)',
        'backgroundSize': '100% calc(100% + 4px)',
        'backgroundPosition': '0 calc(100% + 2px)',
        '&:hover': {
          backgroundPosition: '0 calc(100% + 2px)',
          $$borderColor: '$colors$surfacePrimary6',
        },
        '&:focus, &[aria-expanded="true"]': {
          backgroundPosition: '0 calc(100% + 1px)',
          $$borderColor: '$colors$primary',
        },
        '&:disabled': {
          backgroundImage: 'none',
          bc: '$disabled',
        },
      },
      transparent: {
        'background': 'transparent',
        '&:disabled': {
          br: '$base',
        },
        '&:not(:disabled)': {
          px: 0,
        },
        '&:hover': {
          borderBottomColor: '$border--light',
        },
        '&:focus': {
          borderBottomColor: '$border--active',
        },
      },
      flat: {
        'bc': '$surface',
        'px': '$3',
        'br': '$base',
        'focusRing': '$surface5',
        '&:hover:not(:focus)': {
          bc: '$surface1',
        },
        '&:focus': {
          bc: '$surface',
          borderColor: '$surface5',
          boxShadow: '0 0 0 1px $outline inset',
        },
      },
    },
    fieldSize: {
      sm: {
        height: '$6',
        textSize: '$sm',
      },
      md: {
        height: '$base',
        textSize: '$sm',
      },
      lg: {
        height: '$12',
        textSize: '$lg',
      },
      xl: {
        height: 'auto',
        fontWeight: 600,
        textSize: '$2xl',
        py: '$1',
      },
    },
    validity: {
      valid: {
        [`& ~ ${IconWrapper}`]: {
          color: '$success',
        },
      },
      invalid: {
        [`& ~ ${IconWrapper}`]: {
          color: '$text-danger',
        },
      },
    },
  },

  '&[type="date"]::-webkit-calendar-picker-indicator, &[type="search"]::-webkit-search-cancel-button': {
    opacity: 0,
  },

  '&:disabled': {
    color: '$text--disabled',
    borderColor: '$shape--disabled',
    bc: '$shape--disabled',
  },

  '&[readonly]': {
    cursor: 'default',
    bc: '$surface--hover',
    color: '$onSurfaceVariant',
  },

  'compoundVariants': [
    {
      variant: 'boxed',
      validity: 'invalid',
      css: {
        'borderColor': '$shape-danger',
        '&:hover': {
          borderColor: '$shape-danger--hover',
        },
        '&:focus': {
          borderColor: '$shape-danger--active',
        },
      },
    },
    {
      variant: 'underlined',
      validity: 'invalid',
      css: {
        'backgroundImage': 'linear-gradient(to top, $colors$shape-danger 2px, $colors$surface 2px)',
        '&:hover': {
          backgroundImage: 'linear-gradient(to top, $colors$shape-danger--hover 2px, $colors$surface 2px)',
        },
        '&:focus': {
          backgroundImage: 'linear-gradient(to top, $colors$shape-danger--active 2px, $colors$surface 2px)',
        },
      },
    },
    {
      variant: 'transparent',
      validity: 'invalid',
      css: {
        'borderBottomColor': '$shape-danger',
        '&:hover': {
          borderBottomColor: '$shape-danger--hover',
        },
        '&:focus': {
          borderBottomColor: '$shape-danger--active',
        },
      },
    },
  ],
  'defaultVariants': {
    fieldSize: 'md',
    variant: 'boxed',
  },
});

export type FieldBoxVariants = Omit<VariantProps<typeof fieldBox>, 'fieldSize'> & {
  size?: VariantProps<typeof fieldBox>['fieldSize'];
};

const Input = styled('input', fieldBox, {
  //  throws warnings that inner-spin-button is not standartized
  // '&[type="number"]::-webkit-inner-spin-button, &[type="number"]::-webkit-outer-spin-button': {
  //   '-webkit-appearance': 'inner-spin-button !important',
  //   'appearance': 'inner-spin-button !important',
  // },

  '&[type="date"]': {
    'backgroundImage': 'none',
    '&::-webkit-calendar-picker-indicator': {
      backgroundImage: 'none',
      m: 0,
      p: 0,
      ...iconStyles,
    },
  },

  '&[type="search"]': {
    '&::-webkit-search-cancel-button': {
      appearance: 'none',
      m: 0,
      p: 0,
      ...iconStyles,
    },
    [`&:placeholder-shown + ${IconWrapper}`]: {
      opacity: 0,
    },
  },
});

const InputWrapper = styled('div', {
  position: 'relative',
  width: '100%',
});

export interface InputProps extends Omit<React.ComponentProps<typeof Input>, 'size' | 'fieldSize'> {
  inputRef?: React.Ref<HTMLInputElement>;
  size?: React.ComponentProps<typeof Input>['fieldSize'];
  width?: HTMLInputElement['size'];
}

export const InputField: React.FC<InputProps> = ({ validity, inputRef, children, size, width, ...props }) => {
  return (
    <InputWrapper>
      <Input {...props} ref={inputRef} validity={validity} fieldSize={size} size={width} />
      {children}
    </InputWrapper>
  );
};
