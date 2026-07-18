'use client';

import React from 'react';
import { useTracker } from './TrackerContext';
import { format } from 'date-fns';

export function PredictionCard() {
  const { nextPeriodPrediction, averageCycleLength, isLoading, cycles } = useTracker();

  if (isLoading) {
    return <div className="card p-6 h-32 animate-pulse bg-gray-100 dark:bg-gray-800" />;
  }

  if (cycles.length === 0) {
    return (
      <div className="card p-6 bg-gradient-to-br from-[var(--primary)] to-indigo-600 text-white">
        <h3 className="text-lg font-semibold mb-2">Welcome to LunaCycle</h3>
        <p className="text-white/80 text-sm">
          Log your first period to start getting predictions and insights.
        </p>
      </div>
    );
  }

  return (
    <div className="card p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-[var(--primary)]/10 rounded-full blur-2xl"></div>

      <h3 className="text-sm font-medium text-[var(--muted)] mb-1">Next Period</h3>
      <div className="heading-1 text-[var(--primary)] mb-4">
        {nextPeriodPrediction ? format(nextPeriodPrediction, 'MMM d') : 'Pending...'}
      </div>

      <div className="flex items-center gap-4 border-t border-gray-100 dark:border-gray-800 pt-4">
        <div>
          <div className="text-xs text-[var(--muted)] mb-0.5">Avg Cycle</div>
          <div className="font-semibold">{averageCycleLength} days</div>
        </div>
      </div>
    </div>
  );
}
