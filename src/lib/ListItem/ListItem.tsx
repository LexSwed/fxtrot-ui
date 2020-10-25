import React from 'react';
import Flex, { FlexType } from '../Flex';
import { styled } from '../stitches.config';
import Text from '../Text';
import { useAllHandlers, useKeyboardHandles } from '../utils';

const Item = styled(Flex as FlexType<HTMLLIElement>, {
  'px': '$2',
  'fontSize': '$sm',
  'lineHeight': 1,
  'height': '$8',
  'br': '$sm',
  'outline': 'none',
  'color': '$text',
  'cursor': 'default',
  'userSelect': 'none',
  'flexShrink': 0,
  'transition': '0.1s ease-in-out',
  ':focus:not(:active)': {
    bc: '$surfaceHover',
  },
  ':active': {
    bc: '$surfaceActive',
  },

  [`> ${Text}`]: {
    fontSize: 'inherit',
    lineHeight: 'inherit',
  },
});

type Props = { disabled?: boolean } & React.ComponentProps<typeof Item>;

const ListItem = React.forwardRef<HTMLLIElement, Props>(
  ({ flow = 'row', cross = 'center', space = '$2', disabled, ...props }, ref) => {
    const onMouseEnter = useAllHandlers(props.onMouseEnter, (e) => {
      e.currentTarget.focus({
        preventScroll: true,
      });
    });

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
        flow={flow}
        cross={cross}
        space={space}
        aria-disabled={disabled}
        ref={ref}
        as="li"
        onMouseEnter={onMouseEnter}
        onKeyDown={handleKeyDown}
      />
    );
  }
);

ListItem.displayName = 'ListItem';

export default ListItem;
