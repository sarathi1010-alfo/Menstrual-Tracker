import React from 'react';
import Link from 'next/link';

const CustomLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const href = props.href;
  if (href && (href.startsWith('/') || href.startsWith('#'))) {
    return <Link href={href} {...props} />;
  }
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const MDXComponents = {
  a: CustomLink,
};

export default MDXComponents;
