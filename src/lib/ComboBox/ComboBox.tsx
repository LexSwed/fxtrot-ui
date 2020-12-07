import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useUIDSeed, uid } from 'react-uid';
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
  const [renderedItems, setRenderedItems] = useState<ComboBoxContext['renderedItems']>({});

  const handleTextChange = useAllHandlers<string>(setTextValue, onInputChange);

  const inputRef = useRef<HTMLInputElement>(null);
  const idSeed = useUIDSeed();
  const [focusedItemId, focusControls] = useFocusControls(renderedItems);

  useEffect(() => {
    const newItems: ComboBoxContext['renderedItems'] = {};
    React.Children.forEach(children, (option: OptionType) => {
      const { label, value } = option.props || {};
      const selected = value === propValue;
      const id = uid(value);
      if (label.toLowerCase().includes(textValue.toLowerCase())) {
        newItems[value] = {
          id,
          value,
          selected,
          label,
        };
      }
    });
    setRenderedItems(newItems);
  }, [children, propValue, textValue]);

  const currentLabel = propValue !== undefined ? renderedItems[propValue]?.label : textValue;

  useEffect(() => {
    if (currentLabel) {
      setTextValue(currentLabel);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLabel]);

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

function useFocusControls(renderedItems: ComboBoxContext['renderedItems']) {
  const [focusedItemId, setFocusedItemId] = useState<string>();
  const items = useRef<ComboBoxContext['renderedItems']>(renderedItems);

  useEffect(() => {
    items.current = renderedItems;
  }, [renderedItems]);

  const focusControls = useMemo<FocusControls>(() => {
    return {
      focus: setFocusedItemId,
      focusNext: () =>
        setFocusedItemId((currentId) => {
          const options = Object.values(items.current);
          const i = options.findIndex((el) => el.id === currentId);
          const newIndex = (i + 1) % Object.values(items.current).length;
          return options[newIndex].id;
        }),
      focusPrev: () =>
        setFocusedItemId((currentId) => {
          const options = Object.values(items.current);
          const i = options.findIndex((el) => el.id === currentId);
          const newIndex = i > 0 ? i - 1 : Object.values(items.current).length - 1;
          return options[newIndex].id;
        }),
    };
  }, []);

  return [focusedItemId, focusControls] as const;
}
