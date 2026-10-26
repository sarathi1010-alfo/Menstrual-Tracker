import React from 'react';
import Link from 'next/link';

interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

const CustomLink = ({ href, children, ...props }: CustomLinkProps) => {
  if (!href) return <a {...props}>{children}</a>;

  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a target="_blank" rel="noopener noreferrer" href={href} {...props}>
      {children}
    </a>
  );
};

export const MDXComponents = {
  a: CustomLink,
};
