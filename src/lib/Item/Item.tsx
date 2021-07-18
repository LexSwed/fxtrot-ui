import React from 'react';
import type * as Polymorphic from '@radix-ui/react-polymorphic';

import { styled } from '../stitches.config';
import Text from '../Text';
import { useAllHandlers, useKeyboardHandles } from '../utils/hooks';
import { flexVariants } from '../Flex/Flex';
import { useListBoxContext } from '../ListBox/ListBoxContext';

export const StyledItem = styled('div', {
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
    ...flexVariants,
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
    gap: '2',
    display: 'flex',
    flow: 'row',
    cross: 'center',
    wrap: 'nowrap',
    size: 'md',
  },
});

export interface ItemProps extends React.ComponentProps<typeof StyledItem> {
  label?: string;
  value?: string;
  disabled?: boolean;
}

const Item = React.forwardRef((props: React.ComponentProps<ItemComponent>, ref) => {
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
}) as ItemComponent;

Item.displayName = 'ListItem';

export type ItemComponent = Polymorphic.ForwardRefComponent<'div', ItemProps>;

export default Item;

export function focusOnMouseOver(e: React.MouseEvent<HTMLElement, MouseEvent>) {
  e.currentTarget.focus({
    preventScroll: true,
  });
}
