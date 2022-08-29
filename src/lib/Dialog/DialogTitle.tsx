import React from 'react';
import { Title } from '@radix-ui/react-dialog';
import { Heading } from '../Heading';

export const DialogTitle: React.FC<React.ComponentProps<typeof Heading>> = ({ level = '4', ...props }) => {
  return (
    <Title asChild>
      <Heading {...props} level={level} />
    </Title>
  );
};
