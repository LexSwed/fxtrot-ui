import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Portal: React.FC = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return ReactDOM.createPortal(children, document.body);
};

export default Portal;
