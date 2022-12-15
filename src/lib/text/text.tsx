import { ElementType, forwardRef } from 'react';
import { classed as css, VariantProps } from '@tw-classed/core';
import { clsx } from 'clsx';

import type { PolyProps, PolyRef } from '../utils/polymorphic';
import styles from './text.module.css';

interface TextProps extends VariantProps<typeof textCss> {}

export const Text = forwardRef(function Text<C extends ElementType = 'span'>(
  { as, textStyle = 'body-md', tone, align, className, ...props }: PolyProps<C, TextProps>,
  ref: PolyRef<C>
) {
  const Component = as || 'span';
  return <Component className={clsx(textCss({ textStyle, tone, align }), className)} {...props} ref={ref} />;
});

export const textCss = css(styles.text, {
  variants: {
    textStyle: {
      'body-sm': styles['body-sm'],
      'body-md': styles['body-md'],
      'body-lg': styles['body-lg'],
      'body-xl': styles['body-xl'],
      'label-sm': styles['label-sm'],
      'label-md': styles['label-md'],
      'label-lg': styles['label-lg'],
      'title-sm': styles['title-sm'],
      'title-md': styles['title-md'],
      'title-lg': styles['title-lg'],
      'headline-sm': styles['headline-sm'],
      'headline-md': styles['headline-md'],
      'headline-lg': styles['headline-lg'],
      'overline': styles['overline'],
      'mono-sm': styles['mono-sm'],
      'mono-md': styles['mono-md'],
      'mono-lg': styles['mono-lg'],
    },
    tone: {
      neutral: styles['tone--neutral'],
      accent: styles['tone--accent'],
      light: styles['tone--light'],
      success: styles['tone--success'],
      danger: styles['tone--danger'],
    },
    align: {
      start: styles['align--start'],
      center: styles['align--center'],
      end: styles['align--end'],
      justify: styles['align--justify'],
    },
  },
});
