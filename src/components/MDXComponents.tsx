import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';

const CustomLink = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const href = props.href;

  if (href && (href.startsWith('/') || href.startsWith('#'))) {
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
};
