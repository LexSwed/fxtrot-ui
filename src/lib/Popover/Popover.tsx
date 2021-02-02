import { FocusScope } from '@react-aria/focus';
import React, { useContext, useMemo, useRef } from 'react';
import { useUID } from 'react-uid';
import Button from '../Button';
import Box from '../Box';
import { useAllHandlers, useKeyboardHandles } from '../utils/hooks';
import { OpenStateProvider, useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';
import PopoverLayer from './PopoverLayer';

const Popover: React.FC<Props> & { Trigger: typeof Trigger; Content: typeof Content } = ({ children }) => {
  const id = useUID();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const value = useMemo(() => ({ id, triggerRef }), [id, triggerRef]);

  return (
    <context.Provider value={value}>
      <OpenStateProvider>{children}</OpenStateProvider>
    </context.Provider>
  );
};

const Trigger: React.FC<React.ComponentProps<typeof Button>> = (props) => {
  const open = useOpenState();
  const { toggle } = useOpenStateControls();
  const { id, triggerRef } = useContext(context);
  return (
    <Button
      {...props}
      ref={triggerRef}
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-controls={id}
      onClick={useAllHandlers(props.onClick, toggle)}
    />
  );
};

interface ContentProps extends Omit<React.ComponentProps<typeof PopoverLayer>, 'triggerRef'> {}
const Content: React.FC<ContentProps> = ({ children, ...props }) => {
  const { id, triggerRef } = useContext(context);
  const { close } = useOpenStateControls();
  const handleKeyDown = useKeyboardHandles({
    Esc: close,
  });
  const onKeyDown = useAllHandlers(props.onKeyDown, handleKeyDown);
  return (
    <PopoverLayer
      id={id}
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
      {...props}
      triggerRef={triggerRef}
      onKeyDown={onKeyDown}
    >
      <FocusScope contain restoreFocus autoFocus>
        <Box p="$4">{children}</Box>
      </FocusScope>
    </PopoverLayer>
  );
};

Popover.Trigger = Trigger;

Popover.Content = Content;

export default Popover;

interface Props {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const context = React.createContext<{ id: string; triggerRef: React.RefObject<HTMLButtonElement> }>({
  id: '',
  triggerRef: {
    current: null,
  },
});
