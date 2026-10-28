import React from 'react';
import Link from 'next/link';
import { MDXComponents as MDXComponentsType } from 'mdx/types';

export const MDXComponents: MDXComponentsType = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const href = props.href;
    if (href && (href.startsWith('/') || href.startsWith('#'))) {
      return (
        <Link href={href} {...props}>
          {props.children}
        </Link>
      );
    }
    return <a target="_blank" rel="noopener noreferrer" {...props} />;
  },
};
