import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface AEOBoxProps {
  takeaways: string[];
}

export function AEOBox({ takeaways }: AEOBoxProps) {
  if (!takeaways || takeaways.length === 0) return null;

  return (
    <div className="bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-xl p-6 my-8">
      <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
        Key Takeaways
      </h3>
      <ul className="space-y-2">
        {takeaways.map((takeaway, index) => (
          <li key={index} className="flex gap-3 text-[var(--muted)]">
            <CheckCircle2 className="text-[var(--primary)] shrink-0 mt-0.5" size={18} />
            <span>{takeaway}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
