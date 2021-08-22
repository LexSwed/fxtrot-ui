import React from 'react';

import { styled } from '../stitches.config';
import { Text } from '../Text';
import { useAllHandlers, useKeyboardHandles } from '../utils/hooks';
import { Flex, FlexVariants } from '../Flex/Flex';
import { useListBoxContext } from '../ListBox/ListBoxContext';

export interface ItemProps extends React.ComponentProps<typeof StyledItem> {
  label?: string;
  value?: string;
  disabled?: boolean;
}

export const Item = React.forwardRef<HTMLDivElement, ItemProps>((props, ref) => {
  const { ListItem } = useListBoxContext();
  const onKeyDown = useKeyboardHandles({
    'Enter': (e) => e.currentTarget.click?.(),
    ' ': (e) => e.currentTarget.click?.(),
  });
  const handleKeyDown = useAllHandlers(props.onKeyDown, onKeyDown);

  return (
    <ListItem
      role="option"
      disabled={props.disabled}
      {...props}
      tabIndex={props.disabled ? undefined : -1}
      aria-disabled={props.disabled}
      ref={ref as any}
      onKeyDown={handleKeyDown}
    />
  );
});

Item.displayName = 'ListItem';

export function focusOnMouseOver(e: React.MouseEvent<HTMLElement, MouseEvent>) {
  e.currentTarget.focus({
    preventScroll: true,
  });
}

const flexDefaultProps: FlexVariants = {
  gap: 'sm',
  cross: 'center',
};

export const StyledItem = styled('div', Flex, {
  'px': '$3',
  'fontSize': '$md',
  'lineHeight': 1,
  'height': '$base',
  'br': '$sm',
  'outline': 'none',
  'cursor': 'default',
  'userSelect': 'none',
  'flexShrink': 0,
  'transition': '0.1s ease-in-out',
  'bc': '$flatStill',
  '&:focus:not(:active), &:hover': {
    bc: '$flatHover',
  },
  '&:active': {
    bc: '$flatActive',
  },
  [`& ${Text}`]: {
    fontSize: 'inherit',
    lineHeight: 'inherit',
  },
  '&[data-focused="true"]': {
    bc: '$flatHover',
  },
  '&[data-disabled="true"]': {
    color: '$textDisabled',
  },

  'variants': {
    size: {
      sm: {
        height: '$8',
      },
      md: {
        height: '$base',
      },
      lg: {
        height: '$base',
      },
    },
  },
  'defaultVariants': {
    ...flexDefaultProps,
    size: 'md',
  },
});
