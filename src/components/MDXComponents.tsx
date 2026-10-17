import Link from 'next/link';
import React from 'react';

const MDXComponents = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const { href, ...rest } = props;

    if (href && (href.startsWith('/') || href.startsWith('#'))) {
      return (
        <Link href={href} {...rest} />
      );
    }

    return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />;
  },
  // Table components can be added here if needed, but standard tailwind prose handles them well
};

export default MDXComponents;
