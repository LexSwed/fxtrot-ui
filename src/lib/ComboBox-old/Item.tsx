import React from 'react';
import { HiCheck } from 'react-icons/hi';

import Icon from '../Icon';
import ListItem from '../ListItem';
import type { ListItemProps } from '../ListItem/ListItem';
import { styled } from '../stitches.config';
import { forwardRef, useAllHandlers } from '../utils';
import { useOpenStateControls } from '../utils/OpenStateProvider';
import { useComboBox, useIsItemFocused, useItem, useUpdateCombobox } from './utils';

const SelectedIcon = styled(Icon, {});

const Option = styled(ListItem, {
  [` > ${SelectedIcon}`]: {
    color: '$primaryStill',
  },
});

export interface Props extends Omit<ListItemProps, 'children' | 'value' | 'label' | 'isFocused'> {
  value: string;
  label: string;
}

const Item = forwardRef<HTMLLIElement, Props>(({ value, label, ...props }, propRef) => {
  const { onValueChange } = useComboBox();
  const { close } = useOpenStateControls();
  const dispatch = useUpdateCombobox();
  const item = useItem(value);
  const isFocused = useIsItemFocused(value);

  const onMouseDown = useAllHandlers(props.onMouseDown, (e) => {
    e.preventDefault();
    e.stopPropagation();
    onValueChange?.(value, label);
    close();
  });

  const onMouseOver = useAllHandlers(
    props.onMouseOver,
    item?.id ? () => dispatch({ type: 'focus', newId: item.id }) : undefined
  );

  if (!item) {
    return null;
  }

  return (
    <Option
      {...props}
      isFocused={isFocused}
      id={item.id}
      aria-selected={item.selected}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      main="spread"
      ref={propRef}
    >
      {label}
      {item.selected ? <SelectedIcon as={HiCheck} size="md" /> : null}
    </Option>
  );
});

export default Item;
