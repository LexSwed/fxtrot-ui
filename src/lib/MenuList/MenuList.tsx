import React, { useCallback, useRef } from 'react';
import { getFocusableTreeWalker } from '@react-aria/focus';
import Item from './Item';
import { useAllHandlers, useKeyboardHandles } from '../utils';
import { styled } from '../stitches.config';
import Section from './Section';

const List = styled('ul', {
  m: 0,
  p: 0,
  $outline: -1,
});

type Props = React.ComponentProps<typeof List> & {
  label?: string;
};

const MenuList: React.FC<Props> & { Item: typeof Item } = ({ label, ...props }) => {
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

  const list = <List {...props} onKeyDown={handleHeyDown} ref={ref} />;

  if (label) {
    return <Section label={label}>{list}</Section>;
  }
  return list;
};

MenuList.Item = Item;

export default MenuList;
