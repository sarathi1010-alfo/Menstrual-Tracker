import React from 'react';
import Link from 'next/link';

export const MDXComponents = {
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
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
  // Add AEOBox component mapping
  AEOBox: ({ title, children }: { title?: string, children: React.ReactNode }) => (
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 my-8">
      {title && <h3 className="text-lg font-bold text-blue-900 mt-0 mb-4">{title}</h3>}
      <div className="text-blue-800 prose prose-blue prose-sm max-w-none">
        {children}
      </div>
    </div>
  )
};
