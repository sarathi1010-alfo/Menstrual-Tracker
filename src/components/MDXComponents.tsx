import React from 'react';
import Link from 'next/link';
import { MDXComponents } from 'mdx/types';

export const mdxComponents: MDXComponents = {
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
