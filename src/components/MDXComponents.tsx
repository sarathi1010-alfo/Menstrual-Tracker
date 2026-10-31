import Link from 'next/link';
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

type AnchorProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

export const MDXComponents = {
  a: (props: AnchorProps) => {
    const { href, ...rest } = props;
    const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

    if (isInternalLink) {
      return (
        <Link href={href} {...rest}>
          {props.children}
        </Link>
      );
    }

    return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />;
  },
};
