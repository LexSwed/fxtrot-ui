import React, { useCallback } from 'react';
import { usePress } from '@react-aria/interactions';

import Flex from '../Flex';
import { styled } from '../stitches.config';
import { useAllHandlers, useForkRef } from '../utils';
import { useMenu, useMenuControlState } from './utils';

const Item = styled(Flex, {
  'pr': '$3',
  'pl': '$2',
  'fontSize': '$sm',
  'lineHeight': 1,
  'display': 'flex',
  'alignItems': 'center',
  'height': '$8',
  'cursor': 'pointer',
  'br': '$sm',
  'outline': 'none',
  'color': '$text',
  ':focus, :active': {
    bc: '$surfaceActive',
  },
});

type Props = React.ComponentProps<typeof Item> & { act: string };

const MenuItem = React.forwardRef<HTMLLIElement, Props>(({ act, ...props }, ref) => {
  const { onAction } = useMenu();
  const { close, stateRef } = useMenuControlState();

  const onPress = useAllHandlers(
    props.onPress,
    useCallback(
      (event) => {
        console.log(act);
        act && onAction?.(act);
        if (event.defaultPrevented) return;
        close();
      },
      [act, close, onAction]
    )
  );
  const { pressProps } = usePress({ onPress });
  const elementRef = useCallback(
    (node: HTMLLIElement) => {
      const { items } = stateRef.current;

      items.set(node, { act });
    },
    [act, stateRef]
  );
  const refs = useForkRef(elementRef, ref);

  const onMouseEnter = useAllHandlers(props.onMouseEnter, (e) => {
    e.currentTarget.focus();
  });

  return (
    <Item
      as="li"
      {...props}
      {...pressProps}
      flow="row"
      alignY="center"
      display="inline"
      onMouseEnter={onMouseEnter}
      tabIndex={props.disabled ? undefined : -1}
      role="menuitem"
      ref={refs}
    />
  );
});

MenuItem.displayName = 'MenuItem';

export default MenuItem;
