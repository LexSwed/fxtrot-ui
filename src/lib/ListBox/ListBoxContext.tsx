import React, { createContext, useContext, useMemo } from 'react';

export interface ListBoxContextValue {
  ListItem: React.ElementType;
}

const context = createContext<ListBoxContextValue>({
  ListItem: () => null,
});

export const ListBoxContext: React.FC<ListBoxContextValue> = ({ children, ListItem }) => {
  const value = useMemo(() => ({ ListItem }), [ListItem]);

  return <context.Provider value={value}>{children}</context.Provider>;
};

export function useListBoxContext() {
  return useContext(context);
}
