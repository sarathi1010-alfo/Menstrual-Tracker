import React from 'react';
import Link from 'next/link';
import { MedicalDisclaimer } from './MedicalDisclaimer';

export const MDXComponents = {
  MedicalDisclaimer,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const { href, ...rest } = props;
    if (href && (href.startsWith('/') || href.startsWith('#'))) {
      return (
        <Link href={href} {...rest} />
      );
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" {...rest} />;
  },
};
