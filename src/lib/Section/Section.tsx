import React from 'react';
import { useUID } from 'react-uid';

import { Flex, FlexVariants } from '../Flex/Flex';
import { styled } from '../stitches.config';
import { Text } from '../Text';

interface Props extends FlexVariants {
  title: string;
}

export const Section: React.FC<Props> = ({
  title,
  children,
  cross = 'stretch',
  flow = 'column',
  gap = 'xs',
  ...props
}) => {
  const id = useUID();
  return (
    <Flex cross={cross} flow={flow} gap={gap} {...props}>
      <Heading id={id} font="mono" size="xs" tone="light">
        {title}
      </Heading>
      <div role="group" aria-labelledby={id}>
        {children}
      </div>
    </Flex>
  );
};

const Heading = styled(Text, {
  pr: '$2',
  textTransform: 'uppercase',
});
