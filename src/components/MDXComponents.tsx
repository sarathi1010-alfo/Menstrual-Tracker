import Link from 'next/link';

export const MDXComponents = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const { href, ...rest } = props;

    if (!href) return <a {...rest} />;

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
