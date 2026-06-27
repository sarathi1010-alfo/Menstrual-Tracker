'use client';

import React, { useRef } from 'react';
import { useTracker } from '@/components/TrackerContext';
import { Download, Upload, Trash2, Settings2, RefreshCw } from 'lucide-react';

export default function SettingsPage() {
  const {
    cycles,
    dailyLogs,
    preferences,
    updatePreferences,
    importData,
    clearData
  } = useTracker();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = { cycles, dailyLogs, preferences };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cyclehub-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        importData(content);
        alert('Data successfully imported!');
      } catch {
        alert('Error importing data. Ensure the file is a valid JSON backup.');
      }
    };
    reader.readAsText(file);

    // reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleClearData = () => {
    if (window.confirm("Are you absolutely sure? This will delete all your cycle history and logs permanently.")) {
      clearData();
      alert('Data cleared successfully.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="heading-2 mb-2">Settings</h1>
        <p className="text-[var(--muted)]">Manage your local data and tune prediction algorithms.</p>
      </div>

      <div className="card p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6">
          <Settings2 className="text-[var(--primary)]" />
          <h2 className="heading-3">Prediction Algorithm</h2>
        </div>

        <p className="text-sm text-[var(--muted)] mb-8">
          Personalize the algorithm that predicts your fertile window and next period.
        </p>

        <div className="space-y-8">
          {/* Luteal Phase Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-medium text-[var(--foreground)] text-sm">Luteal Phase Length</label>
              <span className="text-[var(--primary)] font-bold">{preferences.lutealPhaseLength} days</span>
            </div>
            <p className="text-xs text-[var(--muted)] mb-3">
              The time between ovulation and your next period (typically 14 days).
            </p>
            <input
              type="range"
              min="10"
              max="17"
              value={preferences.lutealPhaseLength}
              onChange={(e) => updatePreferences({ lutealPhaseLength: parseInt(e.target.value, 10) })}
              className="w-full accent-[var(--primary)]"
            />
          </div>

          {/* Variability Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-medium text-[var(--foreground)] text-sm">Cycle Variability Tolerance</label>
              <span className="text-[var(--primary)] font-bold">{preferences.cycleVariabilityTolerance} days</span>
            </div>
            <p className="text-xs text-[var(--muted)] mb-3">
              How many irregular days the algorithm should ignore when calculating averages.
              Higher values allow for more fluctuation.
            </p>
            <input
              type="range"
              min="3"
              max="14"
              value={preferences.cycleVariabilityTolerance}
              onChange={(e) => updatePreferences({ cycleVariabilityTolerance: parseInt(e.target.value, 10) })}
              className="w-full accent-[var(--primary)]"
            />
          </div>

          <button
            onClick={() => updatePreferences({ lutealPhaseLength: 14, cycleVariabilityTolerance: 7 })}
            className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mt-4"
          >
            <RefreshCw size={14} />
            Reset to defaults
          </button>
        </div>
      </div>

      <div className="card p-6 md:p-8">
        <h2 className="heading-3 mb-6">Data Management</h2>
        <p className="text-sm text-[var(--muted)] mb-8">
          All your data is stored securely on this device. You can back it up to a file to move to another device.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleExport}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[var(--primary)] text-white rounded-xl hover:bg-indigo-600 transition-colors font-medium shadow-sm"
          >
            <Download size={18} />
            Export Backup
          </button>

          <button
            onClick={handleImportClick}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[var(--foreground)] rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            <Upload size={18} />
            Import Backup
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />
        </div>

        <div className="mt-8 pt-8 border-t border-red-100 dark:border-red-900/30">
          <h3 className="font-medium text-red-600 dark:text-red-400 mb-2">Danger Zone</h3>
          <p className="text-xs text-[var(--muted)] mb-4">
            Once you delete your data, there is no going back. Please be certain.
          </p>
          <button
            onClick={handleClearData}
            className="flex items-center gap-2 px-4 py-2 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm font-medium"
          >
            <Trash2 size={16} />
            Clear All Data
          </button>
        </div>
      </div>
    </div>
  );
}
