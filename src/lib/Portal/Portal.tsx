import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from '../ThemeProvider';

const Portal: React.FC = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return ReactDOM.createPortal(<ThemeProvider>{children}</ThemeProvider>, document.body);
};

export default Portal;
