import React, { useCallback } from 'react';
import Stack from '../Stack';
import { styled } from '../stitches.config';
import { useAllHandlers, useForkRef } from '../utils';
import { useMenu, useMenuControlState } from './utils';

const Item = styled(Stack, {
  'pr': '$3',
  'pl': '$2',
  'borderLeft': '2px solid transparent',
  'fontSize': '$sm',
  'lineHeight': 1,
  'display': 'flex',
  'alignItems': 'center',
  'height': '$8',
  'cursor': 'pointer',
  'br': '$sm',
  'outline': 'none',
  'color': '$text',

  ':hover': {
    bc: '$surfaceHover',
  },
  ':focus, :active': {
    bc: '$surfaceActive',
    borderLeftColor: '$accent',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
});

type Props = React.ComponentProps<typeof Item> & { action: string };

const MenuItem = React.forwardRef<HTMLLIElement, Props>(({ action, ...props }, ref) => {
  const { onAction } = useMenu();
  const { close, stateRef } = useMenuControlState();
  const elementRef = useCallback(
    (node: HTMLLIElement) => {
      const { items } = stateRef.current;

      items.set(node, { action });
    },
    [action, stateRef]
  );
  const refs = useForkRef(elementRef, ref);

  const onClick = useAllHandlers(
    props.onClick,
    useCallback(
      (event) => {
        action && onAction?.(action);
        if (event.defaultPrevented) return;
        close();
      },
      [action, close, onAction]
    )
  );

  return (
    <Item
      as="li"
      {...props}
      flow="row"
      alignY="center"
      display="inline"
      onClick={onClick}
      tabIndex={props.disabled ? undefined : -1}
      role="menuitem"
      ref={refs}
    />
  );
});

MenuItem.displayName = 'MenuItem';

export default MenuItem;
