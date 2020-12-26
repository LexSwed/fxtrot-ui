import React, { useEffect, useRef } from 'react';
import { useVirtual } from 'react-virtual';
import ListBox from '../ListBox';
import type { ListBoxProps } from '../ListBox/ListBox';

interface Props extends Omit<ListBoxProps, 'children'> {
  size: number;
  children: (index: number) => React.ReactElement;
  /** I wanted to isolate useVirtual hook to not rerender whole ComboBox when scrolling, but I need scrollToIndex there */
  scrollToIndexRef: React.MutableRefObject<(index: number) => void>;
}

const VirtualList: React.FC<Props> = ({ size, children, scrollToIndexRef, ...props }) => {
  const listRef = useRef<HTMLUListElement>(null);
  const rowVirtualizer = useVirtual({
    size,
    parentRef: listRef,
    overscan: 5,
  });

  const listStyle: React.CSSProperties = {
    height: `${rowVirtualizer.totalSize}px`,
    width: '100%',
    position: 'relative',
  };

  useEffect(() => {
    scrollToIndexRef.current = rowVirtualizer.scrollToIndex;
  }, [scrollToIndexRef, rowVirtualizer.scrollToIndex]);

  if (size === 0) {
    return <ListBox role="listbox" {...props} />;
  }

  return (
    <ListBox role="listbox" ref={listRef} {...props}>
      <div style={listStyle}>
        {rowVirtualizer.virtualItems.map(({ index, start, measureRef }) => {
          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${start}px)`,
              }}
              ref={measureRef}
            >
              {children(index)}
            </div>
          );
        })}
      </div>
    </ListBox>
  );
};

export default React.memo(VirtualList);
