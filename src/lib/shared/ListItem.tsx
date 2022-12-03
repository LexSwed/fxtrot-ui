import type { MouseEvent } from 'react';
import { flexCss, FlexVariants } from '../Flex/Flex';
import { styled } from '../stitches.config';

const flexDefaultProps: FlexVariants = {
  gap: 'sm',
  cross: 'center',
};

export const ListItem = styled('div', flexCss, {
  'width': '100%',
  'px': '$3',
  'font': '$default',
  'fontSize': '$sm',
  'lineHeight': 1,
  'br': '$sm',
  'cursor': 'default',
  'userSelect': 'none',
  'flexShrink': 0,
  'transition': '0.1s ease-in-out',
  'bc': 'transparent',
  'color': '$onBackground',
  '$focusRingInset': '$surface4',
  '@hover': {
    '&:hover,&:focus': {
      bc: '$surface2',
    },
  },
  '&:active, [data-focused="true"], [data-highlighted]': {
    bc: '$surface3',
  },
  '&:disabled,[data-disabled="true"]': {
    color: '$onDisabled',
  },

  'variants': {
    size: {
      sm: {
        minHeight: '$8',
        py: '$1',
      },
      md: {
        minHeight: '$base',
        py: '$2',
      },
      lg: {
        minHeight: '$base',
        py: '$2',
      },
    },
  },
  'defaultVariants': {
    ...flexDefaultProps,
    size: 'md',
  },
});

export function focusOnMouseOver(e: MouseEvent<HTMLElement, MouseEvent>) {
  e.currentTarget.focus({
    preventScroll: true,
  });
}
