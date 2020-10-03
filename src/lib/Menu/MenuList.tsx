import React, { useCallback, useEffect, useMemo } from 'react';
import Portal from '../Portal';
import { useMenu, useMenuControlState, useMenuOpenState } from './utils';
import { FocusManagerOptions, FocusScope, useFocusManager } from '@react-aria/focus';
import useOnClickOutside, { useAllHandlers, useKeyboardHandles } from '../utils';
import { styled } from '../stitches.config';

const List = styled('ul', {
  maxHeight: '240px',
  overflowY: 'auto',
  bc: '$surfaceStill',
  boxShadow: '$xl',
  br: '$md',
  border: '1px solid $gray200',
  outline: 'none',
  pl: 0,
  paddingInlineStart: 0,
});

const UlList: React.FC<UlListProps> = (ulProps) => {
  const props = useMenuProps(ulProps);

  return <List {...props} />;
};

const MenuList: React.FC<UlListProps> = (props) => {
  const isOpen = useMenuOpenState();

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <FocusScope contain restoreFocus autoFocus>
        <UlList {...props} />
      </FocusScope>
    </Portal>
  );
};

export default MenuList;

const focusOptions: FocusManagerOptions = { wrap: true };

function useMenuProps(props: UlListProps): UlListProps {
  const { popoverRef, seed, onAction } = useMenu();
  const { close, stateRef } = useMenuControlState();
  const focusManager = useFocusManager();

  useOnClickOutside(popoverRef, close);

  const selectItem = useCallback(
    (li: HTMLLIElement) => {
      if (!onAction) return;
      console.log(stateRef.current.items.get(li));
      const action = stateRef.current.items.get(li)?.action;
      action && onAction(action);
    },
    [onAction, stateRef]
  );

  useEffect(() => {
    if (stateRef.current.lastKey === 'ArrowUp') {
      focusManager.focusPrevious(focusOptions);
    } else {
      focusManager.focusNext(focusOptions);
    }
  }, [focusManager, popoverRef, stateRef]);

  const handleKeyDown = useKeyboardHandles(
    useMemo(
      () => ({
        'ArrowDown': () => focusManager.focusNext(focusOptions),
        'ArrowUp': () => focusManager.focusPrevious(focusOptions),
        'Enter': (event) => {
          selectItem(event.target as HTMLLIElement);
          if (event.defaultPrevented) return;
          close();
        },
        ' ': (event) => {
          selectItem(event.target as HTMLLIElement);
          if (event.defaultPrevented) return;
          close();
        },
        'Escape': (event) => {
          if (event.defaultPrevented) return;
          event.preventDefault();
          event.stopPropagation();
          close();
        },
        'Tab': (event) => {
          if (event.defaultPrevented) return;
          close();
        },
      }),
      [close, focusManager, selectItem]
    )
  );

  const onKeyDown = useAllHandlers(props.onKeyDown, handleKeyDown);

  return {
    ...props,
    'role': 'menu',
    'id': seed('menu'),
    'aria-labelledby': seed('button'),
    'ref': popoverRef,
    onKeyDown,
  };
}

type UlListProps = React.ComponentProps<typeof List>;
