import React from 'react';
import { Root } from '@radix-ui/react-portal';

const Portal: React.FC = ({ children }) => {
  return <Root>{children}</Root>;
};

export default Portal;
