import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { PopoverLayer, PopoverLayerProps } from '../Popover/PopoverLayer';
import { styled } from '../stitches.config';
import { ToggleStateScope, useToggleState } from '../utils/OpenStateProvider';
import { StyledItem } from '../Item/Item';
import { Label } from '../Label';

interface MenuListProps {
  children: [trigger: React.ReactElement, menuList: React.ReactElement];
  /**
   * The modality of the dropdown menu. When set to true, interaction with outside elements will be disabled and only menu content will be visible to screen readers.
   */
  modal?: boolean;
}

export const Menu = ({ children, modal }: MenuListProps) => {
  const [open, controls, atom] = useToggleState();
  const [trigger, menuList] = children;

  return (
    <ToggleStateScope atom={atom}>
      <DropdownMenu.Root open={open} onOpenChange={controls.switch} modal={modal}>
        <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
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
    <DropdownMenu.Item onSelect={onSelect} disabled={disabled} textValue={textValue} asChild>
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
    <DropdownMenu.Label asChild>
      <Label {...props} ref={ref} />
    </DropdownMenu.Label>
  );
}) as typeof Label;

Menu.List = List;
Menu.Item = MenuItem;
Menu.Separator = Separator;
Menu.Label = MenuLabel;
