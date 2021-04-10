import React, { useEffect, useRef } from 'react';
import { FocusScope, useFocusManager } from '@react-aria/focus';

import { styled } from '../stitches.config';
import { useKeyboardHandles } from '../utils/hooks';

export const List = styled('ul', {
  'm': 0,
  'p': '$1',
  'overflowY': 'auto',
  'maxHeight': '240px',
  '$outline': -1,
  '&:empty': {
    display: 'none',
  },
});

const ListInner: React.FC<{ wrap?: boolean }> = ({ wrap, ...props }) => {
  const { focusNext, focusPrevious } = useFocusManager();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /**
     * FocusScope is fun: it filters out tabIndex=-1 elements, but allows to focusNext/Prev between them
     * It is still handy though to not write own wrapping logic
     */
    (ref.current?.querySelector('[tabindex="-1"]') as HTMLElement)?.focus?.();
  }, []);

  const handleKeyDown = useKeyboardHandles({
    ArrowDown: () => focusNext({ wrap }),
    ArrowUp: () => focusPrevious({ wrap }),
  });

  return <div onKeyDown={handleKeyDown} {...props} ref={ref} />;
};

ListInner.displayName = 'ListBox.Inner';

export interface ListBoxProps extends React.ComponentProps<typeof List> {
  restoreFocus?: boolean;
  contain?: boolean;
  wrap?: boolean;
}

const ListBox = React.forwardRef<HTMLUListElement, ListBoxProps>(
  ({ children, restoreFocus, contain, wrap, ...props }, ref) => {
    if (React.Children.count(children) === 0) {
      return <List role="listbox" tabIndex={-1} {...props} as="ul" ref={ref} />;
    }
    return (
      <List role="listbox" tabIndex={-1} {...props} as="ul" ref={ref}>
        <FocusScope contain={contain} restoreFocus={restoreFocus}>
          <ListInner wrap={wrap}>{children}</ListInner>
        </FocusScope>
      </List>
    );
  }
);

ListInner.displayName = 'ListBox';

export default ListBox;
