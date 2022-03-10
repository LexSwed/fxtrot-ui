import { css, styled } from '../stitches.config';

export const listStyles = css({
  'width': '100%',
  'm': 0,
  'p': '$1',
  'overflowY': 'auto',
  'maxHeight': '240px',
  'focusRing': '$focusRing',
  '&:empty': {
    display: 'none',
  },
});

export const FloatingList = styled('div', listStyles);
