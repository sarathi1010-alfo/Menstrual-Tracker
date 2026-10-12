import React from 'react';
import Link from 'next/link';

export const MDXComponents = {
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = href && (href.startsWith('/') || href.startsWith('#'));

    if (isInternal) {
      return (
        <Link href={href} className="text-pink-600 hover:text-pink-800 underline" {...props}>
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-600 hover:text-pink-800 underline"
        {...props}
      >
        {children}
      </a>
    );
  },
};
