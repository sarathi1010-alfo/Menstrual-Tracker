import React from 'react';
import Link from 'next/link';
import { MedicalDisclaimer } from './MedicalDisclaimer';

export const MDXComponents = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const href = props.href;
    if (href?.startsWith('/') || href?.startsWith('#')) {
      return (
        <Link href={href} {...props}>
          {props.children}
        </Link>
      );
    }
    return (
      <a target="_blank" rel="noopener noreferrer" {...props}>
        {props.children}
      </a>
    );
  },
  MedicalDisclaimer,
};
