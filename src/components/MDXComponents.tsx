import Link from 'next/link';
import React, { AnchorHTMLAttributes } from 'react';
import { MDXComponents as MDXComponentsType } from 'mdx/types';

export const MDXComponents: MDXComponentsType = {
  a: ({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = href && (href.startsWith('/') || href.startsWith('#'));

    if (isInternal) {
      return (
        <Link href={href} {...props} className="text-[var(--primary)] hover:underline">
          {children}
        </Link>
      );
    }

    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} className="text-[var(--primary)] hover:underline">
        {children}
      </a>
    );
  },
  // We can add more custom components here (like mapping h2 to a specific styled heading)
};
