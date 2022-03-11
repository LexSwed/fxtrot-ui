import React from 'react';

import { flexCss, FlexVariants } from '../Flex/Flex';
import { Icon, IconBox } from '../Icon/Icon';
import { css, styled } from '../stitches.config';

interface Props extends React.ComponentProps<typeof ButtonRoot> {}

export const Button = React.forwardRef<HTMLButtonElement, Props>(({ type = 'button', children, ...props }, ref) => {
  let childCount = React.Children.count(children);
  return (
    <ButtonRoot {...props} aria-disabled={props.disabled} type={type} ref={ref}>
      {childCount < 2
        ? children
        : // align icons with text to button paddings
          React.Children.map(children, (child, i) => {
            if (React.isValidElement(child) && child.type === Icon) {
              const alignment: 'left' | 'right' | null = i === 0 ? 'left' : i === childCount - 1 ? 'right' : null;
              if (alignment) {
                return React.cloneElement(child, { 'data-fxtrot-icon-button-align': alignment });
              }
            }
            return child;
          })}
    </ButtonRoot>
  );
});

Button.displayName = 'Button';

const flexDefaults: FlexVariants = {
  display: 'inline',
  wrap: 'nowrap',
  cross: 'center',
  main: 'center',
  flow: 'row',
  gap: 'sm',
};

export const buttonCss = css(flexCss, {
  'transition': '0.2s ease-in-out',
  'fontFamily': '$default',
  'lineHeight': 1,
  'border': '1px solid transparent',
  'cursor': 'default',
  'whiteSpace': 'nowrap',
  'flexShrink': 0,
  '&[disabled],[aria-disabled="true"]': {
    pointerEvents: 'none',
  },

  '&:disabled': {
    color: '$text--disabled',
    borderColor: '$border-accent--disabled',
    bc: '$shape-accent--disabled',
    cursor: 'default',
  },

  [`& > ${IconBox}[data-fxtrot-icon-button-align="left"]`]: {
    ml: '-4%',
    mr: '4%',
  },
  [`& > ${IconBox}[data-fxtrot-icon-button-align="right"]`]: {
    ml: '4%',
    mr: '-4%',
  },

  'variants': {
    size: {
      xs: {
        height: '$6',
        fontSize: '$xs',
        fontWeight: 400,
        px: '$2',
        br: '$sm',
      },
      sm: {
        height: '$8',
        fontSize: '$sm',
        fontWeight: 400,
        px: '$4',
        br: '$sm',
      },
      md: {
        height: '$base',
        fontSize: '$sm',
        fontWeight: 500,
        px: '$4',
        br: '$base',
      },
      lg: {
        height: '$12',
        fontSize: '$md',
        fontWeight: 500,
        px: '$6',
        br: '$base',
      },
    },
    variant: {
      primary: {
        'bc': '$shape-accent',
        'color': '$text-onAccent',
        'borderColor': '$border-accent',
        'focusRing': '$border-accent--active',
        '&:hover': {
          borderColor: '$border-accent--hover',
          bc: '$shape-accent--hover',
        },
        '&:active': {
          borderColor: '$border-accent--active',
          bc: '$shape-accent--active',
        },
        '&:focus': {
          borderColor: '$border-accent--active',
        },
      },
      secondary: {
        'bc': '$shape',
        'color': '$text',
        'borderColor': '$border',
        'focusRing': '$focusRing',
        '&:hover': {
          bc: '$shape--hover',
          borderColor: '$border--hover',
        },
        '&:active, &[data-state="open"]': {
          bc: '$shape--active',
          borderColor: '$border--active',
        },
        '&:focus': {
          borderColor: '$border--active',
        },
      },
      outline: {
        'color': '$text-accent',
        'bc': '$shape-accent-light',
        'borderColor': '$border-accent',
        'focusRing': '$border-accent--active',
        '&:hover': {
          bc: '$shape-accent-light--hover',
          color: '$text-accent',
          borderColor: '$border-accent--hover',
        },
        '&:active, &[data-state="open"]': {
          bc: '$shape-accent-light--active',
          color: '$text-accent',
          borderColor: '$border-accent--active',
        },
        '&:focus': {
          borderColor: '$border-accent--active',
        },
      },
      flat: {
        'bc': '$shape',
        'color': '$text',
        'focusRing': '$focusRing',
        '&:hover': {
          bc: '$shape--hover',
        },
        '&:focus': {
          bc: '$shape--hover',
          borderColor: '$border--light',
        },
        '&:active, &[data-state="open"]': {
          bc: '$shape--active',
        },
      },
      link: {
        'bc': 'transparent',
        'color': '$text-accent',
        'cursor': 'pointer',
        'focusRing': '$focusRing',
        '&:not([aria-disabled="true"]):hover': {
          textDecoration: 'underline',
        },
        '&[disabled],&[aria-disabled="true"]': {
          bc: 'transparent',
          borderColor: 'transparent',
        },
      },
      transparent: {
        focusRing: '$focusRing',
        bc: 'transparent',
        borderColor: 'transparent',
        color: '$text',
      },
    },
  },
  'defaultVariants': {
    ...flexDefaults,
    variant: 'secondary',
    size: 'md',
  },
});

export const ButtonRoot = styled('button', buttonCss);
