import React from 'react';
import Link from 'next/link';
import { MedicalDisclaimer } from './MedicalDisclaimer';

// MDX Components configuration for next-mdx-remote
export const MDXComponents = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const { href, ...rest } = props;
    if (!href) return <a {...props} />;

    // Internal links use Next.js Link
    if (href.startsWith('/') || href.startsWith('#')) {
      return (
        <Link href={href} {...rest}>
          {props.children}
        </Link>
      );
    }

    // External links open in a new tab
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={href}
        {...rest}
      />
    );
  },
  MedicalDisclaimer: MedicalDisclaimer,
};

export default MDXComponents;