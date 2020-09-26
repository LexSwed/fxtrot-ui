import React from 'react';
import { FocusRing as SpectrumFocusRing } from '@react-aria/focus';
import { css } from '../stitches.config';

const focusClass = css({
  outline: 'none',
});

const focusRingClass = css({
  $outline: 0,
});

type Props = Omit<React.ComponentPropsWithRef<typeof SpectrumFocusRing>, 'focusRingClass' | 'focusClass'>;

const FocusRing: React.FC<Props> = (props) => {
  return <SpectrumFocusRing focusRingClass={focusRingClass} focusClass={focusClass} {...props} />;
};

export default FocusRing;
