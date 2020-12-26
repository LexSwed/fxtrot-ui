import React from 'react';
import { HiCheck } from 'react-icons/hi';

import Icon from '../Icon';
import ListItem from '../ListItem';
import type { ListItemProps } from '../ListItem/ListItem';
import { styled } from '../stitches.config';
import { forwardRef, useAllHandlers } from '../utils';
import { useItemSelected, useItemFocused, useFocusItem } from './atoms';

const SelectedIcon = styled(Icon, {});

const Option = styled(ListItem, {
  [` > ${SelectedIcon}`]: {
    color: '$primaryStill',
  },
});

export interface OptionType extends React.ReactElement<Props, typeof Item> {}
export interface Props extends Omit<ListItemProps, 'children' | 'value' | 'label' | 'isFocused'> {
  value: string;
  label: string;
}

const Item = forwardRef<HTMLLIElement, Props>(({ id, value, label, ...props }, propRef) => {
  const isSelected = useItemSelected(value);
  const isFocused = useItemFocused(id as string);

  const handleFocus = useFocusItem(id as string);
  const onMouseOver = useAllHandlers(props.onMouseOver, handleFocus);
  const preventMouseDown = useAllHandlers(props.onMouseDown, (e) => {
    e.preventDefault();
    e.stopPropagation();
  });

  return (
    <Option
      {...props}
      isFocused={isFocused}
      aria-selected={isSelected}
      onMouseOver={onMouseOver}
      onMouseDown={preventMouseDown}
      main="spread"
      ref={propRef}
    >
      {label}
      {isSelected ? <SelectedIcon as={HiCheck} size="md" /> : null}
    </Option>
  );
});

export default Item;
