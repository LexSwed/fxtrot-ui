import React from 'react';
import { MenuProvider } from './utils';

import MenuButton from './MenuButton';
import MenuList from './MenuList';
import MenuItem from './MenuItem';

const Menu: React.FC<React.ComponentProps<typeof MenuProvider>> & {
  Button: typeof MenuButton;
  List: typeof MenuList;
  Item: typeof MenuItem;
} = (props) => {
  return <MenuProvider {...props} />;
};

Menu.Button = MenuButton;
Menu.List = MenuList;
Menu.Item = MenuItem;

export default Menu;
