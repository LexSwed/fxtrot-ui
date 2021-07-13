import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Root } from '@radix-ui/react-portal';
import Box from '../Box';

const Portal: React.FC = ({ children }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const zIndex = useContext(portalContext) || 10;

  return (
    <portalContext.Provider value={zIndex + 10}>
      {ReactDOM.createPortal(
        <Root>
          <Box zIndex={zIndex} display="block" position="absolute" ref={elementRef}>
            {children}
          </Box>
        </Root>,
        document.body
      )}
    </portalContext.Provider>
  );
};

export default Portal;

const portalContext = createContext(100);
