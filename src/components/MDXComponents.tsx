import React from 'react';
import Link from 'next/link';

interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export const MDXComponents = {
  a: (props: AnchorProps) => {
    const { href, children, ...rest } = props;
    if (!href) return <a {...rest}>{children}</a>;

    if (href.startsWith('/') || href.startsWith('#')) {
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
