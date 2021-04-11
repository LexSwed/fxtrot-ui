import React, { useMemo, useRef } from 'react';
import { useUIDSeed } from 'react-uid';
import { useAllHandlers, useForkRef, useKeyboardHandles } from '../utils/hooks';

import { OpenStateProvider, useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';
import MenuList from './MenuList';
import { MenuProvider, useMenu } from './utils';

interface MenuListProps {
  children: [trigger: React.ReactElement, menuList: React.ReactElement];
}

const MenuInner = ({ children }: MenuListProps) => {
  const [trigger, menuList] = children;
  const isOpen = useOpenState();
  const { open, close, toggle } = useOpenStateControls();
  const { seed, triggerRef } = useMenu();
  const onClick = useAllHandlers(trigger.props.onClick, toggle);

  const handleKeyDown = useKeyboardHandles({
    ArrowDown: open,
    ArrowUp: open,
    Escape: close,
  });

  const onKeyDown = useAllHandlers(trigger.props.onKeyDown, handleKeyDown);

  const refs = useForkRef(triggerRef, (trigger as any).ref);

  return (
    <>
      {React.cloneElement(trigger, {
        'aria-expanded': isOpen,
        'aria-haspopup': true,
        'aria-controls': isOpen ? seed('menu') : undefined,
        'id': seed('button'),
        onClick,
        onKeyDown,
        'ref': refs,
      })}
      {menuList}
    </>
  );
};

const Menu = ({
  onAction,
  ...props
}: MenuListProps & {
  onAction?: (key: string) => void;
}) => {
  const seed = useUIDSeed();
  const triggerRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLElement>(null);

  const menuContextValue = useMemo(
    () => ({
      triggerRef,
      listRef,
      seed,
      onAction,
    }),
    [triggerRef, listRef, seed, onAction]
  );

  return (
    <MenuProvider value={menuContextValue}>
      <OpenStateProvider>
        <MenuInner {...props} />
      </OpenStateProvider>
    </MenuProvider>
  );
};

Menu.List = MenuList;

export default Menu;
