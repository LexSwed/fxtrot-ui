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

type Props = Omit<React.ComponentProps<typeof ListItem>, 'children'> & {
  value: string;
  label: string;
};

const Item = React.forwardRef<HTMLLIElement, Props>(({ value, label, ...props }, ref) => {
  const { value: dropdownValue, onChange } = useComboBox();
  const { close } = useOpenStateControls();
  const isSelected = dropdownValue === value;

  const onClick = useCallback(() => {
    onChange?.(value);
    close();
  }, [close, onChange, value]);

  return (
    <Option {...props} aria-selected={isSelected} onClick={onClick} main="spread" ref={ref}>
      {label}
      {isSelected ? <SelectedIcon as={HiCheck} size="md" /> : null}
    </Option>
  );
});

export default Item;
