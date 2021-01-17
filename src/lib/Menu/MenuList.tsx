import React from 'react';
import type { Options } from '@popperjs/core';

import ListBox, { ListBoxProps } from '../ListBox/ListBox';
import Popover from '../Popover';
import { useMenu } from './utils';

interface MenuListProps extends ListBoxProps {
  offset?: number;
  placement?: Options['placement'];
}

const MenuList: React.FC<MenuListProps> = ({ placement, offset, ...props }) => {
  const { triggerRef, seed } = useMenu();

  return (
    <Popover triggerRef={triggerRef} placement={placement} offset={offset}>
      <ListBox
        {...props}
        restoreFocus
        contain
        wrap
        role={'menu'}
        id={seed('menu')}
        aria-labelledby={seed('button')}
        autoFocus
      />
    </Popover>
  );
};

export default MenuList;
