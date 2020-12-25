import React, { useRef } from 'react';
import { useVirtual } from 'react-virtual';
import ListBox from '../ListBox';
import type { ListBoxProps } from '../ListBox/ListBox';

interface Props extends Omit<ListBoxProps, 'children'> {
  size: number;
  children: (index: number) => React.ReactElement;
}

const VirtualList: React.FC<Props> = ({ size, children, ...props }) => {
  const listRef = useRef<HTMLUListElement>(null);
  const rowVirtualizer = useVirtual({
    size,
    parentRef: listRef,
    paddingStart: 4,
    paddingEnd: 4,
    overscan: 5,
  });
  const listStyle: React.CSSProperties = {
    height: `${rowVirtualizer.totalSize}px`,
    width: '100%',
    position: 'relative',
  };

  return (
    <ListBox role="listbox" style={listStyle} ref={listRef} {...props}>
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
    </ListBox>
  );
};

export default React.memo(VirtualList);
