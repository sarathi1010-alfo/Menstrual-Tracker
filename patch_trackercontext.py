import re

with open('src/components/TrackerContext.tsx', 'r') as f:
    content = f.read()

# Import new types
content = content.replace(
    "import { CycleRecord } from '../lib/types';",
    "import { CycleRecord, DailyLog, UserPreferences, TrackerStateData } from '../lib/types';"
)

# Update TrackerState interface
tracker_state_replace = """interface TrackerState {
  cycles: CycleRecord[];
  dailyLogs: Record<string, DailyLog>;
  preferences: UserPreferences;
  isLoading: boolean;
  addCycle: (cycle: Omit<CycleRecord, 'id'>) => void;
  updateCycle: (id: string, cycle: Partial<CycleRecord>) => void;
  deleteCycle: (id: string) => void;
  updateDailyLog: (date: string, log: Partial<DailyLog>) => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  importData: (data: string) => void;
  clearData: () => void;
  averageCycleLength: number;
  nextPeriodPrediction: Date | null;
  fertileWindow: { start: Date; end: Date; ovulation: Date } | null;
}"""

content = re.sub(r"interface TrackerState \{[\s\S]*?\}", tracker_state_replace, content)

# Update context body
provider_replace = """export function TrackerProvider({ children }: { children: ReactNode }) {
  const [cycles, setCycles] = useState<CycleRecord[]>([]);
  const [dailyLogs, setDailyLogs] = useState<Record<string, DailyLog>>({});
  const [preferences, setPreferences] = useState<UserPreferences>({
    lutealPhaseLength: 14,
    cycleVariabilityTolerance: 7
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    // Avoid synchronous state updates during initial render phase in StrictMode
    const timeoutId = setTimeout(() => {
      let loadedCycles: CycleRecord[] = [];
      let loadedDailyLogs: Record<string, DailyLog> = {};
      let loadedPreferences: UserPreferences = { lutealPhaseLength: 14, cycleVariabilityTolerance: 7 };

      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            // Migration: old format was an array of CycleRecord
            loadedCycles = parsed;
            // Save the migrated format
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
              cycles: loadedCycles,
              dailyLogs: loadedDailyLogs,
              preferences: loadedPreferences
            }));
          } else {
            // New format
            loadedCycles = parsed.cycles || [];
            loadedDailyLogs = parsed.dailyLogs || {};
            loadedPreferences = parsed.preferences || loadedPreferences;
          }
        }
      } catch (e) {
        console.error('Failed to load tracker data from local storage', e);
      }

      setCycles(loadedCycles);
      setDailyLogs(loadedDailyLogs);
      setPreferences(loadedPreferences);
      setIsLoading(false);
    }, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (!isLoading) {
      const stateToSave: TrackerStateData = {
        cycles,
        dailyLogs,
        preferences
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    }
  }, [cycles, dailyLogs, preferences, isLoading]);

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

  const updateDailyLog = (date: string, logUpdates: Partial<DailyLog>) => {
    setDailyLogs(prev => ({
      ...prev,
      [date]: { ...prev[date], date, ...logUpdates }
    }));
  };

  const updatePreferences = (prefs: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...prefs }));
  };

  const importData = (dataJson: string) => {
    try {
      const parsed = JSON.parse(dataJson);
      if (parsed.cycles) setCycles(parsed.cycles);
      if (parsed.dailyLogs) setDailyLogs(parsed.dailyLogs);
      if (parsed.preferences) setPreferences(parsed.preferences);
    } catch (e) {
      console.error('Failed to import tracker data', e);
      throw new Error('Invalid backup file format');
    }
  };

  const clearData = () => {
    setCycles([]);
    setDailyLogs({});
    setPreferences({ lutealPhaseLength: 14, cycleVariabilityTolerance: 7 });
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const averageCycleLength = calculateAverageCycleLength(cycles, preferences);
  const nextPeriodPrediction = predictNextPeriod(cycles, preferences);
  const fertileWindow = nextPeriodPrediction ? calculateFertileWindow(nextPeriodPrediction, preferences) : null;

  return (
    <TrackerContext.Provider
      value={{
        cycles,
        dailyLogs,
        preferences,
        isLoading,
        addCycle,
        updateCycle,
        deleteCycle,
        updateDailyLog,
        updatePreferences,
        importData,
        clearData,
        averageCycleLength,
        nextPeriodPrediction,
        fertileWindow,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
}"""

content = re.sub(r"export function TrackerProvider\(\{ children \}: \{ children: ReactNode \}\) \{[\s\S]*?(?=export function useTracker)", provider_replace, content)

with open('src/components/TrackerContext.tsx', 'w') as f:
    f.write(content)
