import Link from 'next/link';
import React from 'react';

// Custom components for MDX
export const MDXComponents = {
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = href && (href.startsWith('/') || href.startsWith('#'));

    if (isInternal) {
      return (
        <Link href={href} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
};
