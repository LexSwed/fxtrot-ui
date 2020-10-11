import React from 'react';
import { OpenStateProvider } from '../utils/OpenStateProvider';
import Trigger from './Trigger';

type Props = React.ComponentProps<typeof Trigger>;

const Dropdown: React.FC<Props> = ({ children, ...triggerProps }) => {
  return (
    <OpenStateProvider>
      <Trigger {...triggerProps} />
      {children}
    </OpenStateProvider>
  );
};

export default Dropdown;

/**
 * value - string
 * onChange: (newValue: string) => void
 * <Dropdown label="" secondaryLabel="" hint="">
 *  {
 *    items => <Dropdown.Item value="">renderSomthing</Dropdown.Item>
 *  }
 * </Dropdown>
 */
