import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useUIDSeed, uid } from 'react-uid';
import Popover from '../Popover';
import { useAllHandlers } from '../utils';
import { useOpenState, withOpenStateProvider } from '../utils/OpenStateProvider';
import Item from './Item';
import { List as ListBox } from '../ListBox/ListBox';

import { ComboBoxProvider, ComboBoxContext, FocusControls, RenderedItems } from './utils';
import Input from './Input';

interface OptionType extends React.ReactElement<React.ComponentProps<typeof Item>, typeof Item> {}
interface Props extends Omit<React.ComponentProps<typeof Input>, 'onChange' | 'value' | 'children'> {
  value?: string;
  onChange?: (newValue: string | undefined | null) => void;
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
  const [textValue, setTextValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const idSeed = useUIDSeed();
  const isOpen = useOpenState();

  const allItems = useMemo<RenderedItems>(() => {
    let items: RenderedItems = {};
    React.Children.forEach(children, (option: OptionType) => {
      const { label, value } = option.props || {};
      const id = uid(idSeed('option') + value);
      const selected = value === propValue;
      items[value] = {
        id,
        value,
        selected,
        label,
      };
    });
    return items;
  }, [children, idSeed, propValue]);

  const [renderedItems, setRenderedItems] = useState<RenderedItems>(allItems);

  useEffect(() => {
    if (!isOpen) return;
    if (textValue === '') return setRenderedItems(allItems);
    setRenderedItems(
      Object.fromEntries(
        Object.entries(allItems).filter(([value, { label }]) => label.toLowerCase().includes(textValue.toLowerCase()))
      )
    );
  }, [allItems, textValue, isOpen]);

  const [focusedItemId, focusControls] = useFocusControls(renderedItems);

  useEffect(() => {
    if (!propValue) return;
    const label = allItems[propValue]?.label;
    if (label) {
      setTextValue(label);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propValue]);

  useEffect(() => {
    if (isOpen && propValue) {
      focusControls.focus(allItems[propValue]?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleValueChange = useAllHandlers((newValue?: string, newText?: string) => {
    console.log({ newValue, newText });
    propOnChange?.(newValue);
    setTextValue(newText || '');
    onInputChange?.(newText || '');
  });

  const handleTextChange = useAllHandlers<string>((textValue) => {
    if (textValue === '') {
      propOnChange?.(null);
    }
    setTextValue(textValue);
  }, onInputChange);

  const handleBlur = useAllHandlers(
    textFieldProps.onBlur,
    onInputChange
      ? undefined
      : () => {
          if (textValue === '') {
            propOnChange?.(null);
          } else if (propValue) {
            setTextValue(allItems[propValue]?.label);
          } else {
            setTextValue('');
          }
        }
  );

  const handleSelect = useAllHandlers<void>(() => {
    const newValue = Object.keys(allItems).find((key) => allItems[key].id === focusedItemId);
    if (newValue) {
      handleValueChange(newValue, allItems[newValue].label);
    }
  });

  const contextValue: ComboBoxContext = {
    inputRef,
    selectedItemValue: propValue,
    onValueChange: handleValueChange,
    focusedItemId,
    renderedItems,
    focusControls,
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
      <Input
        {...textFieldProps}
        aria-controls={idSeed('listbox')}
        value={textValue}
        onChange={handleTextChange}
        onBlur={handleBlur}
        onSelect={handleSelect}
      />
      {popover}
    </ComboBoxProvider>
  );
};

const ComboBox = withOpenStateProvider<Props>(ComboBoxInner) as React.FC<Props> & { Item: typeof Item };

ComboBox.Item = Item;

export default ComboBox;

function useFocusControls(renderedItems: RenderedItems) {
  const [focusedItemId, setFocusedItemId] = useState<string>();
  const itemsRef = useRef(renderedItems);

  useEffect(() => {
    itemsRef.current = renderedItems;
  }, [renderedItems]);

  const focusControls = useMemo<FocusControls>(() => {
    return {
      focus: setFocusedItemId,
      focusNext: () =>
        setFocusedItemId((currentId) => {
          const options = Object.values(itemsRef.current || {});
          if (!options.length) return undefined;
          const i = options.findIndex((el) => el.id === currentId);
          const newIndex = (i + 1) % options.length;
          return options[newIndex].id;
        }),
      focusPrev: () =>
        setFocusedItemId((currentId) => {
          const options = Object.values(itemsRef.current || {});
          if (!options.length) return undefined;
          const i = options.findIndex((el) => el.id === currentId);
          const newIndex = i > 0 ? i - 1 : options.length - 1;
          return options[newIndex].id;
        }),
    };
  }, [itemsRef]);

  return [focusedItemId, focusControls] as const;
}
