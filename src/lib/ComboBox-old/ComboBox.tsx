import { Provider } from 'jotai';
import React, { useEffect, useMemo, useRef } from 'react';
import { useUIDSeed } from 'react-uid';

import { List as ListBox } from '../ListBox/ListBox';
import Popover from '../Popover';
import { useAllHandlers, useForkRef } from '../utils';
import { OpenStateProvider, useOpenState } from '../utils/OpenStateProvider';
import Input, { Props as InputProps } from './Input';
import Item, { Props as ItemProps } from './Item';
import {
  ComboBoxContext,
  ComboBoxProvider,
  RenderedItems,
  useComboBoxValueAndChange,
  useSelectedItem,
  useUpdateCombobox,
} from './utils';

interface OptionType extends React.ReactElement<ItemProps, typeof Item> {}
interface Props extends Omit<InputProps, 'onChange' | 'onSelect' | 'value' | 'children'> {
  value?: string | null;
  onChange?: (newValue: string | null) => void;
  onInputChange?: (text: string) => void;
  children: OptionType[] | OptionType;
}

const ComboBoxInner: React.FC<Props> = ({
  children,
  id,
  value: propValue,
  onChange: propOnChange,
  onInputChange,
  ...textFieldProps
}) => {
  const [innerValue, onChange] = useComboBoxValueAndChange(propValue, propOnChange);
  const inputRef = useRef<HTMLInputElement>(null);
  const idSeed = useUIDSeed();
  const isOpen = useOpenState();
  const selectedItem = useSelectedItem();
  const dispatch = useUpdateCombobox();
  const allowNewElement = !!onInputChange;
  const inputRefs = useForkRef(textFieldProps.inputRef, inputRef);

  useEffect(() => {
    let items: RenderedItems = {};
    React.Children.forEach(children, (option: OptionType) => {
      const { label, value } = option.props || {};
      const id = idSeed('option') + value;
      const selected = value === innerValue;
      items[value] = {
        id,
        value,
        selected,
        label,
      };
    });
    dispatch({ type: 'update_items', items });
  }, [children, dispatch, idSeed, innerValue]);

  useEffect(() => {
    if (!selectedItem?.label) return;

    dispatch({ type: 'filter', text: selectedItem.label });
  }, [dispatch, selectedItem]);

  useEffect(() => {
    if (isOpen && innerValue) {
      dispatch({ type: 'focus_selected', value: innerValue });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleValueChange = useAllHandlers((newValue: string | null, newText: string = '') => {
    onChange(newValue);
    dispatch({
      type: 'filter',
      text: newText || '',
    });
    onInputChange?.(newText || '');
  });

  // const handleTextChange = useAllHandlers<string>((textValue) => {
  //   if (allowNewElement || textValue === '') {
  //     onChange(null);
  //   }
  //   setTextValue(textValue);
  // }, onInputChange);

  const contextValue: ComboBoxContext = {
    onValueChange: handleValueChange,
    allowNewElement,
  };

  const popover = useMemo(
    () => (
      <Popover triggerRef={inputRef}>
        <ListBox role="listbox" id={idSeed('listbox')} aria-labelledby={idSeed('input')}>
          {children}
        </ListBox>
      </Popover>
    ),
    [children, idSeed]
  );

  return (
    <ComboBoxProvider value={contextValue}>
      <Input {...textFieldProps} inputRef={inputRefs} aria-controls={idSeed('listbox')} />
      {popover}
    </ComboBoxProvider>
  );
};

const ComboBox: React.FC<Props> & { Item: typeof Item } = (props) => {
  return (
    <OpenStateProvider>
      <Provider>
        <ComboBoxInner {...props} />
      </Provider>
    </OpenStateProvider>
  );
};

ComboBox.Item = Item;

export default ComboBox;
