import React, { useRef } from 'react';
import { SelectorIcon } from '@heroicons/react/solid';

import { IconButton } from '../IconButton';
import { Flex, FlexVariants } from '../Flex/Flex';
import { FormField, Hint, HintBox, useFormField } from '../FormField/FormField';
import { Icon } from '../Icon';
import { Label } from '../Label';
import { styled, CssStyles } from '../stitches.config';
import { Tag } from '../Tag';
import { InputField, InputProps } from '../TextField/shared';
import { useAllHandlers, useForkRef, useKeyboardHandles } from '../utils/hooks';
import { useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';

const inputStyle: CssStyles = {
  // increase specificity
  '&:not(:only-child)': {
    pr: '$16',
  },
};

export interface Props
  extends Omit<InputProps, 'onChange' | 'type' | 'value' | 'defaultValue' | 'children' | 'text' | 'as'>,
    FlexVariants {
  'label'?: string;
  'secondaryLabel'?: string;
  'hint'?: string;
  'validity'?: 'valid' | 'invalid';
  'inputRef'?: React.Ref<HTMLInputElement>;
  'aria-controls'?: string;
  /** Internal prop */
  'hasNewBadge': boolean;
  /** Internal prop */
  'onSelect': () => void;
  /** Internal prop */
  'onFocusNext': () => void;
  /** Internal prop */
  'onFocusPrev': () => void;
  /** Internal prop */
  'value': string;
  /** Internal prop */
  'onChange': (newValue: string) => void;
}

export const ComboBoxInput: React.FC<Props> = ({
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
  validity,
  disabled,
  variant = 'boxed',
  id,
  inputRef,
  /** custom props, should be filtered from ComboBox parent */
  hasNewBadge,
  value,
  onChange,
  onSelect,
  onFocusNext,
  onFocusPrev,
  ...props
}) => {
  const ariaProps = useFormField({ id, hint });
  const isOpen = useOpenState();
  const { open, close } = useOpenStateControls();
  const innerRef = useRef<HTMLInputElement>(null);
  const refs = useForkRef(inputRef, innerRef);

  const handleChange = useAllHandlers((e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value), open);

  const keydownControls = useKeyboardHandles({
    'ArrowDown': () => {
      open();
      onFocusNext();
    },
    'ArrowUp': () => {
      open();
      onFocusPrev();
    },
    'Escape': close,
    'Tab.propagate': close,
    'Enter': isOpen ? onSelect : undefined,
    'Space': isOpen ? onSelect : undefined,
  });

  const handleKeyDown = useAllHandlers(keydownControls, props.onKeyDown);

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
        <Label label={label} secondary={secondaryLabel} htmlFor={ariaProps.id} disabled={disabled} />
      )}
      <HintBox>
        <InputField
          {...props}
          {...ariaProps}
          aria-expanded={isOpen}
          aria-autocomplete="list"
          role="combobox"
          autoComplete="off"
          spellCheck="false"
          disabled={disabled}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          type="text"
          variant={variant}
          css={hasNewBadge ? inputStyle : undefined}
          validity={validity}
          inputRef={refs}
        >
          <ComboBoxButton hasNewBadge={hasNewBadge} inputRef={innerRef} />
        </InputField>
        {hint && (
          <Hint id={ariaProps['aria-describedby']} validity={validity}>
            {hint}
          </Hint>
        )}
      </HintBox>
    </FormField>
  );
};

const ButtonContainer = styled(Flex, {
  position: 'absolute',
  right: 0,
  top: 0,
  height: '100%',
  px: '$1',
});

const ComboBoxButton = React.memo(
  ({ hasNewBadge, inputRef }: { hasNewBadge: boolean; inputRef: React.RefObject<HTMLInputElement> }) => {
    const isOpen = useOpenState();
    const { open } = useOpenStateControls();

    return (
      <ButtonContainer cross="center">
        {hasNewBadge && <Tag label="NEW" size="sm" />}
        <IconButton
          variant="transparent"
          tabIndex={-1}
          aria-hidden={isOpen}
          aria-expanded={isOpen}
          aria-label="Open the list"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            open();
            inputRef.current?.focus();
            inputRef.current?.select();
          }}
          size="xs"
        >
          <Icon as={SelectorIcon} />
        </IconButton>
      </ButtonContainer>
    );
  }
);

ComboBoxButton.displayName = 'ComboBoxButton';
