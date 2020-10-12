import { PressHookProps, usePress } from '@react-aria/interactions';
import React, { useRef } from 'react';
import Flex from '../Flex';
import { styled } from '../stitches.config';
import Text from '../Text';
import { useAllHandlers, useForkRef } from '../utils';

const Item = styled(Flex, {
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

type Props = { disabled?: boolean } & React.ComponentProps<typeof Flex> & PressHookProps;

const ListItem = React.forwardRef<HTMLLIElement, Props>(
  (
    {
      flow = 'row',
      cross = 'center',
      space = '$2',
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

    const onMouseEnter = useAllHandlers(props.onMouseEnter, (e) => {
      e.currentTarget.focus({
        preventScroll: true,
      });
    });

    return (
      <Item
        role="option"
        tabIndex={disabled ? undefined : -1}
        {...props}
        flow={flow}
        cross={cross}
        space={space}
        {...pressProps}
        aria-disabled={disabled}
        ref={refs}
        as="li"
        onMouseEnter={onMouseEnter}
      />
    );
  }
);

ListItem.displayName = 'ListItem';

export default ListItem;
