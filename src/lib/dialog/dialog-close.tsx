import { XMarkIcon } from '@heroicons/react/24/outline';
import * as RdxDialog from '@radix-ui/react-dialog';

import { type ComponentProps, forwardRef } from 'react';
import { Button } from '../button';

interface CloseButtonProps extends ComponentProps<typeof Button> {}

export const DialogClose = forwardRef<HTMLButtonElement, CloseButtonProps>((props, ref) => {
  return (
    <RdxDialog.DialogClose asChild>
      <Button icon={XMarkIcon} variant="flat" {...props} ref={ref} />
    </RdxDialog.DialogClose>
  );
});
