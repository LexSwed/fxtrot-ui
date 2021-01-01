import type { Options } from '@popperjs/core';
import React, { useEffect, useRef } from 'react';

import ListBox, { ListBoxProps } from '../ListBox/ListBox';
import Popover from '../Popover';
import { useMenu } from './utils';

const MenuList: React.FC<ListBoxProps> = (props) => {
  const { seed } = useMenu();

  const listRef = useRef<HTMLUListElement>(null);

  /** Will run when the component is rendered by Popover component */
  useEffect(() => {
    const option = listRef.current?.querySelector('[role="menuitem"]');

    if (option) {
      (option as HTMLLIElement | undefined)?.focus?.();
    } else {
      listRef.current?.focus();
    }
  }, [listRef]);

  return (
    <ListBox
      {...props}
      restoreFocus
      contain
      wrap
      role={'menu'}
      id={seed('menu')}
      aria-labelledby={seed('button')}
      ref={listRef}
    />
  );
};

const MenuPopper: React.FC<
  ListBoxProps & {
    offset?: number;
    placement?: Options['placement'];
  }
> = ({ placement, offset, ...props }) => {
  const { triggerRef } = useMenu();

  return (
    <Popover triggerRef={triggerRef} placement={placement} offset={offset}>
      <MenuList {...props} />
    </Popover>
  );
};

export default MenuPopper;
