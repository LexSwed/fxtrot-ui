import { type ComponentProps, forwardRef } from 'react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import { classed as css, VariantProps } from '@tw-classed/core';

import { Icon } from '../icon';
import { textCss } from '../text-1/text';

import styles from './text-link.module.css';

interface Props extends ComponentProps<'a'>, VariantProps<typeof linkCss> {
  external?: 'icon' | true;
}

const TextLink = forwardRef<HTMLAnchorElement, Props>((props, ref) => {
  const { external, inline = true, children, className } = props;
  const additionalProps = external ? { target: '_blank', rel: 'noreferrer' } : null;

  return (
    <a {...additionalProps} className={clsx(linkCss({ inline, external, ...props }), className)} {...props} ref={ref}>
      {children}
      {external === 'icon' ? <Icon size="inherit" as={ArrowTopRightOnSquareIcon} /> : null}
    </a>
  );
});

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
