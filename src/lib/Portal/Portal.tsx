import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import Box from '../Box';

import ThemeProvider from '../ThemeProvider';

const Portal: React.FC = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  const { zIndex } = useContext(portalContext);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <portalContext.Provider value={{ ref: containerRef, zIndex: zIndex + 1 }}>
      {ReactDOM.createPortal(
        <ThemeProvider>
          <Box zIndex={zIndex} display="block" position="relative" ref={containerRef}>
            {children}
          </Box>
        </ThemeProvider>,
        document.body
      )}
    </portalContext.Provider>
  );
};

export default Portal;

interface PortalContext {
  zIndex: number;
  ref: React.RefObject<HTMLDivElement>;
}
export const portalContext = createContext<PortalContext>({
  zIndex: 100,
  ref: {
    current: null,
  },
});
