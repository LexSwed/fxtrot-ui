import React, { useCallback, useEffect, useMemo } from 'react';
import Portal from '../Portal';
import { useMenu, useMenuControlState, useMenuOpenState } from './utils';
import { FocusManagerOptions, FocusScope, useFocusManager } from '@react-aria/focus';
import { useAllHandlers, useOnClickOutside, useForkRef, useKeyboardHandles, usePopper } from '../utils';
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
  pl: 0,
  paddingInlineStart: 0,
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
  const focusManager = useFocusManager();
  const popperRef = usePopper(
    triggerRef,
    useMemo<Options>(
      () => ({
        placement,
        strategy: 'fixed',
        modifiers: [
          { name: 'offset', options: { offset: [0, offset] } },
          {
            name: 'minWidth',
            enabled: true,
            phase: 'beforeWrite',
            requires: ['computeStyles'],
            fn({ state }) {
              const { width } = state.rects.reference;
              state.styles.popper.minWidth = `${width}px`;
            },
            effect({ state }) {
              const { width } = state.elements.reference.getBoundingClientRect();
              state.elements.popper.style.minWidth = `${width}px`;
            },
          },
        ],
      }),
      [placement, offset]
    )
  );

  useOnClickOutside(popoverRef, close);

  const selectItem = useCallback(
    (li: HTMLLIElement) => {
      if (!onAction) return;
      const action = stateRef.current.items.get(li)?.action;
      if (action) {
        onAction(action);
      } else {
        li.click();
      }
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
