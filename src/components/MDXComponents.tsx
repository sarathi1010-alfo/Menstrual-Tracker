
import Link from 'next/link';
import React from 'react';

const CustomLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const href = props.href;

  if (href && (href.startsWith('/') || href.startsWith('#'))) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const MDXComponents = {
  a: CustomLink,
};

export default MDXComponents;
