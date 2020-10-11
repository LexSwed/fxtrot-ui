import { FocusManagerOptions, FocusScope, useFocusManager } from '@react-aria/focus';
import React from 'react';
import { styled } from '../stitches.config';
import { useAllHandlers, useKeyboardHandles } from '../utils';

const List = styled('ul', {
  m: 0,
  overflowY: 'auto',
  bc: '$surfaceStill',
  br: '$md',
  border: '1px solid $gray200',
  outline: 'none',
  p: '$1',
});

const focusOptions: FocusManagerOptions = { wrap: true };

const ListInner = React.forwardRef<HTMLUListElement, React.ComponentProps<typeof List>>((props, ref) => {
  const { focusNext, focusPrevious } = useFocusManager();

  const handleKeyDown = useKeyboardHandles({
    ArrowDown: () => focusNext(focusOptions),
    ArrowUp: () => focusPrevious(focusOptions),
  });

  return (
    <List role="listbox" {...props} onKeyDown={useAllHandlers(props.onKeyDown, handleKeyDown)} as="ul" ref={ref} />
  );
});

ListInner.displayName = 'ListBox.Inner';

const ListBox = React.forwardRef<HTMLUListElement, React.ComponentProps<typeof ListInner>>(
  ({ children, ...props }, ref) => {
    return (
      <FocusScope contain restoreFocus>
        <ListInner {...props} ref={ref}>
          {children}
        </ListInner>
      </FocusScope>
    );
  }
);

ListInner.displayName = 'ListBox';

export default ListBox;
