import React from 'react';
import flattenChildren from 'react-keyed-flatten-children';

import { Checkbox, CheckboxProps, CheckboxFormField, CheckMark } from '../Checkbox/Checkbox';
import { Flex } from '../Flex';
import { Label } from '../Label';
import { styled } from '../stitches.config';
import { useDerivedState } from '../utils/hooks';

type CheckboxChild = React.ReactElement<typeof Checkbox>;

interface Props extends Omit<React.ComponentProps<typeof CheckboxGroupWrapper>, 'value' | 'onChange'> {
  children: CheckboxChild | CheckboxChild[] | null | undefined;
  label?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
}

export const CheckboxGroup = React.forwardRef<HTMLDivElement, Props>(
  ({ children, label, value = [], onChange, flow = 'column', ...props }, ref) => {
    const [checkedItems, setValue] = useDerivedState(value, onChange);

    const handleChange: CheckboxProps['onChange'] = (checked, event) => {
      const { value } = event.target;
      if (checked) {
        setValue([...checkedItems, value]);
      } else {
        setValue(checkedItems.filter((v) => v !== value));
      }
    };

    return (
      <Flex gap="sm" flow={flow}>
        {label && <Label label={label} />}
        <CheckboxGroupWrapper {...props} flow={flow} ref={ref}>
          {flattenChildren(children).map((child) => {
            if (isCheckboxChild(child)) {
              return React.cloneElement(child, {
                checked: checkedItems.includes((child.props as any).value),
                onChange: handleChange,
                defaultChecked: undefined,
              } as CheckboxProps);
            }
            return child;
          })}
        </CheckboxGroupWrapper>
      </Flex>
    );
  }
);

const CheckboxGroupWrapper = styled(Flex, {
  [`& > ${CheckboxFormField}`]: {
    py: '$2',
  },
  [`& ${CheckMark}`]: {
    br: '$round',
  },
  defaultVariants: {
    flow: 'column',
  },
});

function isCheckboxChild(child: React.ReactNode): child is CheckboxChild {
  return React.isValidElement(child) && child.type === Checkbox;
}
