import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import flattenChildren from 'react-keyed-flatten-children';
import { useId } from '@radix-ui/react-id';

import { OpenStateProvider, useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';

import { ComboboxInput, Props as InputProps } from './Input';
import { Item, OptionType } from './Item';
import { useAllHandlers, useForkRef, useLatest } from '../utils/hooks';
import { PopoverLayerDeprecated } from '../Popover/LayerDeprectated';
import { StateProvider, useFocusedItemId, useSyncValue } from './atoms';
import { FloatingList } from '../shared/FloatingList';

interface Props
  extends Omit<
    InputProps,
    | 'onChange'
    | 'onSelect'
    | 'value'
    | 'children'
    | 'hasNewBadge'
    | 'onSelect'
    | 'onFocusNext'
    | 'onFocusPrev'
    | 'aria-controls'
  > {
  value?: string | null;
  onChange?: (newValue: string | null) => void;
  onInputChange?: (text: string) => void;
  children: OptionType[] | OptionType;
}

const ComboboxInner: React.FC<Props> = ({
  value: propValue,
  onChange: propOnChange,
  children,
  inputRef,
  onInputChange,
  ...textFieldProps
}) => {
  const triggerRef = useRef<HTMLInputElement>(null);
  const inputRefs = useForkRef(triggerRef, inputRef);
  // https://reactjs.org/docs/hooks-reference.html#useid
  const id = useId();
  const isOpen = useOpenState();
  const [value, setValue] = useSyncValue(propValue, propOnChange);
  const [filterText, setFilterText] = useState('');
  const [focusedItemId, setFocusedItemId] = useFocusedItemId();
  const { close } = useOpenStateControls();

  const allowNewElement = !!onInputChange;
  const listboxId = `${id}-listbox`;
  const inputId = `${id}-input`;

  const filteredItems = useFilteredItems(children, filterText);
  const itemMatchingFilterText = filteredItems.find((item) => item.props.label === filterText);
  const hasNewBadge = allowNewElement && !itemMatchingFilterText && !value && !!filterText;

  useUpdateTextWithLabel(value, children, setFilterText, allowNewElement);
  useOnInputChangeSync(onInputChange, filterText);

  const createOptionId = (value: string) => `${id}-option-${value}`;
  const handleSelect = () => {
    if (focusedItemId) {
      const selected = filteredItems.find((item) => createOptionId(item.props.value as string) === focusedItemId);
      if (selected) {
        setFilterText(selected.props.label || '');
        setValue(selected.props.value || null);
      }
    }
    close();
  };

  // useScrollToFocusedItemOnOpen
  useLayoutEffect(() => {
    if (isOpen) {
      const item = filteredItems.find((item) => createOptionId(item.props.value as string) === value);
      if (item) {
        document
          .getElementById(createOptionId(item.props.value as string))
          ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } else {
      setFocusedItemId(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleFocus = (createNewIndex: (oldIndex: number) => number) => {
    const itemIndex = focusedItemId
      ? filteredItems.findIndex((item) => createOptionId(item.props.value as string) === focusedItemId)
      : 0;
    const newIndex = itemIndex > -1 ? createNewIndex(itemIndex) : 0;
    const newFocusedItemId = createOptionId(filteredItems[newIndex]?.props?.value as string);
    setFocusedItemId(newFocusedItemId);
    // we don't do it in the useEffect with focusedItemId because we don't want to scroll when using mouse
    document.getElementById(newFocusedItemId)?.scrollIntoView({ block: 'nearest' });
  };
  const handleFocusNext = () => {
    handleFocus((index) => (index < filteredItems.length - 1 ? index + 1 : 0));
  };
  const handleFocusPrev = () => {
    handleFocus((index) => (index > 0 ? index - 1 : filteredItems.length - 1));
  };

  const handleBlur = useAllHandlers(
    textFieldProps.onBlur,
    allowNewElement
      ? () => {
          if (itemMatchingFilterText) {
            setValue(itemMatchingFilterText.props.value);
          }
        }
      : () => {
          if (filterText === '') {
            setValue(null);
          } else if (itemMatchingFilterText) {
            setValue(itemMatchingFilterText.props.value);
          } else {
            setValue(null);
            setFilterText('');
          }
        }
  );
  const handleFilterChange = (text: string) => {
    if (allowNewElement || text === '') {
      setValue(null);
    }
    setFilterText(text);
  };

  return (
    <>
      <ComboboxInput
        {...textFieldProps}
        aria-controls={isOpen ? listboxId : ''}
        aria-activedescendant={focusedItemId as string}
        inputRef={inputRefs}
        hasNewBadge={hasNewBadge}
        value={filterText}
        onChange={handleFilterChange}
        onBlur={handleBlur}
        onSelect={handleSelect}
        onFocusNext={handleFocusNext}
        onFocusPrev={handleFocusPrev}
      />
      <PopoverLayerDeprecated triggerRef={triggerRef}>
        <FloatingList id={listboxId} role="listbox" aria-labelledby={inputId}>
          {filteredItems.map((child, index) => {
            return React.cloneElement(child, {
              id: createOptionId(child.props.value as string),
              onMouseUp: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                setFilterText(child.props.label as string);
                setValue(child.props.value as string);
                close();

                child.props.onClick?.(e);
              },
            });
          })}
        </FloatingList>
      </PopoverLayerDeprecated>
    </>
  );
};

export const Combobox = (props: Props) => {
  return (
    <OpenStateProvider>
      <StateProvider>
        <ComboboxInner {...props} />
      </StateProvider>
    </OpenStateProvider>
  );
};

Combobox.Item = Item;

function useFilteredItems(children: Props['children'], filterText: string) {
  const items = flattenChildren(children) as OptionType[];
  if (filterText === '') return items;

  return items.filter((child) => {
    return (child.props.label as string).toLowerCase().includes(filterText.toLowerCase());
  });
}

function useOnInputChangeSync(onInputChange: Props['onInputChange'], filterText: string) {
  const onInputChangeRef = useLatest(onInputChange);

  useEffect(() => {
    onInputChangeRef.current?.(filterText);
  }, [filterText, onInputChangeRef]);
}

function useUpdateTextWithLabel(
  value: Props['value'],
  children: Props['children'],
  setFilterText: React.Dispatch<React.SetStateAction<string>>,
  allowNewElement: boolean
) {
  useEffect(() => {
    const items = flattenChildren(children) as OptionType[];
    const item = items.find((item) => item.props.value === value);
    setFilterText((text) => item?.props?.label || (allowNewElement ? text : ''));
  }, [value, children, setFilterText, allowNewElement]);
}
