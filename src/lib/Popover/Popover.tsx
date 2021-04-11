import { FocusScope } from '@react-aria/focus';
import React, { useContext, useMemo, useRef } from 'react';
import { useUID } from 'react-uid';
import Box from '../Box';
import { useAllHandlers, useForkRef, useKeyboardHandles } from '../utils/hooks';
import { OpenStateProvider, OpenStateRef, useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';
import PopoverLayer from './PopoverLayer';
interface Props {
  children: [React.ReactElement, React.ReactElement<ContentProps>];
}

const PopoverInner = ({ children }: Props) => {
  const open = useOpenState();
  const { toggle } = useOpenStateControls();
  const { id, triggerRef } = useContext(context);
  const [trigger, content] = children;

  const refs = useForkRef(triggerRef, (trigger as any).ref);
  const onClick = useAllHandlers(trigger.props.onClick, toggle);

  return (
    <>
      {React.cloneElement(trigger, {
        'ref': refs,
        'aria-haspopup': 'dialog',
        'aria-expanded': open,
        'aria-controls': open ? id : undefined,
        onClick,
      })}
      {content}
    </>
  );
};
const Popover = React.forwardRef((props, ref) => {
  const id = useUID();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const value = useMemo(() => ({ id, triggerRef }), [id, triggerRef]);

  return (
    <OpenStateProvider ref={ref}>
      <context.Provider value={value}>
        <PopoverInner {...props} />
      </context.Provider>
    </OpenStateProvider>
  );
}) as React.ForwardRefExoticComponent<Props & React.RefAttributes<OpenStateRef>> & {
  Content: typeof Content;
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
Popover.Content = Content;

export default Popover;

const context = React.createContext<{ id: string; triggerRef: React.RefObject<HTMLButtonElement> }>({
  id: '',
  triggerRef: {
    current: null,
  },
});
