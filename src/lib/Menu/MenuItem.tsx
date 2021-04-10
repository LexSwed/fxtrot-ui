import React from 'react';

import { StyledItem, ItemComponent, focusOnMouseOver } from '../Item/Item';
import { useAllHandlers } from '../utils/hooks';
import { useOpenStateControls } from '../utils/OpenStateProvider';
import { useMenu } from './utils';

const MenuItem: ItemComponent = React.forwardRef(({ value, disabled, ...props }, ref) => {
  const { onAction } = useMenu();
  const { close } = useOpenStateControls();

  const onMouseEnter = useAllHandlers(props.onMouseEnter, focusOnMouseOver);

  const onClick = useAllHandlers(() => {
    value && onAction?.(value);
    close();
  }, props.onClick);

  return <StyledItem role="menuitem" {...props} onClick={onClick} onMouseEnter={onMouseEnter} ref={ref} />;
});

MenuItem.displayName = 'MenuItem';

export default MenuItem;
