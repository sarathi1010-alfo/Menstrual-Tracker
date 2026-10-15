import Link from 'next/link';
import React from 'react';

export const MDXComponents = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const { href, ...rest } = props;
    if (href && (href.startsWith('/') || href.startsWith('#'))) {
      return <Link href={href} {...rest} />;
    }
    return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />;
  },
  // Add other standard mappings as necessary, e.g., Next.js Image
};
