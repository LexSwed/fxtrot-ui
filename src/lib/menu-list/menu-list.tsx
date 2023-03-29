import * as RovingFocusGroup from '@radix-ui/react-roving-focus';

import { clsx } from 'clsx';
import { type ComponentProps, forwardRef } from 'react';

import { Flex } from '../flex';
import { useAllHandlers, useKeyboardHandles } from '../utils/hooks';
import { listItemCss, type ListItemVariants } from '../shared/list-item';

import type { ForwardRefComponent } from '../utils/polymorphic';
import styles from './menu-list.module.css';

interface MenuListProps extends ComponentProps<typeof Flex> {}

export const MenuList = ({ flow = 'column', className, ...props }: MenuListProps) => {
  return (
    <RovingFocusGroup.Root asChild>
      <Flex flow={flow} className={clsx(styles['menu-list'], className)} {...props} />
    </RovingFocusGroup.Root>
  );
};

interface MenuListItemProps extends ListItemVariants {
  disabled?: boolean;
  active?: boolean;
}

export const Item = forwardRef(({ as: Component = 'a', className, disabled, onKeyDown, active, ...props }, ref) => {
  const onKeyDownHandler = useKeyboardHandles({
    'Enter': (e) => e.currentTarget.click?.(),
    ' ': (e) => e.currentTarget.click?.(),
  });
  const handleKeyDown = useAllHandlers(onKeyDown, onKeyDownHandler);

  return (
    <RovingFocusGroup.Item asChild focusable={!disabled} active={active}>
      <Component
        {...props}
        className={clsx(listItemCss(props), styles['menu-item'], className)}
        aria-disabled={disabled}
        aria-current={active}
        role="treeitem"
        onKeyDown={handleKeyDown}
        ref={ref}
      />
    </RovingFocusGroup.Item>
  );
}) as ForwardRefComponent<'a', MenuListItemProps>;

MenuList.Item = Item;
