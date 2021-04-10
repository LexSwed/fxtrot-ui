import React, { createContext, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Box from '../Box';

import { useTheme } from '../ThemeProvider/ThemeProvider';

const Portal: React.FC = ({ children }) => {
  const { ref } = useTheme();
  const [mounted, setMounted] = useState(false);
  const zIndex = useContext(portalContext) || 10;

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  console.log(zIndex);
  return (
    <portalContext.Provider value={zIndex + 10}>
      {ReactDOM.createPortal(
        <Box zIndex={zIndex} display="block" position="absolute">
          {children}
        </Box>,
        ref?.current || document.body
      )}
    </portalContext.Provider>
  );
};

export default Portal;

const portalContext = createContext(100);
