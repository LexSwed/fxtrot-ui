import { type ChangeEvent, type ComponentProps, useMemo } from 'react';
import { clsx } from 'clsx';

import { Label } from '../form-field';
import { Flex, type FlexVariants } from '../flex/flex';

import styles from './switch.module.css';

type InputProps = Omit<ComponentProps<'input'>, 'role' | 'type' | 'onChange' | 'value'>;

interface Props extends InputProps, FlexVariants {
  label: string;
  secondaryLabel?: string;
  value?: string;
  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
}

export const Switch = ({
  checked,
  onChange,
  style,
  className,
  flow = 'row',
  label,
  secondaryLabel,
  gap = 'sm',
  display = 'inline',
  cross = 'center',
  disabled,
  id,
  ...props
}: Props) => {
  const handleChange = useMemo(() => {
    if (typeof onChange !== 'function') return;

    return (ev: ChangeEvent<HTMLInputElement>) => onChange(ev.target.checked, ev);
  }, [onChange]);

  return (
    <Flex
      display={display}
      className={clsx(styles.label, className)}
      style={style}
      gap={gap}
      flow={flow}
      cross={cross}
      as="label"
    >
      <div>
        <input
          aria-checked={checked}
          checked={checked}
          {...props}
          type="checkbox"
          role="switch"
          disabled={disabled}
          onChange={handleChange}
          className={styles.input}
        />
        <div className={styles.toggle} />
      </div>
      {label && <Label label={label} secondary={secondaryLabel} disabled={disabled} size="sm" as="span" />}
    </Flex>
  );
};
