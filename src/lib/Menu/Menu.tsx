import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Slot } from '@radix-ui/react-slot';

import { PopoverLayer, PopoverLayerProps } from '../Popover/PopoverLayer';
import { styled } from '../stitches.config';
import { ListBoxContext } from '../ListBox/ListBoxContext';
import { ToggleStateScope, useToggleState } from '../utils/OpenStateProvider';
import { StyledItem } from '../Item/Item';
import type { CssStyles } from '../utils/types';

interface MenuListProps {
  children: [trigger: React.ReactElement, menuList: React.ReactElement];
}

export const Menu = ({ children }: MenuListProps) => {
  const [open, controls, atom] = useToggleState();
  const [trigger, menuList] = children;

  return (
    <ToggleStateScope atom={atom}>
      <DropdownMenu.Root open={open} onOpenChange={controls.switch}>
        <DropdownMenu.Trigger as={Slot}>{trigger}</DropdownMenu.Trigger>
        {menuList}
      </DropdownMenu.Root>
    </ToggleStateScope>
  );
};

const List = ({ children, ...props }: PopoverLayerProps) => {
  return (
    <ListBoxContext ListItem={MenuItem}>
      <PopoverLayer {...props} as={StyledList} disableOutsideScroll={false} radixElement={DropdownMenu.Content}>
        {children}
      </PopoverLayer>
    </ListBoxContext>
  );
};

interface MenuItemProps extends Omit<React.ComponentProps<typeof DropdownMenu.Item>, 'as'> {
  css?: CssStyles;
}

const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(({ onSelect, disabled, textValue, ...props }, ref) => {
  return (
    <DropdownMenu.Item onSelect={onSelect} disabled={disabled} textValue={textValue} as={Slot}>
      <StyledItem {...props} ref={ref} />
    </DropdownMenu.Item>
  );
});

Menu.List = List;
Menu.Item = MenuItem;

const StyledList = styled('ul', {
  'm': 0,
  'p': '$1',
  'overflowY': 'auto',
  'maxHeight': '240px',
  'focusRing': '$focusRing',
  '&:empty': {
    display: 'none',
  },
});
