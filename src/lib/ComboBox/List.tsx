import React, { useEffect, useRef } from 'react';
import ListBox from '../ListBox';
import { useComboBox } from './utils';

type Props = {
  triggerId: string;
} & React.ComponentProps<typeof ListBox>;

const List: React.FC<Props> = ({ triggerId, children, ...props }) => {
  const { value } = useComboBox();
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // selected value is already focused
    if (ref.current?.contains(document.activeElement)) {
      return;
    }

    // focus selected item
    // const option = ref.current?.querySelector('[role="option"]') as HTMLLIElement;

    // if (option) {
    //   option?.focus?.();
    // } else {
    //   ref.current?.focus();
    // }
  }, [value]);

  return (
    <ListBox {...props} id={`${triggerId}-listbox`} aria-labelledby={triggerId} ref={ref}>
      {children}
    </ListBox>
  );
};

export default List;
