import React from 'react';
import * as RovingFocusGroup from '@radix-ui/react-roving-focus';

import { styled } from '../stitches.config';
import { Item, StyledItem } from './Item';
import { Section } from '../Section';

interface Props extends React.ComponentProps<typeof ListStyled> {}

export const MenuList = React.forwardRef((props: Props, ref) => {
  return (
    <RovingFocusGroup.Root asChild>
      <ListStyled {...props} ref={ref} />
    </RovingFocusGroup.Root>
  );
}) as React.ForwardRefExoticComponent<React.PropsWithoutRef<Props> & React.RefAttributes<HTMLUListElement>> & {
  Item: typeof Item;
};

MenuList.displayName = 'MenuList';
MenuList.Item = Item;

const ListStyled = styled('ul', {
  m: 0,
  p: 0,
  focusRing: '$focusRing',

  [`& > ${Section}:not(:first-child)`]: {
    mt: '$6',
  },

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
