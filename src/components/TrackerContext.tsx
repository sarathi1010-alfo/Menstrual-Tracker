'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CycleRecord } from '../lib/types';
import { calculateAverageCycleLength, predictNextPeriod, calculateFertileWindow } from '../lib/date';

interface TrackerState {
  cycles: CycleRecord[];
  isLoading: boolean;
  addCycle: (cycle: Omit<CycleRecord, 'id'>) => void;
  updateCycle: (id: string, cycle: Partial<CycleRecord>) => void;
  deleteCycle: (id: string) => void;
  averageCycleLength: number;
  nextPeriodPrediction: Date | null;
  fertileWindow: { start: Date; end: Date; ovulation: Date } | null;
}

const TrackerContext = createContext<TrackerState | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'menstrual-tracker-cycles';

export function TrackerProvider({ children }: { children: ReactNode }) {
  const [cycles, setCycles] = useState<CycleRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    // Avoid synchronous state updates during initial render phase in StrictMode
    const timeoutId = setTimeout(() => {
      let loadedCycles: CycleRecord[] = [];
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
          loadedCycles = JSON.parse(stored);
        }
      } catch (e) {
        console.error('Failed to load cycles from local storage', e);
      }

      setCycles(loadedCycles);
      setIsLoading(false);
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  // Save to localStorage whenever cycles change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cycles));
    }
  }, [cycles, isLoading]);

  const addCycle = (cycle: Omit<CycleRecord, 'id'>) => {
    const newCycle: CycleRecord = {
      ...cycle,
      id: crypto.randomUUID(),
    };
    setCycles(prev => [...prev, newCycle]);
  };

  const updateCycle = (id: string, updates: Partial<CycleRecord>) => {
    setCycles(prev =>
      prev.map(cycle => (cycle.id === id ? { ...cycle, ...updates } : cycle))
    );
  };

  const deleteCycle = (id: string) => {
    setCycles(prev => prev.filter(cycle => cycle.id !== id));
  };

  const averageCycleLength = calculateAverageCycleLength(cycles);
  const nextPeriodPrediction = predictNextPeriod(cycles);
  const fertileWindow = nextPeriodPrediction ? calculateFertileWindow(nextPeriodPrediction) : null;

  return (
    <TrackerContext.Provider
      value={{
        cycles,
        isLoading,
        addCycle,
        updateCycle,
        deleteCycle,
        averageCycleLength,
        nextPeriodPrediction,
        fertileWindow,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
}

export function useTracker() {
  const context = useContext(TrackerContext);
  if (context === undefined) {
    throw new Error('useTracker must be used within a TrackerProvider');
  }
  return context;
}
