import { Box, styled } from '@fxtrot/ui';

export const ExampleBox = styled(Box, {
  bc: '$surfacePrimary3',
  border: '2px dashed $surfacePrimary6',
  height: '50px',
  minWidth: '50px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '$onSurfaceVariant',
  fontSize: '$sm',
});

export { TextWithComputedStyle } from './TextWithComputedStyle';

export { CopyButton } from './CopyButton';
export { MainLayout } from './MainLayout/MainLayout';
