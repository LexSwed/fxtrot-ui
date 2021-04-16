import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import Box from '../Box';

import { useTheme } from '../ThemeProvider/ThemeProvider';

const Portal: React.FC = ({ children }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { ref } = useTheme();
  const [mounted, setMounted] = useState(false);
  const zIndex = useContext(portalContext) || 10;

  useEffect(() => {
    setMounted(true);
    elementRef.current?.parentElement?.childNodes.forEach((child) => {
      (child as HTMLElement).setAttribute('aria-hidden', `${child === elementRef.current}`);
    });
  }, []);

  useEffect(() => {
    if (mounted) {
      const updatedElements: HTMLElement[] = [];
      elementRef.current?.parentElement?.childNodes.forEach((child) => {
        if (child !== elementRef.current) {
          (child as HTMLElement).setAttribute?.('aria-hidden', 'true');
          updatedElements.push(child as HTMLElement);
        }
      });
      return () => {
        updatedElements.forEach((el) => {
          el.removeAttribute('aria-hidden');
        });
      };
    }
  }, [mounted]);

  if (!mounted) return null;

  return (
    <portalContext.Provider value={zIndex + 10}>
      {ReactDOM.createPortal(
        <Box zIndex={zIndex} display="block" position="absolute" ref={elementRef}>
          {children}
        </Box>,
        ref?.current || document.body
      )}
    </portalContext.Provider>
  );
};

export default Portal;

const portalContext = createContext(100);
