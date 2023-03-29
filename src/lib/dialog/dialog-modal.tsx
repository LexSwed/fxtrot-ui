import * as RdxDialog from '@radix-ui/react-dialog';

import { type ComponentProps, forwardRef } from 'react';
import { classed as css, type VariantProps } from '@tw-classed/core';
import { useOpenState } from '../utils/OpenStateProvider';
import { Portal } from '../portal';
import { Presence } from '../shared/presence';
import { DialogClose } from './dialog-close';

import styles from './dialog.module.css';

interface ModalProps extends ComponentProps<'div'> {
  hasCloseButton?: boolean;
  placement?: VariantProps<typeof containerCss>['placement'];
  onOpenAutoFocus?: RdxDialog.DialogContentProps['onOpenAutoFocus'];
  onCloseAutoFocus?: RdxDialog.DialogContentProps['onCloseAutoFocus'];
  onEscapeKeyDown?: RdxDialog.DialogContentProps['onEscapeKeyDown'];
  onPointerDownOutside?: RdxDialog.DialogContentProps['onPointerDownOutside'];
  onInteractOutside?: RdxDialog.DialogContentProps['onInteractOutside'];
}

export const DialogModal = forwardRef<HTMLDivElement, ModalProps>(
  ({ children, hasCloseButton = true, placement = 'dialog', ...props }, ref) => {
    const open = useOpenState();
    return (
      <Presence present={open}>
        {({ ref: presenceRef }) => {
          return (
            <Portal radixPortal={RdxDialog.Portal} forceMount>
              <div className={containerCss({ placement })}>
                <RdxDialog.Overlay className={styles.overlay} ref={presenceRef} />
                <RdxDialog.Content {...props} className={windowCss({ placement, class: props.className })} ref={ref}>
                  {children}
                  {hasCloseButton && (
                    <div className={styles['dialog-close']}>
                      <DialogClose />
                    </div>
                  )}
                </RdxDialog.Content>
              </div>
            </Portal>
          );
        }}
      </Presence>
    );
  }
);

const containerCss = css(styles.overlay, {
  variants: {
    placement: {
      dialog: styles['dialog--full'],
      side: '',
    },
  },
});

const windowCss = css(styles.content, {
  variants: {
    placement: {
      dialog: styles['content--dialog'],
      side: styles['content--side'],
    },
  },
});
