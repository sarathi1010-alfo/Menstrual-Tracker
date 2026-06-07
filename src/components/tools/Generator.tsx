'use client';

import React, { useState } from 'react';

interface GeneratorProps {
  toolName: string;
  generateFn: (inputs: Record<string, string | number>) => React.ReactNode;
  inputConfig: { key: string; label: string; type: 'text' | 'date' | 'select'; options?: string[] }[];
}

export function Generator({ toolName, generateFn, inputConfig }: GeneratorProps) {
  const [inputs, setInputs] = useState<Record<string, string | number>>({});
  const [generatedContent, setGeneratedContent] = useState<React.ReactNode | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneratedContent(generateFn(inputs));
  };

  return (
    <div className="card p-6 bg-[var(--surface)] border border-gray-200 dark:border-gray-800 rounded-2xl">
      <h3 className="heading-3 mb-4">{toolName}</h3>
      <form onSubmit={handleGenerate} className="space-y-4">
        {inputConfig.map((config) => (
          <div key={config.key} className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-[var(--foreground)]">{config.label}</label>
            {config.type === 'select' ? (
              <select
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
                onChange={(e) => setInputs({ ...inputs, [config.key]: e.target.value })}
              >
                <option value="">Select...</option>
                {config.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            ) : (
              <input
                type={config.type}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
                onChange={(e) => setInputs({ ...inputs, [config.key]: e.target.value })}
                required
              />
            )}
          </div>
        ))}
        <button type="submit" className="button-primary w-full py-2 rounded-xl mt-4">
          Generate
        </button>
      </form>

      {generatedContent && (
        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
          {generatedContent}
        </div>
      )}
    </div>
  );
}