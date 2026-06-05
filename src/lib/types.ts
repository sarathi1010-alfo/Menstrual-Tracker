export type CycleRecord = {
  id: string;
  startDate: string; // ISO format (YYYY-MM-DD)
  endDate?: string;
  notes?: string;
  symptoms?: string[];
  flow?: 'light' | 'medium' | 'heavy' | 'spotting';
};
