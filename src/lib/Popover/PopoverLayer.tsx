import React from 'react';
import { AnimatePresence } from 'framer-motion';
import type { PopoverContentProps } from '@radix-ui/react-popover';

import type { CssStyles } from '../stitches.config';
import { useOpenState } from '../utils/OpenStateProvider';
import { PopoverBox } from './PopoverBox';

type RadixProps = Pick<
  PopoverContentProps,
  'align' | 'side' | 'alignOffset' | 'sideOffset' | 'forceMount' | 'portalled' | 'onCloseAutoFocus'
>;

export interface PopoverLayerProps
  extends Omit<React.ComponentProps<typeof PopoverBox>, 'css' | 'align' | 'ref'>,
    RadixProps {
  css?: CssStyles;
}
interface Props extends PopoverLayerProps {
  radixElement: React.ComponentType<any>;
}
export const PopoverLayer: React.FC<Props> = ({
  children,
  align = 'start',
  side = 'bottom',
  sideOffset = 8,
  radixElement: RadixElement,
  css,
  ...props
}) => {
  const open = useOpenState();
  return (
    // @ts-expect-error
    <AnimatePresence>
      {open && (
        <RadixElement align={align} side={side} sideOffset={sideOffset} asChild {...props}>
          <PopoverBox css={css} side={side}>
            {children}
          </PopoverBox>
        </RadixElement>
      )}
    </AnimatePresence>
  );
};
