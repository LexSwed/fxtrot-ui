import * as RdxDialog from '@radix-ui/react-dialog';
import type { ComponentProps } from 'react';
import { Heading } from '../heading';

interface Props extends ComponentProps<typeof Heading> {}

export const DialogTitle = ({ level = '4', ...props }: Props) => {
  return (
    <RdxDialog.Title asChild>
      <Heading {...props} level={level} />
    </RdxDialog.Title>
  );
};
