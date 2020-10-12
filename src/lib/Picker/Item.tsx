import React, { useCallback, useEffect, useRef } from 'react';
import { HiCheck } from 'react-icons/hi';
import Icon from '../Icon';
import ListItem from '../ListItem';
import { styled } from '../stitches.config';
import { useForkRef } from '../utils';
import { useOpenStateControls } from '../utils/OpenStateProvider';
import { usePicker } from './utils';

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
  const { value: dropdownValue, onChange } = usePicker();
  const innerRef = useRef<HTMLLIElement>(null);
  const { close } = useOpenStateControls();
  const isSelected = dropdownValue === value;

  const onPress = useCallback(() => {
    onChange?.(value);
    close();
  }, [close, onChange, value]);

  useEffect(() => {
    if (isSelected) {
      innerRef.current?.focus?.();
    }
  }, [isSelected]);

  const refs = useForkRef(innerRef, ref);

  return (
    <Option {...props} aria-selected={isSelected} onPress={onPress} main="spread" ref={refs}>
      {label}
      {isSelected ? <SelectedIcon as={HiCheck} size="md" /> : null}
    </Option>
  );
});

export default Item;
