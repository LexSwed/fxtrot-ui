import React from 'react';
import type { Options } from '@popperjs/core';

import ListBox, { ListBoxProps } from '../ListBox/ListBox';
import { PopoverLayerDeprecated } from '../Popover/LayerDeprectated';
import { useMenu } from './utils';
import MenuItem from './MenuItem';
import { ListBoxContext } from '../ListBox/ListBoxContext';

export interface MenuListProps extends ListBoxProps {
  offset?: number;
  placement?: Options['placement'];
}

const MenuList = React.forwardRef<HTMLUListElement, MenuListProps>(({ placement, offset, ...props }, ref) => {
  const { triggerRef, seed } = useMenu();

  return (
    <PopoverLayerDeprecated triggerRef={triggerRef} placement={placement} offset={offset}>
      <ListBoxContext ListItem={MenuItem}>
        <ListBox
          role={'menu'}
          {...props}
          ref={ref}
          autoFocus
          restoreFocus
          contain
          wrap
          id={seed('menu')}
          aria-labelledby={seed('button')}
        />
      </ListBoxContext>
    </PopoverLayerDeprecated>
  );
});

MenuList.displayName = 'MenuList';

export default MenuList;
