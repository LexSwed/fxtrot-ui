import React from 'react';
import { FocusScope, useFocusManager } from '@react-aria/focus';
import type * as Polymorphic from '@radix-ui/react-polymorphic';

import { ListBoxContext } from '../ListBox/ListBoxContext';

import { styled } from '../stitches.config';
import { useKeyboardHandles } from '../utils/hooks';
import Item from './Item';
import { StyledItem } from '../Item/Item';

const List = styled('ul', {
  m: 0,
  p: 0,
  focusRing: '$focusRing',

  [`& ${StyledItem} + ${StyledItem}:not(:first-child):not(:last-child)`]: {
    br: 0,
  },
  [`& ${StyledItem}:first-child:not(:only-child)`]: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  [`& ${StyledItem}:last-child:not(:only-child)`]: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
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

MenuList.displayName = 'MenuList';

type MenuListComponent = Polymorphic.ForwardRefComponent<'div', Props>;

export default MenuList;
