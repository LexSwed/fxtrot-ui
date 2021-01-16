import React from 'react';

import { FlexBox, FlexType } from '../Flex';
import { styled } from '../stitches.config';
import Text from '../Text';
import { forwardRef, PropsOf } from '../utils/types';
import { useAllHandlers, useKeyboardHandles } from '../utils/hooks';

const Item = styled(FlexBox as FlexType<'li'>, {
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
  ':focus:not(:active)': {
    bc: '$flatHover',
  },
  // TODO: deduplicate with focus when fixed in stitches
  ':hover': {
    bc: '$flatHover',
  },
  ':active': {
    bc: '$flatActive',
  },

  'variants': {
    isFocused: {
      true: {
        bc: '$flatHover',
      },
    },
  },

  [`& ${Text}`]: {
    fontSize: 'inherit',
    lineHeight: 'inherit',
  },
});

export interface ListItemProps extends PropsOf<typeof Item> {
  disabled?: boolean;
}

const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ flow = 'row', cross = 'center', space = '$2', disabled, as = 'li', ...props }, ref) => {
    const onKeyDown = useKeyboardHandles({
      'Enter': (e) => e.currentTarget.click?.(),
      ' ': (e) => e.currentTarget.click?.(),
    });
    const handleKeyDown = useAllHandlers(props.onKeyDown, onKeyDown);

    return (
      <Item
        role="option"
        tabIndex={disabled ? undefined : -1}
        as={as}
        flow={flow}
        cross={cross}
        space={space}
        {...props}
        aria-disabled={disabled}
        ref={ref}
        onKeyDown={handleKeyDown}
      />
    );
  }
);

ListItem.displayName = 'ListItem';

export default ListItem;

export function focusOnMouseOver(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
  e.currentTarget.focus({
    preventScroll: true,
  });
}
