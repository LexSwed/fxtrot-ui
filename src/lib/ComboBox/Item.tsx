import React, { useCallback } from 'react';
import { HiCheck } from 'react-icons/hi';
import Icon from '../Icon';
import ListItem from '../ListItem';
import { styled } from '../stitches.config';
import { useOpenStateControls } from '../utils/OpenStateProvider';
import { useComboBox } from './utils';

const SelectedIcon = styled(Icon, {});

const Option = styled(ListItem, {
  [` > ${SelectedIcon}`]: {
    color: '$primaryStill',
  },
});

interface Props extends Omit<React.ComponentProps<typeof ListItem>, 'children' | 'value' | 'label'> {
  value: string;
  label: string;
}

const Item = React.forwardRef<HTMLLIElement, Props>(({ value, label, ...props }, propRef) => {
  const { renderedItems, onChange, inputRef } = useComboBox();
  const { close } = useOpenStateControls();
  const item = renderedItems[value];

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
      onChange?.(value);
      close();
      inputRef.current?.focus();
    },
    [close, onChange, value, inputRef]
  );

  if (!item) {
    return null;
  }

  return (
    <Option
      {...props}
      isFocused={item.focused}
      id={item.id}
      aria-selected={item.selected}
      onClick={onClick}
      main="spread"
      ref={propRef}
    >
      {label}
      {item.selected ? <SelectedIcon as={HiCheck} size="md" /> : null}
    </Option>
  );
});

export default Item;
