import Script from 'next/script';
import { useId } from 'react';

export const SchemaMarkup = ({ schema }: { schema: Record<string, unknown> }) => {
  const id = useId();
  return (
    <Script
      id={`schema-${id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
