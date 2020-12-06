import { StitchesProps } from '@stitches/react';
import React from 'react';
import { FlexBox, FlexType } from '../Flex';
import { styled } from '../stitches.config';
import Text from '../Text';
import { useAllHandlers, useKeyboardHandles } from '../utils';

const Item = styled(FlexBox as FlexType<'li'>, {
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

  'variants': {
    isFocused: {
      true: {
        bc: '$surfaceHover',
      },
    },
  },

  [`& ${Text}`]: {
    fontSize: 'inherit',
    lineHeight: 'inherit',
  },
});

type Props = { disabled?: boolean } & StitchesProps<typeof Item>;

const ListItem = React.forwardRef<HTMLLIElement, Props>(
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
