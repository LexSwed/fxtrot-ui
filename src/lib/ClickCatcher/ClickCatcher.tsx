import React from 'react';
import Box from '../Box';

/**
 * Allows Dialog to remain open when opened by a trigger
 * inside the Menu that registers outside click listener to close the menu
 */
function preventClick(e: React.PointerEvent | React.TouchEvent | React.MouseEvent) {
  e.stopPropagation();
}
const ClickCatcher: React.FC = ({ children }) => (
  <Box
    display="contents"
    onMouseDown={preventClick}
    onTouchStart={preventClick}
    onPointerDown={preventClick}
    {...clickCatcherAttrs}
  >
    {children}
  </Box>
);

export default ClickCatcher;

// exporting for visibility on where it comes from
export const clickCatcherAttrs = { 'data-fxtrotui': 'click-catcher' } as const;
