import React from 'react';
import { Title } from '@radix-ui/react-dialog';
import { Heading } from '../Heading';

export const DialogTitle: React.FC<React.ComponentProps<typeof Heading>> = ({ ...props }) => {
  return (
    <Title asChild>
      <Heading {...props} />
    </Title>
  );
};
