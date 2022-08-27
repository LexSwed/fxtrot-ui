import React from 'react';
import type { VariantProps } from '@stitches/react';

import { flexCss, FlexVariants } from '../Flex/Flex';
import { css, styled } from '../stitches.config';

interface Props extends VariantProps<typeof buttonCss>, React.ComponentProps<'button'> {}

const ButtonRoot = React.forwardRef<HTMLButtonElement, Props>(({ type = 'button', ...props }, ref) => {
  return <button {...props} aria-disabled={props.disabled} type={type} ref={ref} />;
});

ButtonRoot.displayName = 'Button';

const flexDefaults: FlexVariants = {
  display: 'inline',
  wrap: 'nowrap',
  cross: 'center',
  main: 'center',
  flow: 'row',
  gap: '1',
};

export const buttonCss = css(flexCss, {
  'transition': '0.2s ease-in-out',
  'transitionProperty': 'background-color, box-shadow, color, filter, border-color',
  'fontFamily': '$default',
  'fontWeight': 600,
  'lineHeight': 1,
  'whiteSpace': 'nowrap',
  'cursor': 'default',
  'flexShrink': 0,
  'bc': 'transparent',
  'color': '$onSurface',
  'focusRing': '$surface5',

  '&:is(:disabled,[aria-disabled=true]), &:where(:disabled,[aria-disabled=true]):is(:hover,:focus)': {
    color: '$onDisabled',
    border: '1px solid $disabled',
    bc: '$disabled',
    cursor: 'not-allowed',
  },

  'variants': {
    size: {
      xs: {
        minHeight: '$6',
        fontSize: '$xs',
        fontWeight: 400,
        px: '$2',
        br: '$sm',
      },
      sm: {
        minHeight: '$8',
        fontSize: '$sm',
        fontWeight: 400,
        py: '$1',
        px: '$4',
        br: '$sm',
      },
      md: {
        minHeight: '$base',
        fontSize: '$sm',
        fontWeight: 500,
        py: '$2',
        px: '$4',
        br: '$base',
      },
      lg: {
        minHeight: '$12',
        fontSize: '$md',
        fontWeight: 500,
        px: '$6',
        br: '$base',
      },
    },
    variant: {
      primary: {
        'bc': '$primary',
        'color': '$onPrimary',
        'position': 'relative',
        'focusRing': '$surfacePrimary6',
        '@hover': {
          '&:where(:hover, :focus)': {
            backgroundImage: 'linear-gradient(to top, $colors$surface5, $colors$surface5)',
          },
        },
        '&:where(:active, [data-state="open"])': {
          backgroundImage: 'linear-gradient(to top, $colors$surface6, $colors$surface6)',
        },
      },
      tonal: {
        'bc': '$secondaryContainer',
        'color': '$onSecondaryContainer',
        'focusRing': '$surfacePrimary6',
        '@hover': {
          '&:where(:hover, :focus)': {
            backgroundImage: 'linear-gradient(to top, $colors$surfacePrimary1, $colors$surfacePrimary1)',
          },
        },
        '&:where(:active, [data-state="open"])': {
          backgroundImage: 'linear-gradient(to top, $colors$surfacePrimary2, $colors$surfacePrimary2)',
        },
      },
      outline: {
        'bc': 'transparent',
        'color': '$primary',
        'border': '1px solid $primary',
        'focusRing': '$surfacePrimary6',
        '@hover': {
          '&:where(:hover, :focus)': {
            bc: '$surfacePrimary2',
          },
        },
        '&:where(:active, [data-state="open"])': {
          bc: '$surfacePrimary3',
          borderColor: '$primary',
        },
      },
      flat: {
        'bc': 'transparent',
        'color': '$onSurface',
        'border': '1px solid transparent',
        '@hover': {
          '&:where(:hover, :focus)': {
            bc: '$surface2',
          },
          '&:where(:focus)': {
            borderColor: '$surface2',
          },
        },
        '&:where(:active, [data-state="open"])': {
          bc: '$surface2',
          borderColor: '$surface4',
        },
      },
      link: {
        'bc': 'transparent',
        'color': '$primary',
        'focusRing': '$surfacePrimary6',
        '@hover': {
          '&:where(:hover)': {
            textDecoration: 'underline',
          },
        },
        '&:is(:disabled,[aria-disabled=true])': {
          bc: 'transparent',
          border: 'none',
          textDecoration: 'none',
        },
      },
      transparent: {},
    },
  },
  'defaultVariants': {
    ...flexDefaults,
    variant: 'tonal',
    size: 'md',
  },
});

export const Button = styled(ButtonRoot, buttonCss);
