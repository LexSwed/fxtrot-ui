import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Close as RdxClose } from '@radix-ui/react-dialog';

import { IconButton } from '../IconButton';
import { Icon } from '../Icon';

interface CloseButtonProps extends Omit<React.ComponentProps<typeof IconButton>, 'label'> {
  label?: string;
}
export const DialogClose = React.forwardRef<HTMLButtonElement, CloseButtonProps>((props, ref) => {
  return (
    <RdxClose asChild>
      <IconButton label="Close the dialog" variant="flat" {...props} ref={ref}>
        <Icon as={XMarkIcon} />
      </IconButton>
    </RdxClose>
  );
});
