import React from 'react';

import ListItem, { ListItemProps } from '../ListItem/ListItem';
import { focusOnMouseOver } from '../ListItem/ListItem';
import { forwardRef, useAllHandlers } from '../utils';
import { useOpenStateControls } from '../utils/OpenStateProvider';
import { useMenu } from './utils';

interface Props extends ListItemProps {
  action?: string;
}

const MenuItem = forwardRef<Props, 'li'>(({ action, disabled, ...props }, ref) => {
  const { onAction } = useMenu();
  const { close } = useOpenStateControls();

  const onMouseEnter = useAllHandlers(props.onMouseEnter, focusOnMouseOver);

  const onClick = useAllHandlers(() => {
    action && onAction?.(action);
    close();
  }, props.onClick);

  return <ListItem {...props} onMouseEnter={onMouseEnter} onClick={onClick} role="menuitem" ref={ref} />;
});

MenuItem.displayName = 'MenuItem';

export default MenuItem;
