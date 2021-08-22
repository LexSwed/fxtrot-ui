import React from 'react';
import { Root } from '@radix-ui/react-portal';

export const Portal: React.FC = ({ children }) => {
  return <Root>{children}</Root>;
};
