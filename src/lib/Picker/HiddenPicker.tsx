import React from 'react';

import VisuallyHidden from '../VisuallyHidden';
import { usePicker } from './utils';

const HiddenPicker: React.FC<{
  'options': { textContent: string; value: string }[];
  'name'?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  'disabled'?: boolean;
}> = ({ options, ...props }) => {
  const { value, onChange } = usePicker();

  return (
    <VisuallyHidden aria-hidden="true">
      <input
        {...props}
        value={value}
        onChange={onChange ? (ev) => onChange(ev.target.value) : undefined}
        spellCheck={false}
      />
      <select
        {...props}
        value={value}
        tabIndex={-1}
        onChange={onChange ? (ev) => onChange(ev.target.value) : undefined}
      >
        {options.map((el) => (
          <option value={el.value} key={el.textContent}>
            {el.textContent}
          </option>
        ))}
      </select>
    </VisuallyHidden>
  );
};

export default HiddenPicker;
