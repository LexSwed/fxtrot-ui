import React, { createContext, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Box from '../Box';

import ThemeProvider from '../ThemeProvider';

const Portal: React.FC = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const zIndex = useContext(portalContext);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <portalContext.Provider value={zIndex + 10}>
      {ReactDOM.createPortal(
        <Box zIndex={zIndex} display="block" position="absolute">
          <ThemeProvider>{children}</ThemeProvider>
        </Box>,
        document.body
      )}
    </portalContext.Provider>
  );
};

export default Portal;

export const portalContext = createContext(100);
