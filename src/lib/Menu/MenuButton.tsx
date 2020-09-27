import React, { useMemo } from 'react';
import Button from '../Button';
import { useAllHandlers, useForkRef, useKeyboardHandles } from '../utils';
import { useMenu, useMenuControlState, useMenuOpenState } from './utils';

type ButtonProps = React.ComponentProps<typeof Button>;

const MenuButton = React.forwardRef<HTMLButtonElement, ButtonProps>((buttonProps, propsRef) => {
  const { ref, ...props } = useTriggerProps(buttonProps);
  const refs = useForkRef(ref, propsRef);

  return <Button {...props} ref={refs} />;
});

export default MenuButton;

function useTriggerProps(props: ButtonProps) {
  const isOpen = useMenuOpenState();
  const { open, toggle, update } = useMenuControlState();
  const { seed, triggerRef } = useMenu();
  const onPress = useAllHandlers(props.onPress, toggle);

  const handleKeyDown = useKeyboardHandles(
    useMemo(
      () => ({
        ArrowDown: () => {
          open();
          update({ lastKey: 'ArrowDown' });
        },
        ArrowUp: () => {
          open();
          update({ lastKey: 'ArrowUp' });
        },
      }),
      [open, update]
    )
  );

  const onKeyDown = useAllHandlers(props.onKeyDown, handleKeyDown);

  return {
    ...props,
    onPress,
    onKeyDown,
    'id': seed('button'),
    'aria-expanded': isOpen,
    'aria-haspopup': true,
    'aria-controls': isOpen ? seed('menu') : null,
    'ref': triggerRef as React.Ref<HTMLButtonElement>,
  };
}
