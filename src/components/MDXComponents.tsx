import Link from 'next/link';
import React, { AnchorHTMLAttributes } from 'react';
import { MedicalDisclaimer } from './MedicalDisclaimer';

export const MDXComponents = {
  a: ({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href && (href.startsWith('/') || href.startsWith('#'))) {
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
  MedicalDisclaimer: () => <MedicalDisclaimer />,
};
