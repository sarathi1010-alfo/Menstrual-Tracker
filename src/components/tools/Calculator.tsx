'use client';

import React, { useState } from 'react';

interface CalculatorProps {
  toolName: string;
  calculateFn: (inputs: Record<string, string | number>) => number | string;
  inputConfig: { key: string; label: string; type: 'number' | 'date'; defaultValue?: string | number }[];
  resultLabel: string;
}

export function Calculator({ toolName, calculateFn, inputConfig, resultLabel }: CalculatorProps) {
  const [inputs, setInputs] = useState<Record<string, string | number>>({});
  const [result, setResult] = useState<number | string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(calculateFn(inputs));
  };

  return (
    <div className="card p-6 bg-[var(--surface)] border border-gray-200 dark:border-gray-800 rounded-2xl">
      <h3 className="heading-3 mb-4">{toolName}</h3>
      <form onSubmit={handleCalculate} className="space-y-4">
        {inputConfig.map((config) => (
          <div key={config.key} className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-[var(--foreground)]">{config.label}</label>
            <input
              type={config.type}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
              onChange={(e) => setInputs({ ...inputs, [config.key]: config.type === 'number' ? Number(e.target.value) : e.target.value })}
              required
            />
          </div>
        ))}
        <button type="submit" className="button-primary w-full py-2 rounded-xl mt-4">
          Calculate
        </button>
      </form>

      {result !== null && (
        <div className="mt-6 p-4 bg-[var(--primary)]/10 rounded-xl text-center">
          <p className="text-sm text-[var(--muted)]">{resultLabel}</p>
          <p className="text-2xl font-bold text-[var(--primary)] mt-1">{result}</p>
        </div>
      )}
    </div>
  );
}