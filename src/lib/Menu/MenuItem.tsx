import React, { useCallback } from 'react';
import Inline from '../Inline';
import { styled } from '../stitches.config';
import { useAllHandlers, useForkRef } from '../utils';
import { useMenu, useMenuControlState } from './utils';

const Item = styled(Inline, {
  'pr': '$3',
  'pl': '$2',
  'borderLeft': '2px solid transparent',
  'fontSize': '$sm',
  'lineHeight': 1,
  'display': 'flex',
  'height': '$8',
  'cursor': 'pointer',
  'br': '$sm',
  'outline': 'none',

  ':hover': {
    bc: '$surfaceHover',
  },
  ':focus': {
    bc: '$surfaceActive',
    borderLeftColor: '$primaryStill',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  ':active': {
    bc: '$surfaceActive',
    borderLeftColor: '$primaryStill',
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
    <Item {...props} onClick={onClick} as="li" tabIndex={props.disabled ? undefined : -1} role="menuitem" ref={refs} />
  );
});

MenuItem.displayName = 'MenuItem';

export default MenuItem;
