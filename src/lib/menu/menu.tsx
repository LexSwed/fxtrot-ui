import {
  type ComponentProps,
  forwardRef,
  type ForwardRefExoticComponent,
  type ReactElement,
  type RefAttributes,
  useRef,
  useState,
} from 'react';
import * as RdxMenu from '@radix-ui/react-dropdown-menu';
import { clsx } from 'clsx';

import { PopoverBox } from '../shared/popover-box';
import { OpenStateProvider, type OpenStateRef, useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';
import { Label } from '../form-field';
import { Portal } from '../portal';
import { ListItem, type ListItemVariants } from '../shared/list-item';
import { useIsomorphicLayoutEffect } from '../utils/hooks';
import { Presence } from '../shared/presence';

import styles from './menu.module.css';

interface MenuProps {
  children: [trigger: ReactElement, menuList: ReactElement];
  /**
   * The modality of the dropdown menu. When set to true, interaction with outside elements will be disabled and only menu content will be visible to screen readers.
   */
  modal?: boolean;
}

const MenuInner = ({ children, modal }: MenuProps) => {
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

const MenuRoot = forwardRef<OpenStateRef, MenuProps>((props, ref) => {
  return (
    <OpenStateProvider ref={ref}>
      <MenuInner {...props} />
    </OpenStateProvider>
  );
}) as ForwardRefExoticComponent<MenuListProps & RefAttributes<OpenStateRef>> & {
  List: typeof List;
  Item: typeof MenuItem;
  Separator: typeof Separator;
  Label: typeof MenuLabel;
};

export function useMenuRef() {
  return useRef<OpenStateRef>(null);
}

interface MenuListProps
  extends Pick<RdxMenu.MenuContentProps, 'side' | 'sideOffset' | 'align'>,
    ComponentProps<typeof PopoverBox> {}
const List = ({ align = 'start', side = 'bottom', sideOffset = 8, ...props }: MenuListProps) => {
  const open = useOpenState();
  return (
    <Presence present={open}>
      {({ ref: presenceRef }) => (
        <Portal radixPortal={RdxMenu.Portal} forceMount>
          <RdxMenu.Content align={align} side={side} sideOffset={sideOffset} asChild>
            <MenuListContent {...props} ref={presenceRef} />
          </RdxMenu.Content>
        </Portal>
      )}
    </Presence>
  );
};

const MenuListContent = forwardRef<HTMLDivElement, MenuListProps>(({ style = {}, ...props }, ref) => {
  const minWidth = useTriggerWidth(props['aria-labelledby']);
  return <PopoverBox {...props} style={{ ...style, minWidth }} ref={ref} />;
});

function useTriggerWidth(triggerElementId?: string) {
  const [width, setWidth] = useState<number>();

  useIsomorphicLayoutEffect(() => {
    if (!triggerElementId) return;
    const triggerEl = document.getElementById(triggerElementId);
    if (triggerEl) {
      setWidth(triggerEl.getBoundingClientRect().width);
    }
  }, [triggerElementId]);

  return width;
}

interface MenuItemProps extends ListItemVariants, Omit<ComponentProps<typeof RdxMenu.Item>, 'asChild'> {}

const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(({ onSelect, disabled, textValue, ...props }, ref) => {
  return (
    <RdxMenu.Item onSelect={onSelect} disabled={disabled} textValue={textValue} asChild>
      <ListItem {...props} ref={ref} />
    </RdxMenu.Item>
  );
});

export const Separator = (props: ComponentProps<'div'>) => {
  return <div {...props} className={clsx(styles.separator, props.className)} />;
};

const MenuLabel = forwardRef((props, ref) => {
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
