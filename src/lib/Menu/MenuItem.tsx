import React from 'react';

import ListItem, { ListItemProps } from '../ListItem/ListItem';
import { focusOnMouseOver } from '../ListItem/ListItem';
import { useAllHandlers } from '../utils/hooks';
import { useOpenStateControls } from '../utils/OpenStateProvider';
import { useMenu } from './utils';

interface Props extends Omit<ListItemProps, 'isFocused' | 'value' | 'children'> {
  action?: string;
}

const MenuItem = React.forwardRef<HTMLLIElement, Props>(({ action, disabled, ...props }, ref) => {
  const { onAction } = useMenu();
  const { close } = useOpenStateControls();

  const onMouseEnter = useAllHandlers(props.onMouseEnter, focusOnMouseOver);

  const onClick = useAllHandlers(() => {
    action && onAction?.(action);
    close();
  }, props.onClick);

  return (
    <ListItem
      {...props}
      disabled={disabled}
      tabIndex={disabled ? undefined : -1}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      role="menuitem"
      ref={ref}
    />
  );
});

MenuItem.displayName = 'MenuItem';

export default MenuItem;
