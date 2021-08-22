import React, { useCallback } from 'react';
import { CheckIcon } from '@heroicons/react/solid';

import { Icon } from '../Icon/Icon';
import { StyledItem, ItemProps } from '../Item/Item';
import { focusOnMouseOver } from '../Item/Item';
import { useAllHandlers } from '../utils/hooks';
import { useOpenStateControls } from '../utils/OpenStateProvider';
import { usePicker } from './utils';

export interface OptionType extends React.ReactElement<ItemProps, typeof Item> {}

const Item = React.forwardRef<HTMLDivElement, ItemProps>(({ value, label, ...props }, ref) => {
  const { value: dropdownValue, onChange, size } = usePicker();
  const { close } = useOpenStateControls();
  const isSelected = dropdownValue !== undefined && dropdownValue === value;

  const onClick = useCallback(() => {
    value && onChange?.(value);
    close();
  }, [close, onChange, value]);

  const onMouseEnter = useAllHandlers(props.onMouseEnter, focusOnMouseOver);

  return (
    <StyledItem
      {...props}
      role="option"
      onMouseEnter={onMouseEnter}
      aria-selected={isSelected}
      onClick={onClick}
      main="space-between"
      size={size}
      ref={ref}
    >
      {label}
      {isSelected ? <Icon as={CheckIcon} color="$primaryStill" size="md" /> : null}
    </StyledItem>
  );
});

Item.displayName = 'PickerItem';

export default Item;
