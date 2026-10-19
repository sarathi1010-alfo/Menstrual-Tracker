import Link from 'next/link';
import React, { AnchorHTMLAttributes } from 'react';

export const MDXComponents = {
  a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const { href, children, ...rest } = props;
    const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

    if (isInternalLink) {
      return (
        <Link href={href} {...rest}>
          {children}
        </Link>
      );
    }

    return (
      <a target="_blank" rel="noopener noreferrer" href={href} {...rest}>
        {children}
      </a>
    );
  },
};
