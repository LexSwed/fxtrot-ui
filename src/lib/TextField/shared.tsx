import { styled } from '../stitches.config';
import { StylesObject } from '../types/helpers';
import { createVariant } from '../theme/variants';

export const boxStyles: StylesObject = {};

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
    svg: {
      fill: '$lightGreen600',
    },
  },
  invalid: {
    svg: {
      stroke: '$red600',
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
