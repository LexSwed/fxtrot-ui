import React, { useCallback, useEffect, useRef } from 'react';
import { HiCheck } from 'react-icons/hi';
import Icon from '../Icon';
import ListItem from '../ListItem';
import { useForkRef } from '../utils';
import { useOpenStateControls } from '../utils/OpenStateProvider';
import { usePicker } from './utils';

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
    <ListItem {...props} aria-selected={isSelected} onPress={onPress} main="spread" ref={refs}>
      {label}
      {isSelected ? <Icon as={HiCheck} size="md" /> : null}
    </ListItem>
  );
});

export default Item;
