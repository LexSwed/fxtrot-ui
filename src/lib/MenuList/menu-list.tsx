import * as RovingFocusGroup from '@radix-ui/react-roving-focus';

import { clsx } from 'clsx';
import { ComponentProps, forwardRef } from 'react';

import { Flex } from '../flex';
import { useAllHandlers, useKeyboardHandles } from '../utils/hooks';
import { listItemCss, ListItemVariants } from '../shared/list-item';

import styles from './menu-list.module.css';

interface MenuListProps extends ComponentProps<typeof Flex> {}

export const MenuList = ({ flow = 'column', className, ...props }: MenuListProps) => {
  return (
    <RovingFocusGroup.Root asChild>
      <Flex flow={flow} className={clsx(styles['menu-list'], className)} {...props} />
    </RovingFocusGroup.Root>
  );
};

export interface MenuListItemProps extends ComponentProps<'button'>, ListItemVariants {
  disabled?: boolean;
  selected?: boolean;
}

export const Item = forwardRef<HTMLButtonElement, MenuListItemProps>(
  ({ selected, disabled, onKeyDown, className, ...props }, ref) => {
    const onKeyDownHandler = useKeyboardHandles({
      'Enter': (e) => e.currentTarget.click?.(),
      ' ': (e) => e.currentTarget.click?.(),
    });
    const handleKeyDown = useAllHandlers(onKeyDown, onKeyDownHandler);

    return (
      <RovingFocusGroup.Item asChild focusable={!disabled} active={selected}>
        <button
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
  }
);

Item.displayName = 'MenuListItem';

MenuList.displayName = 'MenuList';
MenuList.Item = Item;
