import React from 'react';
import { useUID } from 'react-uid';
import Flex from '../Flex';
import { styled } from '../stitches.config';
import Text from '../Text';
import MenuList from './index';

const Heading = styled(Text, {
  pr: '$2',
  textTransform: 'uppercase',
});

const Section: React.FC<{ label: string; children: React.ReactElement<typeof MenuList> }> = ({ label, children }) => {
  const id = useUID();
  return (
    <Flex flow="column" space="xs">
      <Heading id={id} font="mono" size="xs" tone="light">
        {label}
      </Heading>
      {React.cloneElement(children, { 'aria-labelledby': id })}
    </Flex>
  );
};

export default Section;
