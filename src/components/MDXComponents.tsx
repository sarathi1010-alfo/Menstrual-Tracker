import React from 'react';
import Link from 'next/link';

type CustomAnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const CustomLink: React.FC<CustomAnchorProps> = (props) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href} className="text-[var(--primary)] hover:underline">
        {props.children}
      </Link>
    );
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="text-[var(--primary)] hover:underline"
      {...props}
    >
      {props.children}
    </a>
  );
};

export const mdxComponents = {
  a: CustomLink,
};
