import { FocusManagerOptions, FocusScope, useFocusManager } from '@react-aria/focus';
import React from 'react';
import { styled } from '../stitches.config';
import { useKeyboardHandles } from '../utils';

const List = styled('ul', {
  m: 0,
  p: '$1',
  overflowY: 'auto',
  maxHeight: '240px',
});

const focusOptions: FocusManagerOptions = { wrap: true };

const ListInner: React.FC = (props) => {
  const { focusNext, focusPrevious } = useFocusManager();

  const handleKeyDown = useKeyboardHandles({
    ArrowDown: () => focusNext(focusOptions),
    ArrowUp: () => focusPrevious(focusOptions),
  });

  return <div onKeyDown={handleKeyDown} {...props} />;
};

ListInner.displayName = 'ListBox.Inner';

const ListBox = React.forwardRef<
  HTMLUListElement,
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>
>(({ children, ...props }, ref) => {
  return (
    <List role="listbox" tabIndex={-1} {...props} as="ul" ref={ref}>
      <FocusScope contain restoreFocus>
        <ListInner>{children}</ListInner>
      </FocusScope>
    </List>
  );
});

ListInner.displayName = 'ListBox';

export default ListBox;
