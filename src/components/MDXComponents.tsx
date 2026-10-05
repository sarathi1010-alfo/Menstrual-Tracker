import React from 'react';
import Link from 'next/link';
import { MedicalDisclaimer } from './MedicalDisclaimer';

export const MDXComponents = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const { href, ...rest } = props;
    if (href?.startsWith('/') || href?.startsWith('#')) {
      return <Link href={href} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)} />;
    }
    return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />;
  },
  MedicalDisclaimer: MedicalDisclaimer,
};
