import React from 'react';

import ListItem from '../ListItem';
import { focusOnMouseOver } from '../ListItem/ListItem';
import { useAllHandlers } from '../utils';
import { useOpenStateControls } from '../utils/OpenStateProvider';
import { useMenu } from './utils';

interface Props extends React.ComponentProps<typeof ListItem> {
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

  return <ListItem {...props} onMouseEnter={onMouseEnter} onClick={onClick} role="menuitem" ref={ref} />;
});

MenuItem.displayName = 'MenuItem';

export default MenuItem;
