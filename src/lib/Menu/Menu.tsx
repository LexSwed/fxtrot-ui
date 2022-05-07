import React from 'react';
import * as RdxMenu from '@radix-ui/react-dropdown-menu';

import { PopoverBox } from '../Popover/PopoverBox';
import { styled, CssStyles } from '../stitches.config';
import { OpenStateProvider, useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';
import { Label } from '../Label';
import { Portal } from '../Portal';
import type { VariantProps } from '@stitches/react';
import { listStyles } from '../shared/FloatingList';
import { ListItem } from '../shared/ListItem';
import { useIsomorphicLayoutEffect } from '../utils/hooks';

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

interface MenuListProps
  extends Pick<RdxMenu.MenuContentProps, 'side' | 'sideOffset' | 'align'>,
    React.ComponentProps<typeof PopoverBox> {}
const List = ({ align = 'start', side = 'bottom', sideOffset = 8, ...props }: MenuListProps) => {
  return (
    <Portal>
      <RdxMenu.Content align={align} side={side} sideOffset={sideOffset} portalled={false} asChild>
        <MenuListContent {...props} />
      </RdxMenu.Content>
    </Portal>
  );
};

const MenuListContent = React.forwardRef<HTMLDivElement, MenuListProps>(({ style = {}, ...props }, ref) => {
  const minWidth = useTriggerWidth(props['aria-labelledby']);
  return <MenuListBox {...props} style={{ ...style, minWidth }} ref={ref} />;
});

const MenuListBox = styled(PopoverBox, listStyles);

function useTriggerWidth(triggerElementId?: string) {
  const [width, setWidth] = React.useState<number>();

  useIsomorphicLayoutEffect(() => {
    if (!triggerElementId) return;
    const triggerEl = document.getElementById(triggerElementId);
    if (triggerEl) {
      setWidth(triggerEl.getBoundingClientRect().width);
    }
  }, [triggerElementId]);

  return width;
}

interface MenuItemProps extends Omit<React.ComponentProps<typeof RdxMenu.Item>, 'as'>, VariantProps<typeof ListItem> {
  css?: CssStyles;
}

const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(({ onSelect, disabled, textValue, ...props }, ref) => {
  return (
    <RdxMenu.Item onSelect={onSelect} disabled={disabled} textValue={textValue} asChild>
      <ListItem {...props} ref={ref} />
    </RdxMenu.Item>
  );
});

const Separator = styled(RdxMenu.Separator, {
  height: 1,
  bc: '$border--light',
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

MenuRoot.List = List;
MenuRoot.Item = MenuItem;
MenuRoot.Separator = Separator;
MenuRoot.Label = MenuLabel;

export const Menu = MenuRoot;
