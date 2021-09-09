import React from 'react';
import { FocusScope, useFocusManager } from '@react-aria/focus';

import { ListBoxContext } from '../ListBox/ListBoxContext';

import { styled } from '../stitches.config';
import { useKeyboardHandles } from '../utils/hooks';
import Item from './Item';
import { StyledItem } from '../Item/Item';

interface Props extends React.ComponentProps<typeof ListStyled> {}

export const MenuList = React.forwardRef<HTMLUListElement, Props>((props, ref) => {
  return (
    <ListBoxContext ListItem={Item}>
      <FocusScope>
        <ListInner {...props} ref={ref} />
      </FocusScope>
    </ListBoxContext>
  );
});

MenuList.displayName = 'MenuList';

const ListInner = React.forwardRef<HTMLUListElement, Props>((props, ref) => {
  const { focusNext, focusPrevious } = useFocusManager();

  const handleKeyDown = useKeyboardHandles({
    ArrowDown: () => focusNext(),
    ArrowUp: () => focusPrevious(),
  });

  return <ListStyled onKeyDown={handleKeyDown} {...props} ref={ref} />;
});

const ListStyled = styled('ul', {
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
