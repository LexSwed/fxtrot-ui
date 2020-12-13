import { getFocusableTreeWalker } from '@react-aria/focus';
import type { StitchesProps } from '@stitches/react';
import React, { useCallback, useRef } from 'react';

import { styled } from '../stitches.config';
import { useAllHandlers, useKeyboardHandles } from '../utils';
import Item from './Item';

const List = styled('ul', {
  m: 0,
  p: 0,
  $outline: -1,
});

interface Props extends StitchesProps<typeof List> {}

const MenuList: React.FC<Props> & { Item: typeof Item } = (props) => {
  const ref = useRef<HTMLUListElement>(null);

  const focusElement = useCallback((fn: (walker: TreeWalker) => Node | null) => {
    let focusedElement = document.activeElement as HTMLElement;
    if (!ref.current?.contains(focusedElement)) {
      return;
    }

    // Create a DOM tree walker that matches all tabbable elements
    let walker = getFocusableTreeWalker(document.body);

    // Find the next tabbable element after the currently focused element
    walker.currentNode = focusedElement;
    let nextElement = fn(walker) as HTMLElement;
    if (ref.current.contains(nextElement)) {
      nextElement.focus();
    }
  }, []);

  const handleNavigation = useKeyboardHandles({
    ArrowUp: () => focusElement((walker) => walker.previousNode()),
    ArrowDown: () => focusElement((walker) => walker.nextNode()),
  });
  const handleHeyDown = useAllHandlers(props.onKeyDown, handleNavigation);

  return <List {...props} onKeyDown={handleHeyDown} ref={ref} />;
};

MenuList.Item = Item;

export default MenuList;
