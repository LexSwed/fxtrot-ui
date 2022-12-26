import { useId } from '@radix-ui/react-id';
import type { ComponentProps } from 'react';
import { Flex } from '../flex/flex';

import { Text } from '../text';

interface Props extends ComponentProps<typeof Flex> {
  title: string;
}

const Section = ({ title, children, cross = 'stretch', flow = 'column', gap = 'md', id: propId, ...props }: Props) => {
  const id = useId(propId);
  return (
    <Flex cross={cross} flow={flow} gap={gap} {...props}>
      <Text id={id} textStyle="overline" tone="light">
        {title}
      </Text>
      <div role="group" aria-labelledby={id}>
        {children}
      </div>
    </Flex>
  );
};

export { Section };
