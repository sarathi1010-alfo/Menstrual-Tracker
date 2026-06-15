'use client';

import React, { useState } from 'react';

interface ConverterProps {
  toolName: string;
  convertFn: (value: number) => number;
  fromUnit: string;
  toUnit: string;
}

export function Converter({ toolName, convertFn, fromUnit, toUnit }: ConverterProps) {
  const [value, setValue] = useState<number | ''>('');
  const [result, setResult] = useState<number | null>(null);

  const handleConvert = (e: React.FormEvent) => {
    e.preventDefault();
    if (value !== '') {
      setResult(convertFn(Number(value)));
    }
  };

  return (
    <div className="card p-6 bg-[var(--surface)] border border-gray-200 dark:border-gray-800 rounded-2xl">
      <h3 className="heading-3 mb-4">{toolName}</h3>
      <form onSubmit={handleConvert} className="flex items-end gap-4">
        <div className="flex-1 flex flex-col space-y-1">
          <label className="text-sm font-medium">{fromUnit}</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value ? Number(e.target.value) : '')}
            className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
            required
          />
        </div>
        <button type="submit" className="button-primary px-4 py-2 rounded-xl">
          Convert
        </button>
      </form>

      {result !== null && (
        <div className="mt-6 p-4 bg-[var(--secondary)]/10 rounded-xl text-center">
          <p className="text-2xl font-bold text-[var(--secondary)]">
            {result} <span className="text-sm font-normal">{toUnit}</span>
          </p>
        </div>
      )}
    </div>
  );
}