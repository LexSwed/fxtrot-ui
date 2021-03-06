import type { StitchesVariants } from '@stitches/react';
import React from 'react';

import { styled } from '../stitches.config';
import type { CssStyles } from '../utils/types';

export const iconStyles: CssStyles = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  height: 'inherit',
  width: '$8',
  outline: 'none',
  br: '$md',
};

export const IconWrapper = styled('div', {
  ...iconStyles,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
  transition: '0.1s ease-in',
  pr: '$1',
});

export const InteractiveBox = styled('input', {
  'fontSize': '$md',
  'lineHeight': '$md',
  'height': '$base',
  'width': '100%',
  'px': '$2',
  'display': 'inline-flex',
  'transition': '0.2s ease-in-out',
  'transitionProperty': 'background, border-color, box-shadow',
  'bc': '$surfaceStill',
  'border': '1px solid transparent',

  // has icon
  '&:not(:only-child)': {
    paddingRight: '$8',
  },

  '&::placeholder': {
    color: '$textSubtle',
  },
  '&:disabled:not(.plus1):not(.plus2)': {
    color: '$textDisabled',
    borderColor: '$surfaceDisabled',
    bc: '$surfaceDisabled',
  },
  '&:focus': {
    outline: 'none',
  },

  'variants': {
    variant: {
      boxed: {
        'borderColor': '$borderStill',
        'br': '$md',
        'focusRing': '$borderLight',
        '&:hover': {
          borderColor: '$borderHover',
        },
        '&:focus': {
          borderColor: '$borderActive',
          boxShadow: '0 0 0 1px $borderActive inset',
        },
      },
      underlined: {
        '$$color': '$colors$borderStill',
        'borderRadius': '$md $md 0 0',
        'backgroundImage': 'linear-gradient(to top, $$color 2px, $colors$surfaceStill 2px)',
        'backgroundSize': '100% 1px',
        'backgroundPosition': '0 100%',
        '&:hover': {
          $$color: '$colors$primaryHover',
        },
        '&:focus, &[aria-expanded="true"]': {
          $$color: '$colors$primaryActive',
          backgroundSize: '100% 2px',
        },
        '&:disabled': {
          backgroundImage: 'none',
          bc: '$surfaceDisabled',
        },
      },
      transparent: {
        'background': 'transparent',
        'br': '$md',
        '&:not(:disabled)': {
          px: 0,
        },
        '&:hover': {
          borderBottomColor: '$borderLight',
        },
        '&:focus': {
          borderBottomColor: '$borderStill',
        },
      },
      flat: {
        'bc': '$flatStill',
        'color': '$text',
        'px': '$3',
        'br': '$md',
        '&:hover:not(:focus)': {
          bc: '$flatHover',
        },
        '&:focus': {
          borderColor: '$borderActive',
          boxShadow: '0 0 0 1px $borderActive inset',
        },
      },
    },
    fieldSize: {
      sm: {
        height: '$8',
      },
      md: {
        height: '$base',
      },
      lg: {
        height: '$12',
        fontSize: '$lg',
      },
      xl: {
        height: 'auto',
        fontWeight: '600',
        fontSize: '$2xl',
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
          color: '$danger',
        },
      },
    },
  },

  '&[readonly]': {
    cursor: 'default',
    bc: '$surfaceHover',
    color: '$textLight',
  },

  'compoundVariants': [
    {
      variant: 'boxed',
      validity: 'invalid',
      css: {
        'borderColor': '$danger',
        '&:hover': {
          borderColor: '$red700',
        },
        '&:focus': {
          borderColor: '$borderDefault',
        },
      },
    },
    {
      variant: 'underlined',
      validity: 'invalid',
      css: {
        'backgroundImage': 'linear-gradient(to top, $colors$danger 2px, $colors$surfaceStill 2px)',
        '&:hover': {
          backgroundImage: 'linear-gradient(to top, $colors$red700 2px, $colors$surfaceStill 2px)',
        },
        '&:focus': {
          backgroundImage: 'linear-gradient(to top, $colors$red700 2px, $colors$surfaceStill 2px)',
        },
      },
    },
    {
      variant: 'transparent',
      validity: 'invalid',
      css: {
        'borderBottomColor': '$danger',
        '&:hover': {
          borderBottomColor: '$red700',
        },
        '&:focus': {
          borderBottomColor: '$borderDefault',
        },
      },
    },
  ],
});

export type InteractiveBoxVariants = Omit<StitchesVariants<typeof InteractiveBox>, 'fieldSize'> & {
  size: StitchesVariants<typeof InteractiveBox>['fieldSize'];
};

const Input = styled(InteractiveBox, {
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

export const InputField: React.FC<InputProps> = ({ validity, inputRef, children, size, width, ...props }) => (
  <InputWrapper>
    <Input {...props} ref={inputRef} validity={validity} fieldSize={size} size={width} />
    {children}
  </InputWrapper>
);
