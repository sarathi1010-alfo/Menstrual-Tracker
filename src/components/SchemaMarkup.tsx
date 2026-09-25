import React, { useId } from 'react';

export function SchemaMarkup({ schema }: { schema: Record<string, unknown> }) {
  const id = useId();
  return (
    <script
      id={`schema-${id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
