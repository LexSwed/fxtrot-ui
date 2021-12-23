import React from 'react';
import { Root } from '@radix-ui/react-portal';
import { useRootElementRef } from '../ThemeProvider/ThemeProvider';

export const Portal: React.FC = ({ children }) => {
  const ref = useRootElementRef();
  return <Root containerRef={ref}>{children}</Root>;
};
