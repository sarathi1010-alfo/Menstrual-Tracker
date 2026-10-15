import Link from 'next/link';
import React from 'react';
import { MedicalDisclaimer } from './MedicalDisclaimer';

export const MDXComponents = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const { href, children, ...rest } = props;
    if (!href) return <a {...rest}>{children}</a>;

    if (href.startsWith('/') || href.startsWith('#')) {
      return <Link href={href} {...rest}>{children}</Link>;
    }

    return <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>;
  },
  MedicalDisclaimer: () => <MedicalDisclaimer />,
};
