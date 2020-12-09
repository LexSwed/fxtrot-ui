import { StitchesProps, StitchesVariants } from '@stitches/react';
import React from 'react';

import { styled } from '../stitches.config';
import { createVariant } from '../theme/variants';
import { StylesObject } from '../utils';

export const iconStyles: StylesObject = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  size: '$base',
};

export const IconWrapper = styled('div', {
  ...iconStyles,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
  transition: '0.1s ease-in',
});

export const InteractiveBox = styled('input', {
  'fontSize': '$sm',
  'lineHeight': '$base',
  'width': '100%',
  'height': '$base',
  'px': '$2',
  'display': 'inline-flex',
  'transition': '0.2s ease-in-out',
  'bc': '$surfaceStill',
  'outline': 'none',
  'border': '1px solid transparent',

  '::placeholder': {
    color: '$borderStill',
  },
  ':disabled': {
    color: '$textDisabled',
    borderColor: '$surfaceDisabled',
    bc: '$surfaceDisabled',
  },

  'variants': {
    variant: {
      boxed: {
        'borderColor': '$borderStill',
        'br': '$md',
        ':hover': {
          borderColor: '$borderHover',
        },
        ':focus': {
          borderColor: '$borderActive',
          boxShadow: '0 0 0 1px $borderActive inset',
        },
      },
      underlined: {
        'borderRadius': '$md $md 0 0',
        'backgroundImage': 'linear-gradient(to top, $primaryStill 0px, $primaryStill 2px, $surfaceStill 2px)',
        'backgroundSize': '100% calc(100% + 4px)',
        'backgroundPosition': '0 calc(100% + 3px)',
        ':hover': {
          backgroundPosition: '0 calc(100% + 2px)',
          backgroundImage: 'linear-gradient(to top, $primaryHover 0px, $primaryHover 2px, $surfaceStill 2px)',
        },
        ':focus, &[aria-expanded="true"]': {
          backgroundPosition: '0 calc(100% + 1px)',
          backgroundImage: 'linear-gradient(to top, $primaryActive 0px, $primaryActive 2px, $surfaceStill 2px)',
        },
        ':disabled': {
          backgroundImage: 'none',
          bc: '$surfaceDisabled',
        },
      },
    },
  },

  '&[readonly]': {
    cursor: 'default',
    bc: '$surfaceHover',
  },
});

export type InteractiveBoxType<T = HTMLInputElement> = T extends HTMLElement
  ? React.ForwardRefExoticComponent<
      React.DetailedHTMLProps<React.HTMLAttributes<T>, T> &
        StitchesVariants<typeof InteractiveBox> & { as: keyof JSX.IntrinsicElements | React.ElementType }
    >
  : React.ForwardRefExoticComponent<
      T & StitchesVariants<typeof InteractiveBox> & { as: keyof JSX.IntrinsicElements | React.ElementType }
    >;

export const validityVariant = createVariant({
  valid: {
    [`& ${IconWrapper}`]: {
      color: '$lightGreen600',
    },
  },
  invalid: {
    [`& ${IconWrapper}`]: {
      color: '$red600',
    },
    [`${InteractiveBox}`]: {
      'borderColor': '$red600',
      ':hover': {
        borderColor: '$red700',
      },
      ':focus': {
        borderColor: '$borderDefault',
      },
    },
  },
});

const Input = styled(InteractiveBox, {
  '::placeholder': {
    color: '$borderStill',
  },
  ':disabled': {
    color: '$textDisabled',
    borderColor: '$surfaceDisabled',
    bc: '$surfaceDisabled',
  },

  '&[type="number"]::-webkit-inner-spin-button, &[type="number"]::-webkit-outer-spin-button': {
    '-webkit-appearance': 'inner-spin-button !important',
    'appearance': 'inner-spin-button !important',
  },

  '&[type="date"]': {
    'backgroundImage': 'none',
    '::-webkit-calendar-picker-indicator': {
      backgroundImage: 'none',
      m: 0,
      p: 0,
      ...iconStyles,
    },
  },

  '&[type="search"]': {
    '::-webkit-search-cancel-button': {
      appearance: 'none',
      m: 0,
      p: 0,
      ...iconStyles,
    },
    [`&:placeholder-shown + ${IconWrapper}`]: {
      opacity: 0,
    },
  },

  'variants': {
    hasIcon: {
      true: {
        pr: '$8',
      },
    },
  },
});

const InputWrapper = styled('div', {
  position: 'relative',
  width: '100%',

  variants: {
    validity: validityVariant,
  },
});

interface InputFieldProps extends StitchesVariants<typeof InputWrapper>, StitchesProps<typeof Input> {
  inputRef?: React.Ref<HTMLInputElement>;
}

export const InputField: React.FC<InputFieldProps> = ({ validity, inputRef, ...props }) => (
  <InputWrapper validity={validity}>
    <Input {...props} ref={inputRef} />
  </InputWrapper>
);
