import React, { useRef } from 'react';
import { HiSelector } from 'react-icons/hi';

import Button from '../Button';
import Flex, { FlexVariants } from '../Flex';
import { FormField, Hint, HintBox, useFormField } from '../FormField/FormField';
import Icon from '../Icon';
import Label from '../Label';
import { styled } from '../stitches.config';
import Tag from '../Tag';
import { InteractiveBox, validityVariant } from '../TextField/shared';
import { PropsOf, useAllHandlers, useForkRef, useKeyboardHandles } from '../utils';
import { useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';

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

interface InputProps extends PropsOf<typeof InteractiveBox> {}
export interface Props
  extends Omit<InputProps, 'onChange' | 'type' | 'value' | 'defaultValue' | 'children' | 'text'>,
    FlexVariants {
  'label'?: string;
  'secondaryLabel'?: string;
  'hint'?: string;
  'validity'?: 'valid' | 'invalid';
  'inputRef'?: React.Ref<HTMLInputElement>;
  'aria-controls': string;
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

const ComboBoxInput: React.FC<Props> = ({
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
      space={space}
      css={css}
      style={style}
      className={className}
      hasHint={!!hint}
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
            autoComplete="off"
            spellCheck="false"
            disabled={disabled}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            type="text"
            variant={variant}
            hasNewBadge={hasNewBadge}
            ref={refs}
          />
          <ComboBoxButton hasNewBadge={hasNewBadge} inputRef={innerRef} />
        </InputWrapper>
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
});

const ButtonStyled = styled(Button, {
  zIndex: 2,
  position: 'relative',
  pointerEvents: 'all',
});

const ComboBoxButton = React.memo(
  ({ hasNewBadge, inputRef }: { hasNewBadge: boolean; inputRef: React.RefObject<HTMLInputElement> }) => {
    const isOpen = useOpenState();
    const { open } = useOpenStateControls();

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
            inputRef.current?.select();
          }}
        >
          <Icon as={HiSelector} />
        </ButtonStyled>
      </ButtonContainer>
    );
  }
);

ComboBoxButton.displayName = 'ComboBoxButton';

export default ComboBoxInput;
