import React from 'react';

import { useAllHandlers } from '../utils';
import { useMenu, useMenuControlState } from './utils';
import ListItem from '../ListItem';

type Props = React.ComponentProps<typeof ListItem> & { act: string };

const MenuItem = React.forwardRef<HTMLLIElement, Props>(({ act, disabled, ...props }, ref) => {
  const { onAction } = useMenu();
  const { close } = useMenuControlState();

  const onPress = useAllHandlers(() => {
    act && onAction?.(act);
    close();
  }, props.onPress);

  const onMouseEnter = useAllHandlers(props.onMouseEnter, (e) => {
    e.currentTarget.focus({
      preventScroll: true,
    });
  });

  return <ListItem {...props} onPress={onPress} onMouseEnter={onMouseEnter} role="menuitem" ref={ref} />;
});

MenuItem.displayName = 'MenuItem';

export default MenuItem;
