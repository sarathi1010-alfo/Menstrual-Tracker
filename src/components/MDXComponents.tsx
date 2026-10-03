import React from 'react';
import Link from 'next/link';
import MedicalDisclaimer from './MedicalDisclaimer';

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const CustomLink = (props: AnchorProps) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href} className="text-indigo-600 hover:text-indigo-800 underline">
        {props.children}
      </Link>
    );
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="text-indigo-600 hover:text-indigo-800 underline"
      {...props}
    />
  );
};

export const MDXComponents = {
  a: CustomLink,
  MedicalDisclaimer,
};
