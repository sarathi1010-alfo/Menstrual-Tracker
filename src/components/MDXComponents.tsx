import React from 'react';
import Link from 'next/link';

export const MDXComponents = {
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (!href) return <a {...props}>{children}</a>;

    if (href.startsWith('/') || href.startsWith('#')) {
      // Removing any type assertion that might cause trouble if properties do not align 100%
      // But typically we can pass down standard a tag props to Link, except ref might be an issue.
      // Omit ref here just in case if it's there implicitly. Next Link passes other props correctly.
      return (
        <Link href={href} {...(props as Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>)}>
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
