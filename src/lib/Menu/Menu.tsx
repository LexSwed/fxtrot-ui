import React, { useMemo, useRef } from 'react';
import { useUIDSeed } from 'react-uid';
import { OpenStateProvider } from '../utils/OpenStateProvider';

import MenuButton from './MenuButton';
import MenuList from './MenuList';
import MenuItem from './MenuItem';
import { MenuProvider } from './utils';

const Menu: React.FC<{
  onAction?: (key: string) => void;
}> & {
  Button: typeof MenuButton;
  List: typeof MenuList;
  Item: typeof MenuItem;
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

Menu.Button = MenuButton;
Menu.List = MenuList;
Menu.Item = MenuItem;

export default Menu;
