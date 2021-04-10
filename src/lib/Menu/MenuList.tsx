import React from 'react';
import type { Options } from '@popperjs/core';

import ListBox, { ListBoxProps } from '../ListBox/ListBox';
import Popover from '../Popover/PopoverLayer';
import { useMenu } from './utils';
import MenuItem from './MenuItem';
import { ListBoxContext } from '../ListBox/ListBoxContext';

interface MenuListProps extends ListBoxProps {
  offset?: number;
  placement?: Options['placement'];
}

const MenuList: React.FC<MenuListProps> = ({ placement, offset, ...props }) => {
  const { triggerRef, seed } = useMenu();

  return (
    <Popover triggerRef={triggerRef} placement={placement} offset={offset}>
      <ListBoxContext ListItem={MenuItem}>
        <ListBox
          role={'menu'}
          {...props}
          restoreFocus
          contain
          wrap
          id={seed('menu')}
          aria-labelledby={seed('button')}
        />
      </ListBoxContext>
    </Popover>
  );
};

export default MenuList;
