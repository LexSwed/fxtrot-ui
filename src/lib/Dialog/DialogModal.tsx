import * as RdxDialog from '@radix-ui/react-dialog';

import { keyframes, styled } from '../stitches.config';
import type { CssStyles } from '..';
import { DialogClose } from './DialogClose';
import { useOpenState } from '../utils/OpenStateProvider';
import { Portal } from '../Portal';
import { Presence } from '../shared/Presence';
import { ComponentProps, forwardRef } from 'react';

export interface ModalProps extends ComponentProps<'div'> {
  hasCloseButton?: boolean;
  placement?: ComponentProps<typeof DialogWindow>['placement'];
  onOpenAutoFocus?: RdxDialog.DialogContentProps['onOpenAutoFocus'];
  onCloseAutoFocus?: RdxDialog.DialogContentProps['onCloseAutoFocus'];
  onEscapeKeyDown?: RdxDialog.DialogContentProps['onEscapeKeyDown'];
  onPointerDownOutside?: RdxDialog.DialogContentProps['onPointerDownOutside'];
  onInteractOutside?: RdxDialog.DialogContentProps['onInteractOutside'];
  css?: CssStyles & {
    overlay?: CssStyles;
  };
}

export const DialogModal = forwardRef<HTMLDivElement, ModalProps>(
  ({ children, hasCloseButton = true, placement = 'dialog', css, ...props }, ref) => {
    const open = useOpenState();
    return (
      <Presence present={open}>
        {({ ref: presenceRef }) => {
          return (
            <Portal radixPortal={RdxDialog.Portal} forceMount>
              <DialogModalContainer placement={placement}>
                <OverlayStyled css={css?.overlay} ref={presenceRef} />
                <DialogWindow placement={placement} {...props} css={css} ref={ref}>
                  {children}
                  {hasCloseButton && (
                    <CloseButtonContainer>
                      <DialogClose />
                    </CloseButtonContainer>
                  )}
                </DialogWindow>
              </DialogModalContainer>
            </Portal>
          );
        }}
      </Presence>
    );
  }
);

const CloseButtonContainer = styled('div', {
  position: 'absolute',
  insetBlockStart: '$2',
  insetInlineEnd: '$2',
});

const DialogModalContainer = styled('div', {
  position: 'fixed',
  inset: 0,
  overflowY: 'auto',
  zIndex: 'auto',
  variants: {
    placement: {
      side: {},
      dialog: {
        display: 'grid',
        placeItems: 'center',
      },
    },
  },
});

const DialogWindow = styled(RdxDialog.Content, {
  'bc': '$surface',
  'p': '$8',
  'outline': 'none',
  'pointerEvents': 'auto',
  'minWidth': 360,
  'boxShadow': '$popper',
  'position': 'relative',
  'animationTimingFunction': 'ease-in-out',
  'animationFillMode': 'forwards',
  '@no-motion': {
    animationDuration: '0s',
  },
  'variants': {
    placement: {
      side: {
        'borderTopLeftRadius': 0,
        'borderBottomLeftRadius': 0,
        'height': 'calc(100vh)',
        'maxWidth': '420px',
        'overflowY': 'overlay',
        '&[data-state="open"]': {
          animationDuration: '0.3s',
          animationName: `${keyframes({
            '0%': {
              opacity: 0,
              transform: 'translateX(-100%)',
            },
            '60%': {
              opacity: 1,
            },
            '100%': {
              opacity: 1,
              transform: 'none',
            },
          })}`,
        },
        '&[data-state="closed"]': {
          animationDuration: '0.2s',
          animationName: `${keyframes({
            from: {
              opacity: 1,
              transform: 'none',
            },
            to: {
              opacity: 0,
              transform: 'translateX(-100%)',
            },
          })}`,
        },
      },
      dialog: {
        'br': '$md',
        'mx': '$2',
        '@desktop': {
          maxWidth: '80vw',
        },
        '&[data-state="open"]': {
          animationDuration: '0.3s',
          animationName: `${keyframes({
            '0%': {
              opacity: 0,
              transform: 'translateY(10px)',
            },
            '60%': {
              opacity: 1,
            },
            '100%': {
              opacity: 1,
              transform: 'none',
            },
          })}`,
        },
        '&[data-state="closed"]': {
          animationDuration: '0.2s',
          animationName: `${keyframes({
            '0%': {
              opacity: 1,
              transform: 'none',
            },
            '100%': {
              opacity: 0,
              transform: 'translateY(10px)',
            },
          })}`,
        },
      },
    },
  },
});

const OverlayStyled = styled(RdxDialog.Overlay, {
  'backgroundColor': '$surface6',
  'position': 'fixed',
  'inset': 0,
  'animationTimingFunction': 'ease-in-out',
  'animationFillMode': 'forwards',
  'animationDuration': '0.2s',
  '&[data-state="open"]': {
    animationName: `${keyframes({
      from: { opacity: 0 },
      to: { opacity: 1 },
    })}`,
  },
  '&[data-state="closed"]': {
    animationDelay: '0.1s',
    animationName: `${keyframes({
      from: { opacity: 1 },
      to: { opacity: 0 },
    })}`,
  },
  '@no-motion': {
    animationDuration: '0s',
  },
});
