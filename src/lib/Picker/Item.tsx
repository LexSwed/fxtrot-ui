import React, { useCallback, useEffect, useRef } from 'react';
import { HiCheck } from 'react-icons/hi';

import Icon from '../Icon';
import ListItem from '../ListItem';
import type { ListItemProps } from '../ListItem/ListItem';
import { focusOnMouseOver } from '../ListItem/ListItem';
import { styled } from '../stitches.config';
import { useAllHandlers, useForkRef } from '../utils/hooks';
import { useOpenStateControls } from '../utils/OpenStateProvider';
import { usePicker } from './utils';

const SelectedIcon = styled(Icon, {});

const Option = styled(ListItem, {
  [` > ${SelectedIcon}`]: {
    color: '$primaryStill',
  },
});

export interface PickerItemProps extends Omit<ListItemProps, 'children' | 'value' | 'label'> {
  value: string;
  label: string;
}

const Item = React.forwardRef<HTMLLIElement, PickerItemProps>(({ value, label, ...props }, ref) => {
  const { value: dropdownValue, onChange } = usePicker();
  const innerRef = useRef<HTMLLIElement>(null);
  const { close } = useOpenStateControls();
  const isSelected = dropdownValue === value;

  const onClick = useCallback(() => {
    onChange?.(value);
    close();
  }, [close, onChange, value]);

  useEffect(() => {
    if (isSelected) {
      innerRef.current?.focus?.();
    }
  }, [isSelected]);

  const onMouseEnter = useAllHandlers(props.onMouseEnter, focusOnMouseOver);

  const refs = useForkRef(innerRef, ref);

  return (
    <Option
      {...props}
      onMouseEnter={onMouseEnter}
      aria-selected={isSelected}
      onClick={onClick}
      main="space-between"
      ref={refs}
    >
      {label}
      {isSelected ? <SelectedIcon as={HiCheck} size="md" /> : null}
    </Option>
  );
});

export default Item;
