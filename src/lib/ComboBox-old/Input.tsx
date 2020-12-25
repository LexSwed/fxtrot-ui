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
import { forwardRef, PropsOf, useAllHandlers, useKeyboardHandles } from '../utils';
import { useOpenState, useOpenStateControls } from '../utils/OpenStateProvider';
import { useComboBox, useComboBoxAtom, useSelectedItem } from './utils';

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
}

const ComboBoxInput = forwardRef<HTMLDivElement, Props>(
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
      validity,
      disabled,
      variant = 'boxed',
      id,
      inputRef,
      ...props
    },
    ref
  ) => {
    const ariaProps = useFormField({ id, hint });
    const { allowNewElement, onValueChange } = useComboBox();
    const isOpen = useOpenState();
    const { open, close } = useOpenStateControls();
    const [{ focusedItemId, filterText, items }, dispatch] = useComboBoxAtom();
    const selectedItem = useSelectedItem();

    const handleBlur = useAllHandlers(
      props.onBlur,
      allowNewElement
        ? undefined
        : () => {
            if (filterText === '') {
              onValueChange(null, '');
            } else if (selectedItem) {
              dispatch({
                type: 'filter',
                text: selectedItem.label,
              });
            } else {
              dispatch({
                type: 'filter',
                text: '',
              });
            }
          }
    );

    const handleChange = useAllHandlers((e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'filter', text: e.currentTarget.value });
    }, open);

    const handleSelect = useAllHandlers(() => {
      const newValue = Object.keys(items).find((key) => items[key].id === focusedItemId);
      if (newValue) {
        onValueChange(newValue, items[newValue].label);
      }
    }, close);

    const keydownControls = useKeyboardHandles({
      'ArrowDown': () => {
        if (isOpen) {
          dispatch({
            type: 'focus_next',
            listboxId: props['aria-controls'],
          });
        } else {
          open();
        }
      },
      'ArrowUp': () => {
        if (isOpen) {
          dispatch({
            type: 'focus_prev',
            listboxId: props['aria-controls'],
          });
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
    const hasNewBadge = !selectedItem?.value && !!filterText && allowNewElement;

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
              value={filterText}
              onChange={handleChange}
              type="text"
              variant={variant}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              hasNewBadge={hasNewBadge}
              ref={inputRef}
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
        }}
      >
        <Icon as={HiSelector} />
      </ButtonStyled>
    </ButtonContainer>
  );
});

ComboBoxButton.displayName = 'ComboBoxButton';

export default ComboBoxInput;
