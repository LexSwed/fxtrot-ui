import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Popover from '../Popover';
import { useAllHandlers, useId } from '../utils';
import { OpenStateProvider } from '../utils/OpenStateProvider';
import List from './List';
import Item from './Item';

import { ComboBoxProvider } from './utils';
import Input from './Input';

interface OptionType extends React.ReactElement<React.ComponentProps<typeof Item>, typeof Item> {}
type Props = Omit<React.ComponentProps<typeof Input>, 'onChange'> & {
  value?: string;
  onChange?: (newValue: string | undefined, textValue: string) => void;
  children: OptionType[] | OptionType;
};

const ComboBox: React.FC<Props> & {
  Item: typeof Item;
} = ({ children, id, value: propValue, onChange: propOnChange, ...textFieldProps }) => {
  const selectedItem = (React.Children.toArray(children) as OptionType[]).find(
    (child) => child.props.value === propValue
  );
  const selectedLabel = selectedItem?.props?.label || '';
  const selectedValue = selectedItem?.props?.value;

  const [textValue, setTextValue] = useState(selectedLabel);

  useEffect(() => {
    if (selectedLabel) {
      setTextValue(selectedLabel);
    }
  }, [selectedLabel]);

  const updateText = useAllHandlers<string>(setTextValue, (text) => propOnChange?.(selectedItem?.props?.value, text));

  const textValueRef = useRef(textValue);
  useEffect(() => {
    textValueRef.current = textValue;
  }, [textValue]);

  const triggerRef = useRef<HTMLInputElement>(null);
  const triggerId = useId();

  const contextValue = useMemo(
    () => ({
      value: propValue,
      triggerRef,
      onChange: (newValue: string) => propOnChange?.(newValue, textValueRef.current),
    }),
    [propOnChange, propValue, textValueRef]
  );

  return (
    <OpenStateProvider>
      <ComboBoxProvider value={contextValue}>
        <Input
          aria-activedescendant={'someid'}
          id={triggerId}
          value={textValue}
          onChange={updateText}
          {...textFieldProps}
        />
        <Popover triggerRef={triggerRef}>
          <List triggerId={triggerId}>{children}</List>
        </Popover>
      </ComboBoxProvider>
    </OpenStateProvider>
  );
};

ComboBox.Item = Item;

export default ComboBox;

/**
 * Duplicate state to be able to use the element uncontrolled
 */
function useValue(propValue: Props['value'], propOnChange: Props['onChange']) {
  return [value, onChange] as const;
}

function useTextValue({ children, onChange, value }: Partial<Props>) {
  return [textValue, updateText] as const;
}
