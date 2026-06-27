export type CycleRecord = {
  id: string;
  startDate: string; // ISO format (YYYY-MM-DD)
  endDate?: string;
  notes?: string;
  symptoms?: string[];
  flow?: 'light' | 'medium' | 'heavy' | 'spotting';
};

export type DailyLog = {
  date: string; // ISO format (YYYY-MM-DD)
  mood?: number; // 1-5 scale
  energy?: number; // 1-5 scale
  flow?: 'light' | 'medium' | 'heavy' | 'spotting';
  symptoms?: string[];
  notes?: string;
};

export type UserPreferences = {
  lutealPhaseLength: number; // default 14
  cycleVariabilityTolerance: number; // default to ignore crazy outliers
};

export type TrackerStateData = {
  cycles: CycleRecord[];
  dailyLogs: Record<string, DailyLog>; // map of date -> DailyLog
  preferences: UserPreferences;
};
