import React from 'react';
import { useUID } from 'react-uid';

import Flex, { FlexVariants } from '../Flex/Flex';
import { styled } from '../stitches.config';
import Text from '../Text';

const Heading = styled(Text, {
  pr: '$2',
  textTransform: 'uppercase',
});

const Section: React.FC<{ title: string } & FlexVariants> = ({ title, children, ...props }) => {
  const id = useUID();
  return (
    <Flex cross="stretch" flow="column" gap="xs" {...props}>
      <Heading id={id} font="mono" size="xs" tone="light">
        {title}
      </Heading>
      <div role="group" aria-labelledby={id}>
        {children}
      </div>
    </Flex>
  );
};

export default Section;
