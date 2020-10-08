import React, { useCallback, useEffect, useMemo } from 'react';
import Portal from '../Portal';
import { useMenu, useMenuControlState, useMenuOpenState } from './utils';
import { FocusManagerOptions, FocusScope, useFocusManager } from '@react-aria/focus';
import { useAllHandlers, useOnClickOutside, useForkRef, useKeyboardHandles, usePopper, sameWidth } from '../utils';
import { styled } from '../stitches.config';
import type { Options } from '@popperjs/core';

const List = styled('ul', {
  maxHeight: '240px',
  overflowY: 'auto',
  bc: '$surfaceStill',
  boxShadow: '$xl',
  br: '$md',
  border: '1px solid $gray200',
  outline: 'none',
  p: '$1',
});

type UlListProps = React.ComponentProps<typeof List>;
type Props = UlListProps & {
  offset?: number;
  placement?: Options['placement'];
};

const UlList: React.FC<Props> = (ulProps) => {
  const props = useMenuProps(ulProps);

  return <List {...props} />;
};

const MenuList: React.FC<Props> = (props) => {
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

function useMenuProps({ placement = 'bottom-start', offset = 8, ...props }: Props): UlListProps {
  const { triggerRef, popoverRef, seed, onAction } = useMenu();
  const { close, stateRef } = useMenuControlState();
  const { focusNext, focusPrevious } = useFocusManager();
  const popperRef = usePopper(
    triggerRef,
    useMemo<Options>(
      () => ({
        placement,
        strategy: 'fixed',
        modifiers: [{ name: 'offset', options: { offset: [0, offset] } }, sameWidth],
      }),
      [placement, offset]
    )
  );

  useOnClickOutside(popoverRef, close);

  const selectItem = useCallback(
    (li: HTMLLIElement) => {
      if (onAction) {
        const action = stateRef.current.items.get(li)?.act;
        if (action) {
          return onAction(action);
        }
      }
      li.click();
    },
    [onAction, stateRef]
  );

  useEffect(() => {
    if (stateRef.current.lastKey === 'ArrowUp') {
      focusPrevious(focusOptions);
    } else {
      focusNext(focusOptions);
    }
  }, [focusNext, focusPrevious, popoverRef, stateRef]);

  const handleKeyDown = useKeyboardHandles(
    useMemo(
      () => ({
        'ArrowDown': () => focusNext(focusOptions),
        'ArrowUp': () => focusPrevious(focusOptions),
        'Enter': (event) => {
          selectItem(event.target as HTMLLIElement);
          close();
        },
        ' ': (event) => {
          selectItem(event.target as HTMLLIElement);
          close();
        },
        'Escape': close,
        'Tab': close,
      }),
      [close, focusNext, focusPrevious, selectItem]
    )
  );

  const onKeyDown = useAllHandlers(props.onKeyDown, handleKeyDown);

  const ref = useForkRef(popperRef, popoverRef);

  return {
    ...props,
    'role': 'menu',
    'id': seed('menu'),
    'aria-labelledby': seed('button'),
    ref,
    onKeyDown,
  };
}
