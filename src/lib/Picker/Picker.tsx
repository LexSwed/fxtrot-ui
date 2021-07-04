import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useUID } from 'react-uid';

import Popover from '../Popover/PopoverLayer';
import { useDerivedState } from '../utils/hooks';
import { OpenStateProvider } from '../utils/OpenStateProvider';
import type { OptionType } from './Item';
import List from './List';
import Trigger, { TriggerProps } from './Trigger';
import { PickerProvider, PickerContext } from './utils';

interface Props extends Omit<TriggerProps, 'value' | 'onChange' | 'defaultValue' | 'children' | 'size'> {
  value?: string;
  defaultValue?: string;
  onChange?: (newValue: string) => void;
  children: OptionType[] | OptionType;
  size: PickerContext['size'];
}

const Picker: React.FC<Props> = ({ children, id, value, defaultValue, onChange, size, ...triggerProps }) => {
  const [innerValue, onChangeInner] = useDerivedState(value, onChange, defaultValue);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const triggerId = useUID();
  const title = useTitle({ children, value: innerValue });

  const contextValue = useMemo(
    () => ({
      value: innerValue,
      onChange: onChangeInner,
      size,
    }),
    [onChangeInner, innerValue, size]
  );

  return (
    <OpenStateProvider>
      <PickerProvider value={contextValue}>
        <Trigger id={triggerId} ref={triggerRef as any} size={size} {...triggerProps}>
          {title}
        </Trigger>
        <Popover triggerRef={triggerRef}>
          <List triggerId={triggerId}>{children}</List>
        </Popover>
      </PickerProvider>
    </OpenStateProvider>
  );
};

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
