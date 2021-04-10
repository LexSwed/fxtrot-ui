import React, { createContext, useContext, useMemo } from 'react';
import Item, { ItemComponent } from '../Item/Item';

export interface ListBoxContextValue {
  ListItem: ItemComponent;
}

const context = createContext<ListBoxContextValue>({
  ListItem: Item,
});

export const ListBoxContext: React.FC<ListBoxContextValue> = ({ children, ListItem }) => {
  const value = useMemo(() => ({ ListItem }), [ListItem]);

  return <context.Provider value={value}>{children}</context.Provider>;
};

export function useListBoxContext() {
  return useContext(context);
}
