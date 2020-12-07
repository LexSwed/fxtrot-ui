import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useUIDSeed, uid } from 'react-uid';
import Popover from '../Popover';
import { useAllHandlers } from '../utils';
import { OpenStateProvider } from '../utils/OpenStateProvider';
import Item from './Item';
import { List as ListBox } from '../ListBox/ListBox';

import { ComboBoxProvider, ComboBoxContext, FocusControls, RenderedItems } from './utils';
import Input from './Input';

interface OptionType extends React.ReactElement<React.ComponentProps<typeof Item>, typeof Item> {}
type Props = Omit<React.ComponentProps<typeof Input>, 'onChange'> & {
  value?: string;
  onChange?: (newValue: string | undefined | null) => void;
  onInputChange?: (text: string) => void;
  children: OptionType[] | OptionType;
};

const ComboBox: React.FC<Props> & { Item: typeof Item } = ({
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

  const renderedItems = useMemo<RenderedItems>(() => {
    let items: RenderedItems = {};
    React.Children.forEach(children, (option: OptionType) => {
      const { label, value } = option.props || {};
      const id = uid(idSeed('option') + value);
      const selected = value === propValue;
      if (textValue === '' || label.toLowerCase().includes(textValue.toLowerCase())) {
        items[value] = {
          id,
          value,
          selected,
          label,
        };
      }
    });
    return items;
  }, [children, idSeed, propValue, textValue]);

  const [focusedItemId, focusControls] = useFocusControls(renderedItems);

  useEffect(() => {
    if (!propValue) return;
    const label = renderedItems[propValue]?.label;
    if (label) {
      setTextValue(label);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propValue]);

  const contextValue: ComboBoxContext = {
    inputRef,
    selectedItemValue: propValue,
    onChange: propOnChange,
    focusedItemId,
    renderedItems,
    focusControls,
  };

  const handleTextChange = useAllHandlers<string>(setTextValue, onInputChange);
  const handleBlur = useAllHandlers(
    textFieldProps.onBlur,
    onInputChange
      ? undefined
      : () => {
          if (textValue === '') {
            propOnChange?.(null);
          } else if (propValue) {
            setTextValue(renderedItems[propValue]?.label);
          } else {
            setTextValue('');
          }
        }
  );

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
    <OpenStateProvider>
      <ComboBoxProvider value={contextValue}>
        <Input
          {...textFieldProps}
          aria-controls={idSeed('listbox')}
          value={textValue}
          onChange={handleTextChange}
          onBlur={handleBlur}
        />
        {popover}
      </ComboBoxProvider>
    </OpenStateProvider>
  );
};

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
          const i = options.findIndex((el) => el.id === currentId);
          const newIndex = (i + 1) % options.length;
          return options[newIndex].id;
        }),
      focusPrev: () =>
        setFocusedItemId((currentId) => {
          const options = Object.values(itemsRef.current || {});
          const i = options.findIndex((el) => el.id === currentId);
          const newIndex = i > 0 ? i - 1 : options.length - 1;
          return options[newIndex].id;
        }),
    };
  }, [itemsRef]);

  return [focusedItemId, focusControls] as const;
}
