import React from 'react';
import Link from 'next/link';

export const MDXComponents = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const { href, ...rest } = props;
    if (href && (href.startsWith('/') || href.startsWith('#'))) {
      return (
        <Link href={href} {...rest}>
          {props.children}
        </Link>
      );
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" {...rest} />;
  },
};
