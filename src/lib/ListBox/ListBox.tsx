import React, { useEffect, useRef } from 'react';
import { FocusScope, useFocusManager } from '@react-aria/focus';

import { useKeyboardHandles } from '../utils/hooks';
import { FloatingList } from './FloatingList';

export interface ListBoxProps extends Omit<Props, 'autoFocus' | 'restoreFocus' | 'contain' | 'wrap'> {}
interface Props extends React.ComponentProps<typeof FloatingList> {
  autoFocus?: boolean;
  restoreFocus?: boolean;
  contain?: boolean;
  wrap?: boolean;
}

export const ListBox = React.forwardRef<HTMLDivElement, Props>(
  ({ children, autoFocus, restoreFocus, contain, wrap, ...props }, ref) => {
    if (React.Children.count(children) === 0) {
      return <FloatingList role="listbox" tabIndex={-1} {...props} ref={ref} />;
    }
    return (
      <FloatingList role="listbox" tabIndex={-1} {...props} ref={ref}>
        <FocusScope autoFocus={autoFocus} contain={contain} restoreFocus={restoreFocus}>
          <ListInner wrap={wrap} autoFocus={autoFocus}>
            {children}
          </ListInner>
        </FocusScope>
      </FloatingList>
    );
  }
);

ListBox.displayName = 'ListBox';

const ListInner: React.FC<{ wrap?: boolean; autoFocus?: boolean }> = ({ wrap, autoFocus, ...props }) => {
  const { focusNext, focusPrevious } = useFocusManager();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /**
     * FocusScope is fun: it filters out tabIndex=-1 elements, but allows to focusNext/Prev between them
     * It is still handy though to not write own wrapping logic
     */
    if (autoFocus) {
      (ref.current?.querySelector('[tabindex="-1"]') as HTMLElement)?.focus?.();
    }
  }, [autoFocus]);

  const handleKeyDown = useKeyboardHandles({
    ArrowDown: () => focusNext({ wrap }),
    ArrowUp: () => focusPrevious({ wrap }),
  });

  return <div onKeyDown={handleKeyDown} {...props} ref={ref} />;
};

ListInner.displayName = 'ListBox.Inner';
