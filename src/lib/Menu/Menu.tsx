import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Slot } from '@radix-ui/react-slot';

import { PopoverLayer, PopoverLayerProps } from '../Popover/PopoverLayer';
import { styled } from '../stitches.config';
import { ToggleStateScope, useToggleState } from '../utils/OpenStateProvider';
import { StyledItem } from '../Item/Item';
import { Label } from '../Label';

interface MenuListProps {
  children: [trigger: React.ReactElement, menuList: React.ReactElement];
}

export const Menu = ({ children }: MenuListProps) => {
  const [open, controls, atom] = useToggleState();
  const [trigger, menuList] = children;

  return (
    <ToggleStateScope atom={atom}>
      <DropdownMenu.Root open={open} onOpenChange={controls.switch} modal={false}>
        <DropdownMenu.Trigger as={Slot}>{trigger}</DropdownMenu.Trigger>
        {menuList}
      </DropdownMenu.Root>
    </ToggleStateScope>
  );
};

const List = ({ children, ...props }: PopoverLayerProps) => {
  return (
    <PopoverLayer {...props} as={StyledList} radixElement={DropdownMenu.Content}>
      {children}
    </PopoverLayer>
  );
};
const StyledList = styled('div', {
  width: '100%',
  m: 0,
  p: '$1',
  overflowY: 'auto',
  maxHeight: '240px',
});

interface MenuItemProps extends Omit<React.ComponentProps<typeof DropdownMenu.Item>, 'as'> {}

const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(({ onSelect, disabled, textValue, ...props }, ref) => {
  return (
    <DropdownMenu.Item onSelect={onSelect} disabled={disabled} textValue={textValue} as={Slot}>
      <StyledItem {...props} ref={ref} />
    </DropdownMenu.Item>
  );
});

const Separator = styled(DropdownMenu.Separator, {
  height: 1,
  bc: '$borderLight',
  my: '$1',
  mx: '-$1',
});

const MenuLabel = React.forwardRef((props, ref) => {
  return (
    <DropdownMenu.Label as={Slot}>
      <Label {...props} ref={ref} />
    </DropdownMenu.Label>
  );
}) as typeof Label;

Menu.List = List;
Menu.Item = MenuItem;
Menu.Separator = Separator;
Menu.Label = MenuLabel;
