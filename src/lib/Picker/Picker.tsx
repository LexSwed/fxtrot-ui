import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Popover from '../Popover';
import { useId } from '../utils';
import { OpenStateProvider } from '../utils/OpenStateProvider';
import Item, { PickerItemProps } from './Item';
import List from './List';
import Trigger, { TriggerProps } from './Trigger';
import { PickerProvider } from './utils';

interface OptionType extends React.ReactElement<PickerItemProps, typeof Item> {}
interface Props extends Omit<TriggerProps, 'value' | 'onChange' | 'children'> {
  value?: string;
  onChange?: (newValue: string) => void;
  children: OptionType[] | OptionType;
}

const Picker: React.FC<Props> & {
  Item: typeof Item;
} = ({ children, id, value, onChange, ...triggerProps }) => {
  const [innerValue, onChangeInner] = useValue(value, onChange);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const triggerId = useId();
  const title = useTitle({ children, value: innerValue });

  const contextValue = useMemo(
    () => ({
      value: innerValue,
      triggerRef,
      onChange: onChangeInner,
    }),
    [onChangeInner, innerValue]
  );

  return (
    <OpenStateProvider>
      <PickerProvider value={contextValue}>
        <Trigger id={triggerId} {...triggerProps}>
          {title}
        </Trigger>
        <Popover triggerRef={triggerRef}>
          <List triggerId={triggerId}>{children}</List>
        </Popover>
      </PickerProvider>
    </OpenStateProvider>
  );
};

Picker.Item = Item;

export default Picker;

function useTitle({ children, value }: { children: Props['children']; value?: string }) {
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    if (!value) return;
    const selectedOption = (React.Children.toArray(children) as OptionType[]).find(
      (option) => option.props.value === value
    );
    const label = selectedOption?.props?.label;

    if (label) {
      setTitle(label);
    }
  }, [value, children]);

  return title;
}

/**
 * Duplicate state to be able to use the element uncontrolled
 */
function useValue(propValue: Props['value'], propOnChange: Props['onChange']) {
  const [value, setValue] = useState(propValue);

  const onChange = useCallback<Required<Props>['onChange']>(
    (newValue) => {
      // we expect `propOnChange` to change also `value` prop, so useEffect would update internal value
      if (typeof propOnChange === 'function') {
        propOnChange?.(newValue);
      } else {
        setValue(newValue);
      }
    },
    [propOnChange]
  );

  useEffect(() => {
    setValue(propValue);
  }, [propValue]);

  return [value, onChange] as const;
}
