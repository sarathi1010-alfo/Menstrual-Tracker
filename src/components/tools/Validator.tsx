'use client';

import React, { useState } from 'react';

interface ValidatorProps {
  toolName: string;
  validateFn: (input: string) => { isValid: boolean; message: string; details?: string };
  inputLabel: string;
  placeholder?: string;
}

export function Validator({ toolName, validateFn, inputLabel, placeholder }: ValidatorProps) {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<{ isValid: boolean; message: string; details?: string } | null>(null);

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(validateFn(value));
  };

  return (
    <div className="card p-6 bg-[var(--surface)] border border-gray-200 dark:border-gray-800 rounded-2xl">
      <h3 className="heading-3 mb-4">{toolName}</h3>
      <form onSubmit={handleValidate} className="space-y-4">
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium">{inputLabel}</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
            required
          />
        </div>
        <button type="submit" className="button-primary w-full py-2 rounded-xl">
          Validate
        </button>
      </form>

      {result && (
        <div className={`mt-6 p-4 rounded-xl text-left border ${result.isValid ? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300' : 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300'}`}>
          <p className="font-bold flex items-center gap-2">
            {result.isValid ? '✓ Valid' : '✗ Invalid'}
          </p>
          <p className="mt-1 text-sm">{result.message}</p>
          {result.details && <p className="mt-2 text-xs opacity-80">{result.details}</p>}
        </div>
      )}
    </div>
  );
}