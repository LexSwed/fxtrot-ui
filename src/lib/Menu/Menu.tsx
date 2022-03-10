import React from 'react';
import * as RdxMenu from '@radix-ui/react-dropdown-menu';

import { PopoverLayer, PopoverLayerProps } from '../Popover/PopoverLayer';
import { styled, CssStyles } from '../stitches.config';
import { OpenStateProvider, useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';
import { StyledItem } from '../Item/Item';
import { Label } from '../Label';
import { Portal } from '../Portal';
import type { VariantProps } from '@stitches/react';
import { listStyles } from '../ListBox/FloatingList';

interface MenuListProps {
  children: [trigger: React.ReactElement, menuList: React.ReactElement];
  /**
   * The modality of the dropdown menu. When set to true, interaction with outside elements will be disabled and only menu content will be visible to screen readers.
   */
  modal?: boolean;
}

const MenuInner = ({ children, modal }: MenuListProps) => {
  const open = useOpenState();
  const controls = useOpenStateControls();
  const [trigger, menuList] = children;

  return (
    <RdxMenu.Root open={open} onOpenChange={controls.switch} modal={modal}>
      <RdxMenu.Trigger asChild>{trigger}</RdxMenu.Trigger>
      {menuList}
    </RdxMenu.Root>
  );
};

const MenuRoot = (props: MenuListProps) => {
  return (
    <OpenStateProvider>
      <MenuInner {...props} />
    </OpenStateProvider>
  );
};

const List = ({ children, css = {}, ...props }: PopoverLayerProps) => {
  return (
    <Portal>
      <PopoverLayer {...props} css={{ ...css, listStyles }} portalled={false} forceMount radixElement={RdxMenu.Content}>
        {children}
      </PopoverLayer>
    </Portal>
  );
};

interface MenuItemProps extends Omit<React.ComponentProps<typeof RdxMenu.Item>, 'as'>, VariantProps<typeof StyledItem> {
  css?: CssStyles;
}

const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(({ onSelect, disabled, textValue, ...props }, ref) => {
  return (
    <RdxMenu.Item onSelect={onSelect} disabled={disabled} textValue={textValue} asChild>
      <StyledItem {...props} ref={ref} />
    </RdxMenu.Item>
  );
});

const Separator = styled(RdxMenu.Separator, {
  height: 1,
  bc: '$borderLight',
  my: '$1',
  mx: '-$1',
});

const MenuLabel = React.forwardRef((props, ref) => {
  return (
    <RdxMenu.Label asChild>
      <Label {...props} ref={ref} />
    </RdxMenu.Label>
  );
}) as typeof Label;

export const Menu = MenuRoot;
MenuRoot.List = List;
MenuRoot.Item = MenuItem;
MenuRoot.Separator = Separator;
MenuRoot.Label = MenuLabel;
