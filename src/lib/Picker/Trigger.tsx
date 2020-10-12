import { useButton } from '@react-aria/button';
import React from 'react';
import { HiSelector } from 'react-icons/hi';
import { FormField, Hint, HintBox, useFormField } from '../FormField/FormField';
import Icon from '../Icon';
import Label from '../Label';
import { styled } from '../stitches.config';
import { InteractiveBox, validityVariant } from '../TextField/shared';
import { useAllHandlers, useKeyboardHandles } from '../utils';
import { useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';
import { usePicker } from './utils';

type FormFieldProps = React.ComponentProps<typeof FormField>;

type Props = FormFieldProps & {
  id?: string;
  placeholder?: string;
};

const TriggerButton = styled(InteractiveBox, {
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

const Trigger: React.FC<Props> = ({
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
  const { triggerRef } = usePicker();
  const isOpen = useOpenState();
  const { toggle, open } = useOpenStateControls();
  const ariaProps = useFormField({ id, hint, label });
  const { buttonProps } = useButton(
    { 'isDisabled': disabled, 'onPress': toggle, 'aria-haspopup': 'listbox', 'aria-expanded': isOpen, ...props } as any,
    triggerRef
  );

  const handleKeyDown = useKeyboardHandles({
    ArrowDown: open,
    ArrowUp: open,
  });

  const onKeyDown = useAllHandlers(buttonProps.onKeyDown, handleKeyDown);

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
          aria-controls={isOpen ? `${buttonProps.id}-listbox` : undefined}
          validity={validity}
          variant={variant}
          {...ariaProps}
          {...buttonProps}
          as="button"
          onKeyDown={onKeyDown}
          ref={triggerRef}
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
