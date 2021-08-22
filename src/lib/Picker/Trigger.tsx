import React from 'react';
import { SelectorIcon } from '@heroicons/react/solid';

import { styled, CssStyles } from '../stitches.config';
import type { FlexVariants } from '../Flex/Flex';
import { FormField, FormFieldProps, Hint, HintBox, useFormField } from '../FormField/FormField';
import { Icon } from '../Icon';
import { Label } from '../Label';
import { fieldBox, FieldBoxVariants } from '../TextField/shared';
import { useAllHandlers, useKeyboardHandles } from '../utils/hooks';
import { useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';
import { usePicker } from './utils';

const TriggerButton = styled('div', fieldBox, {
  'position': 'relative',
  'display': 'flex',
  'alignItems': 'center',
  'justifyContent': 'space-between',
  'pr': '$2',
  'minWidth': 0,
  'overflow': 'hidden',
  'whiteSpace': 'nowrap',
  'textOverflow': 'ellipsis',
  'cursor': 'default',

  '&:not(:only-child)': {
    pr: '$2',
  },

  [`& > ${Icon}`]: {
    pl: '$1',
    size: '$5',
  },
});

const Placeholder = styled('div', {
  color: '$textSubtle',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

export interface TriggerProps
  extends FlexVariants,
    FieldBoxVariants,
    Omit<React.ComponentProps<'button'>, 'validity' | 'type' | 'value'> {
  id?: string;
  placeholder?: string;
  label?: string;
  secondaryLabel?: string;
  hint?: string;
  disabled?: boolean;
  validity?: FormFieldProps['validity'];
  css?: CssStyles;
}

const Trigger = React.forwardRef<HTMLButtonElement, TriggerProps>(
  (
    {
      label,
      secondaryLabel,
      hint,
      main,
      cross,
      flow,
      display,
      gap,
      css,
      style,
      className,
      id,
      validity,
      disabled,
      placeholder = 'Select an option',
      variant = 'boxed',
      children,
      size,
      ...props
    },
    ref
  ) => {
    const { value } = usePicker();
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
        gap={gap}
        css={css}
        style={style}
        className={className}
        hasHint={!!hint}
      >
        {label !== undefined && (
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
            fieldSize={size}
            onClick={handleClick}
            onKeyDown={onKeyDown}
            ref={ref}
            value={value}
            as="button"
            type="button"
          >
            {children || <Placeholder>{placeholder}</Placeholder>}
            <Icon as={SelectorIcon} />
          </TriggerButton>
          {hint && (
            <Hint id={ariaProps['aria-describedby']} validity={validity}>
              {hint}
            </Hint>
          )}
        </HintBox>
      </FormField>
    );
  }
);

export default Trigger;
