import * as RovingFocusGroup from '@radix-ui/react-roving-focus';

import { clsx } from 'clsx';
import { ComponentProps, ElementType, forwardRef } from 'react';

import { Flex } from '../flex';
import { useAllHandlers, useKeyboardHandles } from '../utils/hooks';
import { listItemCss, ListItemVariants } from '../shared/list-item';

import type { PolyProps, PolyRef } from '../utils/polymorphic';
import styles from './menu-list.module.css';

interface MenuListProps extends ComponentProps<typeof Flex> {}

export const MenuList = ({ flow = 'column', className, ...props }: MenuListProps) => {
  return (
    <RovingFocusGroup.Root asChild>
      <Flex flow={flow} className={clsx(styles['menu-list'], className)} {...props} />
    </RovingFocusGroup.Root>
  );
};

export interface MenuListItemProps extends ListItemVariants {
  disabled?: boolean;
  selected?: boolean;
}

export const Item = forwardRef(function MenuListItem<C extends ElementType = 'button'>(
  { as, className, selected, disabled, onKeyDown, ...props }: PolyProps<C, MenuListItemProps>,
  ref: PolyRef<C>
) {
  const Component = as || 'button';
  const onKeyDownHandler = useKeyboardHandles({
    'Enter': (e) => e.currentTarget.click?.(),
    ' ': (e) => e.currentTarget.click?.(),
  });
  const handleKeyDown = useAllHandlers(onKeyDown, onKeyDownHandler);

  return (
    <RovingFocusGroup.Item asChild focusable={!disabled} active={selected}>
      <Component
        {...props}
        className={clsx(listItemCss(props), styles['menu-item'], className)}
        aria-selected={selected}
        aria-disabled={disabled}
        role="treeitem"
        onKeyDown={handleKeyDown}
        ref={ref}
      />
    </RovingFocusGroup.Item>
  );
});

Item.displayName = 'MenuListItem';

MenuList.displayName = 'MenuList';
MenuList.Item = Item;
