import { ComponentProps, forwardRef } from 'react';
import { classed as css, VariantProps } from '@tw-classed/core';
import { clsx } from 'clsx';

import type { ForwardRefComponent } from '../utils/polymorphic';

interface TextProps extends VariantProps<typeof textCss>, ComponentProps<'div'> {}

export const Text = forwardRef(({ as: As = 'span', textStyle = 'body-md', tone, align, className, ...props }, ref) => {
  return <As className={clsx(textCss({ textStyle, tone, align }), className)} {...props} ref={ref} />;
}) as ForwardRefComponent<'span', TextProps>;

const textCss = css({
  variants: {
    textStyle: {
      'body-sm': 'text-xs',
      'body-md': 'text-sm',
      'body-lg': 'text-md',
      'body-xl': 'text-lg',
      'label-sm': 'text-xs',
      'label-md': 'text-sm font-semibold',
      'label-lg': 'text-md font-semibold',
      'title-sm': 'text-xl',
      'title-md': 'text-2xl',
      'title-lg': 'text-3xl',
      'headline-sm': 'text-3xl font-bold',
      'headline-md': 'text-4xl font-bold',
      'headline-lg': 'text-5xl font-bold',
      'overline': 'text-xs uppercase tracking-wider',
      'mono-sm': 'font-mono text-xs',
      'mono-md': 'font-mono text-sm',
      'mono-lg': 'font-mono text-md',
    },
    tone: {
      neutral: 'text-on-background',
      accent: 'text-primary',
      light: 'text-on-surface-variant',
      success: 'text-success',
      danger: 'text-error',
    },
    align: {
      start: 'text-start',
      center: 'text-center',
      end: 'text-end',
      justify: 'text-justify',
    },
  },
});
