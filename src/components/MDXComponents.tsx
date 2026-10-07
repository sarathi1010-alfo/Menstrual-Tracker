import Link from 'next/link';
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';
import { MedicalDisclaimer } from './MedicalDisclaimer';

export const MDXComponents = {
  a: (
    props: DetailedHTMLProps<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >
  ) => {
    const { href, children, ...rest } = props;

    if (href && (href.startsWith('/') || href.startsWith('#'))) {
      return (
        <Link href={href} {...rest}>
          {children}
        </Link>
      );
    }

    return (
      <a target="_blank" rel="noopener noreferrer" href={href} {...rest}>
        {children}
      </a>
    );
  },
  MedicalDisclaimer,
};
