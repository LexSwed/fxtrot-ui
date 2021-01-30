import type { StitchesProps } from '@stitches/react';
import React from 'react';
import { HiSelector } from 'react-icons/hi';

import type { FlexVariants } from '../Flex';
import { FormField, FormFieldProps, Hint, HintBox, useFormField } from '../FormField/FormField';
import Icon from '../Icon';
import Label from '../Label';
import { styled } from '../stitches.config';
import { InteractiveBox, InteractiveField, validityVariant } from '../TextField/shared';
import { useAllHandlers, useKeyboardHandles } from '../utils/hooks';
import { useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';
import { usePicker } from './utils';

const TriggerButton = styled(InteractiveBox as InteractiveField<'button'>, {
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

export interface TriggerProps extends FlexVariants, Omit<StitchesProps<typeof TriggerButton>, 'as' | 'validity'> {
  id?: string;
  placeholder?: string;
  label?: string;
  secondaryLabel?: string;
  hint?: string;
  disabled?: boolean;
  validity?: FormFieldProps['validity'];
}

const Trigger: React.FC<TriggerProps> = ({
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
          type="button"
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
