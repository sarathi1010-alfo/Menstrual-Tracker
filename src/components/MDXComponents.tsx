import Link from 'next/link';
import React, { AnchorHTMLAttributes } from 'react';

type CustomLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

const CustomLink: React.FC<CustomLinkProps> = (props) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href} className="text-primary hover:underline">
        {props.children}
      </Link>
    );
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:underline"
      {...props}
    />
  );
};

export const components = {
  a: CustomLink,
};
