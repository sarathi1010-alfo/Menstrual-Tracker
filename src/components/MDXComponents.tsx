import Link from 'next/link';
import React, { AnchorHTMLAttributes } from 'react';
import { MedicalDisclaimer } from './MedicalDisclaimer';

const CustomLink = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

export const MDXComponents = {
  a: CustomLink,
  MedicalDisclaimer,
};
