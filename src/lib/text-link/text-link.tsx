import { type ComponentProps, forwardRef } from 'react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import { classed as css, type VariantProps } from '@tw-classed/core';

import { Icon } from '../icon';
import { textCss } from '../text/text';

import styles from './text-link.module.css';

interface Props extends ComponentProps<'a'>, VariantProps<typeof linkCss> {
  external?: 'icon' | true;
}

const TextLink = forwardRef<HTMLAnchorElement, Props>(
  ({ textStyle = 'body-md', tone, align, external, inline = true, className, children, ...props }, ref) => {
    const additionalProps = external ? { target: '_blank', rel: 'noreferrer' } : null;

    return (
      <a
        {...additionalProps}
        className={clsx(linkCss({ textStyle, tone, align, inline, external }), className)}
        {...props}
        ref={ref}
      >
        {children}
        {external === 'icon' ? <Icon size="inherit" as={ArrowTopRightOnSquareIcon} className={styles.icon} /> : null}
      </a>
    );
  }
);

TextLink.displayName = 'TextLink';

const linkCss = css(textCss, styles['text-link'], {
  variants: {
    inline: {
      true: styles['text-link--inline'],
      false: styles['text-link--standalone'],
    },
    external: {
      true: '',
      icon: styles['text-link--external-icon'],
    },
  },
});

export { TextLink };
