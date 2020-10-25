import React, { useEffect, useRef } from 'react';
import { useMenu } from './utils';
import type { Options } from '@popperjs/core';
import ListBox from '../ListBox/ListBox';
import Popover from '../Popover';

type UlListProps = React.ComponentProps<typeof ListBox>;

const MenuList: React.FC<UlListProps> = (props) => {
  const { seed } = useMenu();

  const listRef = useInitialFocus();

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
  UlListProps & {
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

function useInitialFocus() {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const option = listRef.current?.querySelector('[role="menuitem"]');

    if (option) {
      (option as HTMLLIElement | undefined)?.focus?.();
    } else {
      listRef.current?.focus();
    }
  }, [listRef]);

  return listRef;
}
