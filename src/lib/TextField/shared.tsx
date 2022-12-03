import type { VariantProps } from '@stitches/react';
import type { ComponentProps, Ref } from 'react';

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
  'color': '$onBackground',
  'px': '$2',
  'display': 'inline-flex',
  'transition': '0.24s ease-in-out',
  'transitionProperty': 'background-color, background-size, border-color, box-shadow',
  'bc': '$background',
  // for all inputs to have same inner padding
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
        'borderWidth': 1,
        '&:where(:hover)': {
          borderColor: '$onBackground',
        },
        '&:where(:focus)': {
          borderColor: '$onBackground',
          boxShadow: '0 0 0 1px $colors$outline inset',
        },
      },
      underlined: {
        '$$borderColor': '$colors$outline',
        'bc': '$surface',
        'backgroundImage': 'linear-gradient(to top, $$borderColor 2px, transparent 2px)',
        'backgroundSize': '100% calc(100% + 2px)',
        'borderTopLeftRadius': '$base',
        'borderTopRightRadius': '$base',
        '&:where(:hover)': {
          $$borderColor: '$colors$primary',
          bc: '$surface1',
        },
        '&:where(:focus, [aria-expanded="true"])': {
          backgroundSize: '100% calc(100% + 1px)',
          $$borderColor: '$colors$primary',
          bc: '$surface1',
        },
        '&:disabled': {
          backgroundImage: 'none',
          bc: '$disabled',
        },
      },
      flat: {
        'bc': 'transparent',
        'borderColor': 'surface',
        '&:where(:hover, :focus, :active, [data-state="open"])': {
          bc: '$surface1',
        },
        '&:where(:active, [data-state="open"])': {
          borderColor: '$surface3',
        },
        'px': '$3',
        'br': '$base',
        '&:where(:focus)': {
          borderColor: '$surface5',
        },
      },
    },
    fieldSize: {
      sm: {
        px: '$1',
        height: '$6',
        textSize: '$xs',
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
          color: '$error',
        },
      },
    },
  },

  '&[type="date"]::-webkit-calendar-picker-indicator, &[type="search"]::-webkit-search-cancel-button': {
    opacity: 0,
  },

  '&:disabled': {
    color: '$onDisabled',
    borderColor: '$disabled',
    background: 'none',
    br: '$base',
    bc: '$disabled',
  },

  '&[readonly]': {
    cursor: 'default',
    bc: '$surface',
    color: '$onSurfaceVariant',
  },

  'compoundVariants': [
    {
      variant: 'boxed',
      validity: 'invalid',
      css: {
        borderColor: '$danger',
      },
    },
    {
      variant: 'underlined',
      validity: 'invalid',
      css: {
        $$borderColor: '$colors$danger',
      },
    },
    {
      variant: 'underlined',
      validity: 'valid',
      css: {
        '&:not(:focus)': {
          $$borderColor: '$colors$success',
        },
      },
    },
    {
      variant: 'flat',
      validity: 'invalid',
      css: {
        borderColor: '$danger',
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

export interface InputProps extends Omit<ComponentProps<typeof Input>, 'size' | 'fieldSize'> {
  inputRef?: Ref<HTMLInputElement>;
  size?: ComponentProps<typeof Input>['fieldSize'];
  width?: HTMLInputElement['size'];
}

export const InputField = ({ validity, inputRef, children, size, width, ...props }: InputProps) => {
  return (
    <InputWrapper>
      <Input {...props} ref={inputRef} validity={validity} fieldSize={size} size={width} />
      {children}
    </InputWrapper>
  );
};
