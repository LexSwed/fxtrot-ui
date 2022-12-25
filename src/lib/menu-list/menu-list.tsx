import * as RovingFocusGroup from '@radix-ui/react-roving-focus';

import { clsx } from 'clsx';
import { ComponentProps, ElementType, forwardRef, ReactElement } from 'react';

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

type MenuListItemProps<C extends ElementType> = PolyProps<
  C,
  ListItemVariants & { disabled?: boolean; active?: boolean }
>;
type MenuListItemComponent = <C extends ElementType = 'span'>(props: MenuListItemProps<C>) => ReactElement | null;

export const Item: MenuListItemComponent = forwardRef(
  <C extends ElementType = 'a'>(
    { as, className, disabled, onKeyDown, active, ...props }: MenuListItemProps<C>,
    ref: PolyRef<C>
  ) => {
    const Component = as || 'a';
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
  }
);

MenuList.Item = Item;
