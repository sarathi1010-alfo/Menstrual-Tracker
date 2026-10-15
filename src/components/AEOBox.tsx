import React from 'react';
import { Lightbulb } from 'lucide-react';

interface AEOBoxProps {
  title?: string;
  takeaways?: string[];
  children?: React.ReactNode;
}

export function AEOBox({ title = "Key Takeaways", takeaways, children }: AEOBoxProps) {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-6 my-8">
      <div className="flex items-center gap-2 mb-4 text-blue-700 dark:text-blue-300">
        <Lightbulb size={20} />
        <h3 className="font-bold text-lg m-0">{title}</h3>
      </div>
      {takeaways && takeaways.length > 0 ? (
        <ul className="space-y-2 mb-0">
          {takeaways.map((takeaway, index) => (
            <li key={index} className="flex items-start text-blue-900 dark:text-blue-100">
              <span className="mr-2 text-blue-500">•</span>
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {children}
    </div>
  );
}
