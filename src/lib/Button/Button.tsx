import React from 'react';

import { FlexBox, FlexType } from '../Flex';
import Icon from '../Icon/Icon';
import { styled } from '../stitches.config';
import { forwardRef, PropsOf } from '../utils';

const ButtonRoot = styled(FlexBox as FlexType<'button'>, {
  'transition': '0.2s ease-in-out',
  '$outline': 0,
  'fontFamily': '$default',
  'border': '1px solid transparent',
  'br': '$md',
  'cursor': 'default',
  'whiteSpace': 'nowrap',

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
        'bc': '$flatStill',
        'color': '$text',
        ':hover': {
          bc: '$flatHover',
        },
        ':active': {
          bc: '$flatActive',
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
    isIconButton: {
      true: {
        position: 'relative',
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
  },
});

ButtonRoot.compoundVariant(
  {
    isIconButton: true,
    size: 'sm',
  },
  {
    width: '$6',
  }
);
ButtonRoot.compoundVariant(
  {
    isIconButton: true,
    size: 'md',
  },
  {
    width: '$base',
  }
);
ButtonRoot.compoundVariant(
  {
    isIconButton: true,
    size: 'lg',
  },
  {
    width: '$10',
  }
);

interface Props extends Omit<PropsOf<typeof ButtonRoot>, 'isIconButton'> {}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = 'primary', size = 'md', space = '$2', type = 'button', css, style, className, ...props }, ref) => {
    const isIconButton = React.Children.toArray(props.children).every(
      (child) => React.isValidElement(child) && child.type === Icon
    );

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
        isIconButton={isIconButton}
      />
    );
  }
);

export default Button;
