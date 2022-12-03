import { Title } from '@radix-ui/react-dialog';
import type { ComponentProps } from 'react';
import { Heading } from '../Heading';

interface Props extends ComponentProps<typeof Heading> {}

export const DialogTitle = ({ level = '4', ...props }: Props) => {
  return (
    <Title asChild>
      <Heading {...props} level={level} />
    </Title>
  );
};
