import { FocusScope } from '@react-aria/focus';
import React, { useContext, useMemo, useRef } from 'react';
import { useUID } from 'react-uid';
import Button from '../Button';
import Box from '../Box';
import { useAllHandlers, useKeyboardHandles } from '../utils/hooks';
import { OpenStateProvider, useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';
import PopoverLayer from './PopoverLayer';

interface Ref {
  open: () => void;
  close: () => void;
  toggle: () => void;
}
interface Props {
  children: React.ReactNode;
}
const Popover = React.forwardRef<Ref, Props>(({ children }, ref) => {
  const id = useUID();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const value = useMemo(() => ({ id, triggerRef }), [id, triggerRef]);

  return (
    <OpenStateProvider ref={ref}>
      <context.Provider value={value}>{children}</context.Provider>
    </OpenStateProvider>
  );
}) as React.ForwardRefExoticComponent<Props & React.RefAttributes<Ref>> & {
  Trigger: typeof Trigger;
  Content: typeof Content;
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

Popover.displayName = 'Popover';
Popover.Trigger = Trigger;
Popover.Content = Content;

export default Popover;

const context = React.createContext<{ id: string; triggerRef: React.RefObject<HTMLButtonElement> }>({
  id: '',
  triggerRef: {
    current: null,
  },
});
