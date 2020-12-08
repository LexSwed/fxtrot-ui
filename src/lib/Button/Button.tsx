import React from 'react';

import { FlexBox, FlexType } from '../Flex';
import { IconBox } from '../Icon/Icon';
import { styled } from '../stitches.config';

const ButtonRoot = styled(FlexBox as FlexType<'button'>, {
  'transition': '0.2s ease-in-out',
  '$outline': 0,
  'fontFamily': '$default',
  'border': '1px solid transparent',
  'br': '$md',
  'cursor': 'default',
  'whiteSpace': 'nowrap',

  [`& > ${IconBox}:first-child:last-child`]: {
    ml: '-$1',
    mr: '-$1',
  },

  ':disabled': {
    color: '$textDisabled',
    borderColor: '$surfaceDisabled',
    bc: '$surfaceDisabled',
  },

  'variants': {
    size: {
      sm: {
        height: '$6',
        lineHeight: '$6',
        fontSize: '$xs',
        fontWeight: 400,
        px: '$2',
      },
      md: {
        height: '$base',
        lineHeight: '$base',
        fontSize: '$sm',
        fontWeight: 500,
        px: '$3',
      },
      lg: {
        height: '$10',
        lineHeight: '$10',
        fontSize: '$md',
        fontWeight: 500,
        px: '$3',
      },
    },
    variant: {
      primary: {
        'bc': '$primaryStill',
        'color': 'white',
        'borderColor': '$primaryStill',
        ':hover': {
          borderColor: '$primaryHover',
          bc: '$primaryHover',
        },
        ':active': {
          borderColor: '$primaryActive',
          bc: '$primaryActive',
        },
      },
      secondary: {
        'bc': '$surfaceStill',
        'color': '$text',
        'borderColor': '$borderStill',
        ':hover': {
          borderColor: '$borderHover',
          bc: '$surfaceHover',
        },
        ':disabled': {
          borderColor: '$surfaceDisabled',
          bc: '$surfaceDisabled',
        },
        ':active, :focus': {
          borderColor: '$borderActive',
          bc: '$surfaceActive',
        },
      },
      outline: {
        'color': '$primaryStill',
        'bc': 'transparent',
        'borderColor': '$primaryStill',
        ':hover': {
          bc: '$primaryLight',
          color: '$primaryHover',
          borderColor: '$primaryHover',
        },
        ':active': {
          bc: '$primaryLightActive',
          color: '$primaryActive',
          borderColor: '$primaryActive',
        },
      },
      flat: {
        'bc': 'transparent',
        'color': '$text',
        ':hover': {
          bc: '$surfaceHover',
        },
        ':active': {
          bc: '$surfaceActive',
        },
        ':disabled': {
          borderColor: 'transparent',
          bc: 'transparent',
        },
      },
      link: {
        'bc': 'transparent',
        'color': '$accent',
        'cursor': 'pointer',
        ':not([aria-disabled="true"]):hover': {
          color: '$hover',
          textDecoration: 'underline',
        },
        ':not([aria-disabled="true"]):active': {
          color: '$active',
          textDecoration: 'underline',
        },
        '&[aria-disabled="true"]': {
          borderColor: 'transparent',
          cursor: 'default',
          color: '$textDisabled',
        },
      },
      transparent: {
        bc: 'transparent',
        borderColor: 'transparent',
        color: '$text',
      },
    },
  },
});

const Button = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof ButtonRoot>>(
  ({ variant = 'primary', size = 'md', space = '$2', type = 'button', css, style, className, ...props }, ref) => {
    return (
      <ButtonRoot
        {...props}
        as="button"
        className={className}
        cross="center"
        css={css}
        display="inline"
        flow="row"
        ref={ref}
        size={size}
        space={space}
        style={style}
        type={type}
        variant={variant}
      />
    );
  }
);

export default Button;
