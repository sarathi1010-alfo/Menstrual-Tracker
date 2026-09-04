import React from 'react';
import Link from 'next/link';

export const MDXComponents = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const { href, children, ...rest } = props;
    const isInternal = href && (href.startsWith('/') || href.startsWith('#'));

    if (isInternal) {
      return (
        <Link href={href as string} {...rest}>
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
