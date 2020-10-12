import { styled } from '../stitches.config';
import { createVariant } from '../theme/variants';
import { StylesObject } from '../utils';

export const iconStyles: StylesObject = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  width: '$base',
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
  fontSize: '$sm',
  lineHeight: '$base',
  width: '100%',
  height: '$base',
  px: '$2',
  display: 'inline-flex',
  transition: '0.2s ease-in-out',
  bc: '$surfaceStill',
  outline: 'none',

  variants: {
    variant: {
      boxed: {
        'border': '1px solid $borderStill',
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
        'borderBottom': '1px solid $borderStill',
        'borderRadius': '$md $md 0 0',
        ':hover': {
          borderColor: '$borderHover',
        },
        ':focus, &[aria-expanded="true"]': {
          borderColor: '$primaryActive',
          backgroundImage: 'linear-gradient(0deg, $primaryActive 0%, $primaryActive 2%, $surfaceStill 3%)',
        },
      },
    },
  },
});

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
