import { PressHookProps, usePress } from '@react-aria/interactions';
import React, { useRef } from 'react';
import Flex from '../Flex';
import { styled } from '../stitches.config';
import { useForkRef } from '../utils';

const Item = styled(Flex, {
  'pr': '$3',
  'pl': '$2',
  'fontSize': '$sm',
  'lineHeight': 1,
  'display': 'flex',
  'alignItems': 'center',
  'height': '$8',
  'br': '$sm',
  'outline': 'none',
  'color': '$text',
  'cursor': 'default',
  'userSelect': 'none',
  'flexShrink': 0,
  ':focus, :active': {
    bc: '$surfaceActive',
  },
});

type Props = { disabled?: boolean } & React.ComponentProps<typeof Flex> & PressHookProps;

const ListItem = React.forwardRef<HTMLLIElement, Props>(
  (
    {
      flow = 'row',
      display = 'inline',
      cross = 'center',
      disabled,
      onPress,
      onPressStart,
      onPressEnd,
      onPressChange,
      onPressUp,
      ...props
    },
    propRef
  ) => {
    const innerRef = useRef<HTMLLIElement>(null);
    const { pressProps } = usePress({
      isDisabled: disabled,
      ref: innerRef as any,
      onPress,
      onPressStart,
      onPressEnd,
      onPressChange,
      onPressUp,
    });
    const refs = useForkRef(innerRef, propRef);

    return (
      <Item
        aria-selected="false"
        role="option"
        tabIndex={disabled ? undefined : -1}
        {...props}
        {...pressProps}
        flow={flow}
        display={display}
        cross={cross}
        aria-disabled={disabled}
        ref={refs}
        as="li"
      />
    );
  }
);

ListItem.displayName = 'ListItem';

export default ListItem;
