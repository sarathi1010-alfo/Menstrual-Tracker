import React from 'react';
import Link from 'next/link';
import { MedicalDisclaimer } from './MedicalDisclaimer';

export const MDXComponents = {
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href?.startsWith('/') || href?.startsWith('#')) {
      return (
        <Link href={href} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
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
  MedicalDisclaimer,
};
