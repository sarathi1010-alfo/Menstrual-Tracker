'use client';

import React, { useState, useEffect } from 'react';
import { useTracker } from './TrackerContext';
import { DailyLog } from '../lib/types';
import { X, Check } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface DailyLogModalProps {
  date: string; // ISO string
  isOpen: boolean;
  onClose: () => void;
}

export function DailyLogModal({ date, isOpen, onClose }: DailyLogModalProps) {
  const { cycles, addCycle, deleteCycle, dailyLogs, updateDailyLog } = useTracker();

  // Local state for modal
  const [isPeriodStart, setIsPeriodStart] = useState(false);
  const [mood, setMood] = useState<number | undefined>(undefined);
  const [energy, setEnergy] = useState<number | undefined>(undefined);
  const [flow, setFlow] = useState<DailyLog['flow'] | undefined>(undefined);
  const [notes, setNotes] = useState('');

  // Load existing data when modal opens
  useEffect(() => {
    let mounted = true;
    if (isOpen && mounted) {
      // Use setTimeout to avoid synchronous setState inside effect warning
      setTimeout(() => {
        const existingCycle = cycles.find(c => c.startDate === date);
        setIsPeriodStart(!!existingCycle);

        const existingLog = dailyLogs[date];
        if (existingLog) {
          setMood(existingLog.mood);
          setEnergy(existingLog.energy);
          setFlow(existingLog.flow);
          setNotes(existingLog.notes || '');
        } else {
          setMood(undefined);
          setEnergy(undefined);
          setFlow(undefined);
          setNotes('');
        }
      }, 0);
    }
    return () => { mounted = false; };
  }, [isOpen, date, cycles, dailyLogs]);

  if (!isOpen) return null;

  const handleSave = () => {
    // Handle period start toggle
    const existingCycle = cycles.find(c => c.startDate === date);
    if (isPeriodStart && !existingCycle) {
      addCycle({ startDate: date });
    } else if (!isPeriodStart && existingCycle) {
      deleteCycle(existingCycle.id);
    }

    // Handle daily log
    updateDailyLog(date, { mood, energy, flow, notes });

    onClose();
  };

  const renderScaleOptions = (
    currentValue: number | undefined,
    onChange: (val: number) => void,
    labels: [string, string, string, string, string]
  ) => {
    return (
      <div className="flex justify-between items-center gap-2 mt-2">
        {[1, 2, 3, 4, 5].map((val, idx) => (
          <button
            key={val}
            onClick={() => onChange(val)}
            className={`flex-1 flex flex-col items-center p-2 rounded-lg border transition-all ${
              currentValue === val
                ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                : 'bg-[var(--surface)] text-[var(--muted)] border-gray-200 dark:border-gray-700 hover:border-[var(--primary)]/50'
            }`}
          >
            <span className="text-sm font-semibold">{val}</span>
            <span className="text-[10px] mt-1 text-center whitespace-nowrap opacity-80">{labels[idx]}</span>
          </button>
        ))}
      </div>
    );
  };

  const formattedDate = format(parseISO(date), 'MMMM d, yyyy');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-[var(--surface)] w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-[var(--primary)]/5">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">{formattedDate}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-[var(--muted)]">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">

          {/* Period Toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
            <div>
              <h3 className="font-semibold text-[var(--foreground)]">Period Start Day</h3>
              <p className="text-xs text-[var(--muted)] mt-1">Mark this day as the beginning of your cycle.</p>
            </div>
            <button
              onClick={() => setIsPeriodStart(!isPeriodStart)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 ${
                isPeriodStart ? 'bg-[var(--primary)]' : 'bg-gray-300 dark:bg-gray-700'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isPeriodStart ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          {/* Flow (Only show if period start is true, or you can allow logging flow anyway) */}
          <div className="transition-all duration-300 block">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-2">Flow Intensity</h3>
            <div className="flex gap-2">
              {(['spotting', 'light', 'medium', 'heavy'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFlow(f)}
                  className={`px-3 py-1.5 text-xs rounded-full border capitalize transition-colors ${
                    flow === f
                      ? 'bg-[var(--accent)] text-red-900 border-[var(--accent)] font-semibold'
                      : 'bg-transparent text-[var(--muted)] border-gray-200 dark:border-gray-700 hover:border-[var(--accent)]/50'
                  }`}
                >
                  {f}
                </button>
              ))}
              {flow && (
                <button
                  onClick={() => setFlow(undefined)}
                  className="px-2 py-1.5 text-xs text-[var(--muted)] hover:text-red-500"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Mood */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Mood</h3>
            {renderScaleOptions(mood, setMood, ['Terrible', 'Bad', 'Okay', 'Good', 'Great'])}
          </div>

          {/* Energy */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Energy</h3>
            {renderScaleOptions(energy, setEnergy, ['Exhausted', 'Low', 'Normal', 'High', 'Energetic'])}
          </div>

          {/* Notes */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-2">Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How are you feeling today? Any specific symptoms?"
              className="w-full p-3 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-[var(--surface)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none h-24"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 text-sm font-medium bg-[var(--primary)] text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center gap-2 shadow-sm"
          >
            <Check size={16} />
            Save Log
          </button>
        </div>

      </div>
    </div>
  );
}
