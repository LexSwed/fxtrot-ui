import React, { useMemo, useEffect } from 'react';
import Portal from '../Portal';
import { useMenu } from './utils';
import { useAllHandlers, useOnClickOutside, useForkRef, useKeyboardHandles, usePopper, sameWidth } from '../utils';
import { styled } from '../stitches.config';
import type { Options } from '@popperjs/core';
import ListBox from '../ListBox/ListBox';
import { useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';

const List = styled(ListBox, {
  boxShadow: '$xl',
  maxHeight: '240px',
});

type UlListProps = React.ComponentProps<typeof List>;
type Props = UlListProps & {
  offset?: number;
  placement?: Options['placement'];
};

const UlList: React.FC<Props> = ({ placement = 'bottom-start', offset = 8, ...props }) => {
  const { triggerRef, popoverRef, seed } = useMenu();
  const { close } = useOpenStateControls();
  const popperRef = usePopper(
    triggerRef,
    useMemo<Options>(
      () => ({
        placement,
        strategy: 'fixed',
        modifiers: [{ name: 'offset', options: { offset: [0, offset] } }, sameWidth],
      }),
      [placement, offset]
    )
  );

  useOnClickOutside(close, popoverRef, triggerRef);

  useEffect(() => {
    const option = popoverRef.current?.querySelector('[role="menuitem"]');

    if (option) {
      (option as HTMLLIElement | undefined)?.focus?.();
    } else {
      popoverRef.current?.focus();
    }
  }, [popoverRef]);

  const handleKeyDown = useKeyboardHandles(
    useMemo(
      () => ({
        Escape: close,
        Tab: close,
      }),
      [close]
    )
  );

  const onKeyDown = useAllHandlers(props.onKeyDown, handleKeyDown);

  const ref = useForkRef(popperRef, popoverRef);

  return (
    <List {...props} role={'menu'} id={seed('menu')} aria-labelledby={seed('button')} ref={ref} onKeyDown={onKeyDown} />
  );
};

const MenuList: React.FC<Props> = (props) => {
  const isOpen = useOpenState();

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <UlList {...props} />
    </Portal>
  );
};

export default MenuList;
