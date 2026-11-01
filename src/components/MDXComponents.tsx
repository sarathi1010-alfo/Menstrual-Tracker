import Link from 'next/link';
import React, { AnchorHTMLAttributes } from 'react';

const CustomLink = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const { href, children, ...rest } = props;

  if (!href) {
    return <a {...rest}>{children}</a>;
  }

  const isInternalLink = href.startsWith('/') || href.startsWith('#');

  if (isInternalLink) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
};

export const MDXComponents = {
  a: CustomLink,
};
