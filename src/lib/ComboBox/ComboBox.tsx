import React, { useCallback,useEffect, useMemo, useRef, useState } from 'react';
import { uid,useUIDSeed } from 'react-uid';

import { List as ListBox } from '../ListBox/ListBox';
import Popover from '../Popover';
import { useAllHandlers } from '../utils';
import { useOpenState, withOpenStateProvider } from '../utils/OpenStateProvider';
import Input from './Input';
import Item from './Item';
import { ComboBoxContext, ComboBoxProvider, FocusControls, RenderedItems } from './utils';

interface OptionType extends React.ReactElement<React.ComponentProps<typeof Item>, typeof Item> {}
interface Props extends Omit<React.ComponentProps<typeof Input>, 'onChange' | 'onSelect' | 'value' | 'children'> {
  value?: string | null;
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
  const [innerValue, onChange] = useValue(propValue, propOnChange);
  const [textValue, setTextValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const idSeed = useUIDSeed();
  const isOpen = useOpenState();
  const allowNewElement = !!onInputChange;

  const allItems = useMemo<RenderedItems>(() => {
    let items: RenderedItems = {};
    React.Children.forEach(children, (option: OptionType) => {
      const { label, value } = option.props || {};
      const id = uid(idSeed('option') + value);
      const selected = value === innerValue;
      items[value] = {
        id,
        value,
        selected,
        label,
      };
    });
    return items;
  }, [children, idSeed, innerValue]);

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
    if (!innerValue) return;
    const label = allItems[innerValue]?.label;
    if (label) {
      setTextValue(label);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [innerValue]);

  useEffect(() => {
    if (isOpen && innerValue) {
      focusControls.focus(allItems[innerValue]?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleValueChange = useAllHandlers((newValue?: string, newText?: string) => {
    onChange(newValue);
    setTextValue(newText || '');
    onInputChange?.(newText || '');
  });

  const handleTextChange = useAllHandlers<string>((textValue) => {
    if (allowNewElement || textValue === '') {
      onChange(null);
    }
    setTextValue(textValue);
  }, onInputChange);

  const handleBlur = useAllHandlers(
    textFieldProps.onBlur,
    allowNewElement
      ? undefined
      : () => {
        if (textValue === '') {
          onChange(null);
        } else if (innerValue) {
          setTextValue(allItems[innerValue]?.label);
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
    selectedItemValue: innerValue,
    onValueChange: handleValueChange,
    focusedItemId,
    renderedItems,
    focusControls,
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
