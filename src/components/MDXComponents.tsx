import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';

export const MDXComponents = {
  a: ({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (!href) return <a {...props}>{children}</a>;

    const isInternal = href.startsWith('/') || href.startsWith('#');

    if (isInternal) {
      return (
        <Link href={href} {...props}>
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
