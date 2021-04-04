import React from 'react';

import { styled } from '../stitches.config';
import Text from '../Text';
import { useAllHandlers, useKeyboardHandles } from '../utils/hooks';
import { flexVariants } from '../Flex/Flex';

const Item = styled('li', {
  'px': '$3',
  'fontSize': '$sm',
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

  'variants': {
    ...flexVariants,
    isFocused: {
      true: {
        bc: '$flatHover',
      },
    },
  },
  'defaultVariants': {
    gap: '2',
    display: 'flex',
    flow: 'row',
    cross: 'center',
    wrap: 'nowrap',
  },
});

export interface ListItemProps extends React.ComponentProps<typeof Item> {
  disabled?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(({ disabled, ...props }, ref) => {
  const onKeyDown = useKeyboardHandles({
    'Enter': (e) => e.currentTarget.click?.(),
    ' ': (e) => e.currentTarget.click?.(),
  });
  const handleKeyDown = useAllHandlers(props.onKeyDown, onKeyDown);

  return (
    <Item
      role="option"
      tabIndex={disabled ? undefined : -1}
      {...props}
      aria-disabled={disabled}
      ref={ref}
      onKeyDown={handleKeyDown}
    />
  );
});

ListItem.displayName = 'ListItem';

export default ListItem;

export function focusOnMouseOver(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
  e.currentTarget.focus({
    preventScroll: true,
  });
}
