import Link from 'next/link';
import React, { AnchorHTMLAttributes, ImgHTMLAttributes } from 'react';

export const MDXComponents = {
  a: ({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href && (href.startsWith('/') || href.startsWith('#'))) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <a target="_blank" rel="noopener noreferrer" href={href} {...props}>
        {children}
      </a>
    );
  },
  img: ({ src, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="rounded-lg shadow-sm" loading="lazy" {...props} />
  ),
};
