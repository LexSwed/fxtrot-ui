import { createContext, useCallback, useContext, useEffect } from 'react';
import { atomWithReducer, useAtomValue, useSelector, useUpdateAtom } from 'jotai/utils';
import { atom, useAtom } from 'jotai';

export interface FocusControls {
  focus: (newId: string) => void;
  focusNext: () => void;
  focusPrev: () => void;
}

export interface RenderedItems {
  [value: string]: {
    id: string;
    value: string;
    label: string;
    selected: boolean;
  };
}

export interface ComboBoxContext {
  onValueChange: (newValue: string | undefined | null, newLabel: string | undefined | null) => void;
  allowNewElement: boolean;
}

const context = createContext<ComboBoxContext>({
  onValueChange: () => {},
  allowNewElement: false,
});

export const ComboBoxProvider = context.Provider;

export const useComboBox = () => useContext(context);

interface OptionsItems {
  [Value: string]: {
    id: string;
    value: string;
    selected: boolean;
    label: string;
  };
}

interface AtomState {
  items: OptionsItems;
  focusedItemId?: string;
  filterText: string;
  innerValue: string | null;
}

type AtomReducerAction =
  | {
      type: 'update_items';
      items: AtomState['items'];
    }
  | {
      type: 'focus';
      newId: string;
    }
  | {
      type: 'focus_next';
      listboxId: string;
    }
  | {
      type: 'focus_prev';
      listboxId: string;
    }
  | {
      type: 'filter';
      text: string;
    }
  | {
      type: 'focus_selected';
      value?: string;
    }
  | {
      type: 'update_value';
      newValue: string | null;
    };

const initialState: AtomState = {
  filterText: '',
  items: {},
  focusedItemId: undefined,
  innerValue: null,
};

export const comboboxState = atomWithReducer<AtomState, AtomReducerAction>(initialState, (state, action) => {
  switch (action?.type) {
    case 'update_items': {
      return {
        ...state,
        items: action.items,
      };
    }
    case 'filter': {
      return {
        ...state,
        filterText: action.text,
      };
    }
    case 'focus': {
      return {
        ...state,
        focusedItemId: action.newId,
      };
    }
    case 'focus_next': {
      const options = Object.values(state.items || {});
      if (!options.length) return state;
      const i = options.findIndex((opt) => opt.id === state.focusedItemId);
      const newIndex = (i + 1) % options.length;
      return {
        ...state,
        focusedItemId: options[newIndex].id || undefined,
      };
    }
    case 'focus_prev': {
      const options = Object.values(state.items || {});
      if (!options.length) return state;
      const i = options.findIndex((opt) => opt.id === state.focusedItemId);
      const newIndex = i > 0 ? i - 1 : options.length - 1;
      return {
        ...state,
        focusedItemId: options[newIndex].id || undefined,
      };
    }
    case 'focus_selected': {
      return {
        ...state,
        focusedItemId: selectSelectedItem(state)?.id,
      };
    }
    case 'update_value': {
      return {
        ...state,
        innerValue: action.newValue,
      };
    }
    default:
      return state;
  }
});
const filteredItems = atom((get) => {
  const { filterText, items } = get(comboboxState);
  const filtered = Object.entries(items).filter(([value, item]) =>
    item?.label.toLowerCase().includes(filterText.toLowerCase())
  );

  return Object.fromEntries(filtered);
});

const selectFocusedId = (state: AtomState) => state.focusedItemId;
const selectValue = (state: AtomState) => state.innerValue;
const selectSelectedItem = (state: AtomState) => (state.innerValue ? state.items[state.innerValue] : null);
export const useFocusedItemId = () => useSelector(comboboxState, selectFocusedId);
export const useUpdateCombobox = () => useUpdateAtom(comboboxState);
export const useSelectedItem = () => useSelector(comboboxState, selectSelectedItem);
export const useComboBoxAtom = () => useAtom(comboboxState);
export const useComboBoxValue = () => useSelector(comboboxState, selectValue);
export const useComboBoxValueAndChange = (propValue?: string | null, onChange?: (newValue: string | null) => void) => {
  const value = useComboBoxValue();
  const dispatch = useUpdateCombobox();

  const handleChange = useCallback(
    (newValue: string | null) => {
      // we expect `propOnChange` to change also `value` prop, so useEffect would update internal value
      if (typeof onChange === 'function') {
        onChange(newValue);
      } else {
        dispatch({
          type: 'update_value',
          newValue,
        });
      }
    },
    [dispatch, onChange]
  );

  useEffect(() => {
    dispatch({
      type: 'update_value',
      newValue: propValue || null,
    });
  }, [dispatch, propValue]);

  return [value, handleChange] as const;
};

export const useItem = (value: string) => {
  return useAtomValue(filteredItems)[value];
};
export const useIsItemFocused = (value: string | null): boolean => {
  return useSelector(
    comboboxState,
    useCallback((state) => (value ? state.items[value]?.id === state.focusedItemId : false), [value])
  );
};
