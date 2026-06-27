'use client';

import React, { useState } from 'react';

interface TransformerProps {
  toolName: string;
  transformFn: (input: string) => string;
  inputLabel: string;
  outputLabel: string;
}

export function Transformer({ toolName, transformFn, inputLabel, outputLabel }: TransformerProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleTransform = () => {
    setOutput(transformFn(input));
  };

  return (
    <div className="card p-6 bg-[var(--surface)] border border-gray-200 dark:border-gray-800 rounded-2xl">
      <h3 className="heading-3 mb-4">{toolName}</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">{inputLabel}</label>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              // Auto transform as they type
              setOutput(transformFn(e.target.value));
            }}
            className="w-full h-48 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent resize-none focus:ring-2 focus:ring-[var(--primary)] outline-none"
            placeholder="Paste or type here..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">{outputLabel}</label>
          <div className="w-full h-48 p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 overflow-auto relative group">
            {output ? (
              <pre className="whitespace-pre-wrap text-sm">{output}</pre>
            ) : (
              <span className="text-gray-400 text-sm">Output will appear here...</span>
            )}

            {output && (
              <button
                onClick={() => navigator.clipboard.writeText(output)}
                className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                title="Copy to clipboard"
              >
                📋
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}