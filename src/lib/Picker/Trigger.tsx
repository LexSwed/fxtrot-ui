import React from 'react';
import { HiSelector } from 'react-icons/hi';

import { FormField, Hint, HintBox, useFormField } from '../FormField/FormField';
import Icon from '../Icon';
import Label from '../Label';
import { styled } from '../stitches.config';
import { InteractiveBox, InteractiveBoxType, validityVariant } from '../TextField/shared';
import { useAllHandlers, useKeyboardHandles } from '../utils';
import { useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';
import { usePicker } from './utils';

interface FormFieldProps extends React.ComponentProps<typeof FormField> {}

interface ButtonProps
  extends InteractiveBoxType<
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
  > {}
interface Props extends FormFieldProps {
  id?: string;
  placeholder?: string;
  label?: string;
  secondaryLabel?: string;
  hint?: string;
  disabled?: boolean;
}

const TriggerButton = styled((InteractiveBox as unknown) as ButtonProps, {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  pr: '$2',
  minWidth: 0,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  cursor: 'default',

  [`> ${Icon}`]: {
    pl: '$1',
    size: '$5',
  },

  variants: {
    validity: validityVariant,
  },
});

const Placeholder = styled('div', {
  color: '$borderStill',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

const Trigger: React.FC<Props & React.ComponentProps<ButtonProps>> = ({
  label,
  secondaryLabel,
  hint,
  main,
  cross,
  flow,
  display,
  space,
  css,
  style,
  className,
  id,
  validity,
  disabled,
  placeholder = 'Select an option',
  variant = 'boxed',
  children,
  ...props
}) => {
  const { triggerRef, value } = usePicker();
  const isOpen = useOpenState();
  const { toggle, open } = useOpenStateControls();
  const ariaProps = useFormField({ id, hint, label });

  const handleKeyDown = useKeyboardHandles({
    ArrowDown: open,
    ArrowUp: open,
  });

  const handleClick = useAllHandlers(props.onClick, toggle);

  const onKeyDown = useAllHandlers(props.onKeyDown, handleKeyDown);

  return (
    <FormField
      main={main}
      cross={cross}
      flow={flow}
      display={display}
      space={space}
      css={css}
      style={style}
      className={className}
      hasHint={!!hint}
    >
      {label && (
        <Label label={label} secondary={secondaryLabel} id={ariaProps['aria-labelledby']} disabled={disabled} />
      )}
      <HintBox>
        <TriggerButton
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? `${ariaProps.id}-listbox` : undefined}
          validity={validity}
          variant={variant}
          {...ariaProps}
          {...props}
          as="button"
          onClick={handleClick}
          onKeyDown={onKeyDown}
          ref={triggerRef as any}
          value={value}
        >
          {children || <Placeholder>{placeholder}</Placeholder>}
          <Icon as={HiSelector} />
        </TriggerButton>
        {hint && (
          <Hint id={ariaProps['aria-describedby']} validity={validity}>
            {hint}
          </Hint>
        )}
      </HintBox>
    </FormField>
  );
};

export default Trigger;
