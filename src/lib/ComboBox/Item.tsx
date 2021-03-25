import React from 'react';
import { HiCheck } from 'react-icons/hi';

import Icon from '../Icon';
import ListItem from '../ListItem';
import type { ListItemProps } from '../ListItem/ListItem';
import { styled } from '../stitches.config';
import { useAllHandlers } from '../utils/hooks';
import { useItemSelected, useItemFocused, useFocusItem } from './atoms';

const SelectedIcon = styled(Icon, {});

const Option = styled(ListItem, {
  [`& > ${SelectedIcon}`]: {
    color: '$primaryStill',
  },
});

export interface OptionType extends React.ReactElement<Props, typeof Item> {}
export interface Props extends Omit<ListItemProps, 'children' | 'value' | 'label' | 'isFocused'> {
  /** id won't work as it's overwritten by ComboBox 🤷‍♂️ */
  id?: string;
  value: string;
  label: string;
}

const Item = React.forwardRef<HTMLLIElement, Props>(
  ({ id, value, label, main = 'space-between', ...props }, propRef) => {
    const isSelected = useItemSelected(value);
    const isFocused = useItemFocused(id as string);

    const updateFocusedItemId = useFocusItem();
    const onMouseOver = useAllHandlers(props.onMouseOver, () => updateFocusedItemId(id as string));
    const preventMouseDown = useAllHandlers(props.onMouseDown, (e) => {
      e.preventDefault();
      e.stopPropagation();
    });

    return (
      <Option
        {...props}
        id={id}
        isFocused={isFocused}
        aria-selected={isSelected}
        onMouseOver={onMouseOver}
        onMouseDown={preventMouseDown}
        main={main}
        ref={propRef}
      >
        {label}
        {isSelected ? <SelectedIcon as={HiCheck} size="md" /> : null}
      </Option>
    );
  }
);

export default Item;
