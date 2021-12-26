import React from 'react';
import { Root } from '@radix-ui/react-portal';
import { ThemeProvider } from '../ThemeProvider/ThemeProvider';

export const Portal: React.FC = ({ children }) => {
  return (
    <Root>
      <ThemeProvider>{children}</ThemeProvider>
    </Root>
  );
};
