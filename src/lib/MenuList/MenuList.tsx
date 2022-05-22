import React from 'react';
import * as RovingFocusGroup from '@radix-ui/react-roving-focus';

import { styled } from '../stitches.config';
import { Item, StyledItem } from './Item';
import { Section } from '../Section';
import { flexCss } from '../Flex/Flex';

interface Props extends React.ComponentProps<typeof ListStyled> {}

export const MenuList = ({ flow = 'column', ...props }: Props) => {
  return (
    <RovingFocusGroup.Root asChild>
      <ListStyled flow={flow} {...props} />
    </RovingFocusGroup.Root>
  );
};

MenuList.displayName = 'MenuList';
MenuList.Item = Item;

const ListStyled = styled('div', flexCss, {
  m: 0,
  p: 0,

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
