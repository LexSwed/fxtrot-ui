import React from 'react';

import { useAllHandlers } from '../utils';
import { useMenu } from './utils';
import ListItem from '../ListItem';
import { useOpenStateControls } from '../utils/OpenStateProvider';

type Props = React.ComponentProps<typeof ListItem> & { act: string };

const MenuItem = React.forwardRef<HTMLLIElement, Props>(({ act, disabled, ...props }, ref) => {
  const { onAction } = useMenu();
  const { close } = useOpenStateControls();

  const onPress = useAllHandlers(() => {
    act && onAction?.(act);
    close();
  }, props.onPress);

  return <ListItem {...props} onPress={onPress} role="menuitem" ref={ref} />;
});

MenuItem.displayName = 'MenuItem';

export default MenuItem;
