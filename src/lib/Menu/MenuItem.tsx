import React from 'react';

import { useAllHandlers } from '../utils';
import { useMenu } from './utils';
import ListItem from '../ListItem';
import { useOpenStateControls } from '../utils/OpenStateProvider';
import { focusOnMouseOver } from '../ListItem/ListItem';

type Props = React.ComponentProps<typeof ListItem> & { action?: string };

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
