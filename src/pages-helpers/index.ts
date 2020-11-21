import { Box, styled } from '../lib';

export const ExampleBox = styled(Box, {
  bc: '$gray50',
  border: '2px dashed $gray200',
  height: '50px',
  minWidth: '50px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '$gray500',
  fontSize: '$sm',
});
