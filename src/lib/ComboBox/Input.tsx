import type { StitchesProps } from '@stitches/react';
import React from 'react';
import { HiSelector } from 'react-icons/hi';

import Button from '../Button';
import Flex, { FlexVariants } from '../Flex';
import { FormField, Hint, HintBox, useFormField } from '../FormField/FormField';
import Icon from '../Icon';
import Label from '../Label';
import { styled } from '../stitches.config';
import Tag from '../Tag';
import { InteractiveBox, validityVariant } from '../TextField/shared';
import { useAllHandlers, useForkRef, useKeyboardHandles } from '../utils';
import { useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';
import { useComboBox } from './utils';

const InputWrapper = styled('div', {
  position: 'relative',
  width: '100%',

  variants: {
    validity: validityVariant,
  },
});

const Input = styled(InteractiveBox, {
  variants: {
    hasNewBadge: {
      true: {
        pr: '$18',
      },
      false: {
        pr: '$10',
      },
    },
  },
});

type InputProps = StitchesProps<typeof InteractiveBox>;
interface Props
  extends Omit<InputProps, 'onChange' | 'type' | 'value' | 'defaultValue' | 'children' | 'text'>,
    FlexVariants {
  value?: string;
  onSelect: () => void;
  onChange: (value: string) => void;
  label?: string;
  secondaryLabel?: string;
  hint?: string;
  validity?: 'valid' | 'invalid';
  inputRef?: React.Ref<HTMLInputElement>;
}

const ComboBoxInput = React.forwardRef<HTMLDivElement, Props>(
  (
    {
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
      onChange,
      onSelect,
      validity,
      value,
      disabled,
      variant = 'boxed',
      id,
      inputRef: inputRefProp,
      ...props
    },
    ref
  ) => {
    const ariaProps = useFormField({ id, hint });
    const { inputRef, focusedItemId, focusControls, allowNewElement, selectedItemValue } = useComboBox();
    const isOpen = useOpenState();
    const { open, close } = useOpenStateControls();

    const handleChange = useAllHandlers((e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.currentTarget.value);
    }, open);

    const handleSelect = useAllHandlers(onSelect, close);

    const refs = useForkRef(inputRefProp, inputRef);

    const keydownControls = useKeyboardHandles({
      'ArrowDown': () => {
        if (isOpen) {
          focusControls.focusNext();
        } else {
          open();
        }
      },
      'ArrowUp': () => {
        if (isOpen) {
          focusControls.focusPrev();
        } else {
          open();
        }
      },
      'Escape': close,
      'Tab.propagate': close,
      'Enter': handleSelect,
      'Space': handleSelect,
    });

    const handleKeyDown = useAllHandlers(keydownControls, props.onKeyDown);
    const hasNewBadge = !selectedItemValue && !!value && allowNewElement;

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
        ref={ref}
      >
        {label && <Label label={label} secondary={secondaryLabel} htmlFor={ariaProps.id} disabled={disabled} />}
        <HintBox>
          <InputWrapper>
            <Input
              {...props}
              {...ariaProps}
              aria-expanded={isOpen}
              aria-autocomplete="list"
              role="combobox"
              aria-controls={isOpen ? props['aria-controls'] : undefined}
              aria-activedescendant={focusedItemId}
              autoComplete="off"
              spellCheck="false"
              disabled={disabled}
              value={value ? `${value}` : value}
              onChange={handleChange}
              type="text"
              variant={variant}
              ref={refs}
              onKeyDown={handleKeyDown}
              hasNewBadge={hasNewBadge}
            />
            <ComboBoxButton hasNewBadge={hasNewBadge} />
          </InputWrapper>
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

const ButtonContainer = styled(Flex, {
  position: 'absolute',
  right: 0,
  top: 0,
  height: '100%',
});

const ButtonStyled = styled(Button, {
  zIndex: 2,
  position: 'relative',
  pointerEvents: 'all',
});

const ComboBoxButton = React.memo(({ hasNewBadge }: { hasNewBadge: boolean }) => {
  const isOpen = useOpenState();
  const { open } = useOpenStateControls();
  const { inputRef } = useComboBox();

  return (
    <ButtonContainer flow="row" cross="center">
      {hasNewBadge && <Tag label="NEW" size="sm" />}
      <ButtonStyled
        variant="transparent"
        tabIndex={-1}
        aria-hidden={isOpen}
        aria-expanded={isOpen}
        aria-label="Open the list"
        onMouseDown={(e) => {
          /* onClick would cause onOutside click to close the popup */
          e.preventDefault();
          e.stopPropagation();
          open();
          inputRef.current?.focus();
        }}
      >
        <Icon as={HiSelector} />
      </ButtonStyled>
    </ButtonContainer>
  );
});

ComboBoxButton.displayName = 'ComboBoxButton';

export default ComboBoxInput;
