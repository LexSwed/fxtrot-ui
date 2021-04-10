import React from 'react';
import { FocusScope, useFocusManager } from '@react-aria/focus';
import type * as Polymorphic from '@radix-ui/react-polymorphic';

import { ListBoxContext } from '../ListBox/ListBoxContext';

import { styled } from '../stitches.config';
import { useKeyboardHandles } from '../utils/hooks';
import Item from './Item';

const List = styled('ul', {
  m: 0,
  p: 0,
  focusRing: '$focusRing',
});

interface Props extends React.ComponentProps<typeof List> {}

const ListInner: MenuListComponent = React.forwardRef((props, ref) => {
  const { focusNext, focusPrevious } = useFocusManager();

  const handleKeyDown = useKeyboardHandles({
    ArrowDown: () => focusNext(),
    ArrowUp: () => focusPrevious(),
  });

  return <List onKeyDown={handleKeyDown} {...props} ref={ref} />;
});

const MenuList: MenuListComponent = React.forwardRef((props, ref) => {
  return (
    <ListBoxContext ListItem={Item}>
      <FocusScope>
        <ListInner {...props} ref={ref} />
      </FocusScope>
    </ListBoxContext>
  );
});

type MenuListComponent = Polymorphic.ForwardRefComponent<'div', Props>;

export default MenuList;
