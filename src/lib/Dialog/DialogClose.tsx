import { XMarkIcon } from '@heroicons/react/24/outline';
import { Close as RdxClose } from '@radix-ui/react-dialog';

import { ComponentProps, forwardRef } from 'react';
import { Button } from '../button-1';

interface CloseButtonProps extends ComponentProps<typeof Button> {}

export const DialogClose = forwardRef<HTMLButtonElement, CloseButtonProps>((props, ref) => {
  return (
    <RdxClose asChild>
      <Button icon={XMarkIcon} variant="flat" {...props} ref={ref} />
    </RdxClose>
  );
});
