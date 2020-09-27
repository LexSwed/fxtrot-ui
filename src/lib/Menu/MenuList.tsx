import React, { useEffect, useMemo, useRef } from 'react';
import Portal from '../Portal';
import { useMenu, useMenuState } from './utils';
import { FocusScope, useFocusManager } from '@react-aria/focus';
import useOnClickOutside, { useAllHandlers, useForkRef, useKeyboardHandles } from '../utils';
import { styled } from '../stitches.config';

const List = styled('ul', {
  maxHeight: '240px',
  overflowY: 'auto',
  bc: '$surfaceStill',
  p: '$1',
  boxShadow: '$xl',
  br: '$md',
  border: '1px solid $gray200',
  outline: 'none',
});

const UlList: React.FC<UlListProps> = (ulProps) => {
  const props = useMenuProps(ulProps);

  return <List {...props} />;
};

const MenuList: React.FC<UlListProps> = (props) => {
  const { isOpen } = useMenuState();

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

function useMenuProps(props: UlListProps): UlListProps {
  const { popoverRef, seed } = useMenu();
  const { close } = useMenuState();
  const focusManager = useFocusManager();

  useOnClickOutside(popoverRef, close);

  const handleKeyDown = useKeyboardHandles(
    useMemo(
      () => ({
        'ArrowDown': () => focusManager.focusNext({ wrap: true }),
        'ArrowUp': () => focusManager.focusPrevious({ wrap: true }),
        'Enter': close,
        ' ': close,
        'Escape': close,
        'Tab': (e) => {
          console.log(e);
          e.preventDefault();
          close();
        },
      }),
      [close, focusManager]
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
