import { Box, styled } from '@fxtrot/ui';

export const ExampleBox = styled(Box, {
  bc: '$shape--hover',
  border: '2px dashed $border',
  height: '50px',
  minWidth: '50px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '$text--light',
  fontSize: '$sm',
});

export { CopyButton } from './CopyButton';
export { MainLayout } from './MainLayout/MainLayout';
