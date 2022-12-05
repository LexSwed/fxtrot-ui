import { useId } from '@radix-ui/react-id';
import type { ReactNode } from 'react';

import { Flex, FlexVariants } from '../Flex-copy/Flex';
import { styled } from '../stitches.config';
import { Text } from '../Text';

interface Props extends FlexVariants {
  title: string;
  children?: ReactNode;
}

const SectionInner = ({ title, children, cross = 'stretch', flow = 'column', gap = '4', ...props }: Props) => {
  const id = useId();
  return (
    <Flex cross={cross} flow={flow} gap={gap} {...props}>
      <Heading id={id} textStyle="overline" tone="light">
        {title}
      </Heading>
      <div role="group" aria-labelledby={id}>
        {children}
      </div>
    </Flex>
  );
};

export const Section = styled(SectionInner, {
  // create new stitches CSS selector
  '&:empty': {},
});

const Heading = styled(Text, {
  pr: '$2',
});
