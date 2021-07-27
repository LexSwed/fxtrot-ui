import React, { FormEvent } from 'react';
import type * as Polymorphic from '@radix-ui/react-polymorphic';
import flattenChildren from 'react-keyed-flatten-children';
import { Checkbox, CheckboxFormField, CheckMark } from '../Checkbox/Checkbox';
import Flex from '../Flex';
import { styled } from '../stitches.config';
import { useDerivedState } from '../utils/hooks';
import Label from '../Label';

type CheckboxChild = React.ReactElement<typeof Checkbox>;

interface Props extends Omit<React.ComponentProps<typeof CheckboxGroupWrapper>, 'value' | 'onChange'> {
  children: CheckboxChild | CheckboxChild[];
  label?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
}

export const CheckboxGroup = React.forwardRef(
  ({ children, label, value = [], onChange, flow = 'column', ...props }, ref) => {
    const [checkedItems, setValue] = useDerivedState(value, onChange);
    function handleChange(e: any) {
      const { value, checked } = e.target as { value: string; checked: boolean };
      if (checked) {
        setValue([...checkedItems, value]);
      } else {
        setValue(checkedItems.filter((v) => v !== value));
      }
    }
    console.log({ checkedItems });
    return (
      <Flex gap="md" flow={flow}>
        {label && <Label label={label} />}
        <CheckboxGroupWrapper {...props} flow={flow} onChange={handleChange} ref={ref}>
          {(flattenChildren(children) as CheckboxChild[]).map((child: CheckboxChild) => {
            if (React.isValidElement(child) && child.type === Checkbox) {
              return React.cloneElement(child, {
                defaultChecked: false,
                checked: checkedItems?.includes((child.props as any).value),
                onChange: undefined,
              } as React.ComponentProps<typeof Checkbox>);
            }
            return child;
          })}
        </CheckboxGroupWrapper>
      </Flex>
    );
  }
) as CheckboxGroupComponent;

export type CheckboxGroupComponent = Polymorphic.ForwardRefComponent<'div', Props>;

const CheckboxGroupWrapper = styled(Flex, {
  [`& ${CheckboxFormField}`]: {
    p: '$2',
    boxShadow: 'xs',
  },
  [`& ${CheckMark}`]: {
    br: '$round',
  },
  defaultVariants: {
    flow: 'column',
  },
});
