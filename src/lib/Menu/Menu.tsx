import React, { useMemo, useRef } from 'react';
import { useUIDSeed } from 'react-uid';

import { OpenStateProvider } from '../utils/OpenStateProvider';
import MenuButton from './MenuButton';
import MenuList from './MenuList';
import { MenuProvider } from './utils';

const Menu: React.FC<{
  onAction?: (key: string) => void;
}> & {
  Trigger: typeof MenuButton;
  List: typeof MenuList;
} = ({ onAction, children }) => {
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
        <>{children}</>
      </OpenStateProvider>
    </MenuProvider>
  );
};

Menu.Trigger = MenuButton;
Menu.List = MenuList;

export default Menu;
