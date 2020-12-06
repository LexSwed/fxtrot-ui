import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useUIDSeed } from 'react-uid';
import Popover from '../Popover';
import { useAllHandlers } from '../utils';
import { OpenStateProvider } from '../utils/OpenStateProvider';
import Item from './Item';
import { List as ListBox } from '../ListBox/ListBox';

import { ComboBoxProvider, ComboBoxContext, FocusControls } from './utils';
import Input from './Input';

interface OptionType extends React.ReactElement<React.ComponentProps<typeof Item>, typeof Item> {}
type Props = Omit<React.ComponentProps<typeof Input>, 'onChange'> & {
  value?: string;
  onChange?: (newValue: string | undefined | null) => void;
  onInputChange?: (text: string) => void;
  children: OptionType[] | OptionType;
};

const ComboBox: React.FC<Props> & {
  Item: typeof Item;
} = ({ children, id, value: propValue, onChange: propOnChange, onInputChange, ...textFieldProps }) => {
  const [textValue, setTextValue] = useState('');
  const [focusedItemId, setFocusedItemId] = useState<string>();
  const [renderedItems, setRenderedItems] = useState<ComboBoxContext['renderedItems']>({});

  const handleTextChange = useAllHandlers<string>(setTextValue, onInputChange);

  const inputRef = useRef<HTMLInputElement>(null);
  const idSeed = useUIDSeed();
  const focusControls = useRef({} as FocusControls);

  useEffect(() => {
    const newItems: ComboBoxContext['renderedItems'] = {};
    React.Children.forEach(children, (option: OptionType) => {
      const { label, value } = option.props || {};
      const selected = value === propValue;
      const id = renderedItems[value]?.id || idSeed('option');
      if (label.toLowerCase().includes(textValue.toLowerCase())) {
        newItems[value] = {
          focused: id === focusedItemId,
          id,
          value,
          selected,
          label,
        };
      }
    });
    setRenderedItems(newItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, focusedItemId, idSeed, propValue, textValue]);

  useEffect(() => {
    if (propValue && renderedItems[propValue]) {
      setTextValue(renderedItems[propValue].label);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propValue]);

  focusControls.current = {
    focus: setFocusedItemId,
    focusNext: () => {
      const options = Object.values(renderedItems);
      const i = options.findIndex((el) => el.focused);
      const newIndex = (i + 1) % Object.values(renderedItems).length;
      setFocusedItemId(options[newIndex].id);
    },
    focusPrev: () => {
      const options = Object.values(renderedItems);
      const i = options.findIndex((el) => el.focused);
      const newIndex = i > 0 ? i - 1 : Object.values(renderedItems).length - 1;
      setFocusedItemId(options[newIndex].id);
    },
  };

  const contextValue: ComboBoxContext = {
    inputRef,
    selectedItemValue: propValue,
    onChange: propOnChange,
    focusedItemId,
    idSeed,
    textValue,
    renderedItems,
    focusControls,
  };

  return (
    <OpenStateProvider>
      <ComboBoxProvider value={contextValue}>
        <Input value={textValue} onChange={handleTextChange} {...textFieldProps} />
        <Popover triggerRef={inputRef}>
          <ListBox role="listbox" id={idSeed('listbox')} aria-labelledby={idSeed('input')}>
            {children}
          </ListBox>
        </Popover>
      </ComboBoxProvider>
    </OpenStateProvider>
  );
};

ComboBox.Item = Item;

export default ComboBox;
