import React, { useEffect, useRef } from 'react';

import { ListBox, ListBoxProps } from '../ListBox/ListBox';
import { ListBoxContext } from '../ListBox/ListBoxContext';
import { useOpenState } from '../utils/OpenStateProvider';
import Item from './Item';

interface Props extends ListBoxProps {
  triggerId: string;
}

const List: React.FC<Props> = ({ triggerId, children, ...props }) => {
  const isOpen = useOpenState();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const option = ref.current?.querySelector('[aria-selected="true"]') as HTMLDivElement;
      if (option) {
        option.focus?.();
      }
    }
  }, [isOpen]);

  return (
    <ListBox
      {...props}
      id={`${triggerId}-listbox`}
      aria-labelledby={triggerId}
      autoFocus
      restoreFocus
      contain
      wrap
      ref={ref}
    >
      <ListBoxContext ListItem={Item}>{children}</ListBoxContext>
    </ListBox>
  );
};

export default List;
