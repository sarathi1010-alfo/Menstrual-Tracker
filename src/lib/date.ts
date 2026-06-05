import { CycleRecord } from './types';
import { differenceInDays, addDays, parseISO, isBefore, format } from 'date-fns';

export const AVERAGE_CYCLE_LENGTH = 28;
export const AVERAGE_PERIOD_LENGTH = 5;

// Calculate cycle length for a given record (based on the next record's start date)
export function calculateCycleLength(currentStart: string, nextStart: string): number {
  return differenceInDays(parseISO(nextStart), parseISO(currentStart));
}

// Calculate the average cycle length from an array of records
export function calculateAverageCycleLength(cycles: CycleRecord[]): number {
  if (!cycles || cycles.length < 2) return AVERAGE_CYCLE_LENGTH;

  // Sort cycles chronologically
  const sorted = [...cycles].sort((a, b) =>
    isBefore(parseISO(a.startDate), parseISO(b.startDate)) ? -1 : 1
  );

  let totalDays = 0;
  let count = 0;

  for (let i = 0; i < sorted.length - 1; i++) {
    const length = calculateCycleLength(sorted[i].startDate, sorted[i+1].startDate);
    // Ignore unusually short or long cycles to maintain a reasonable average
    if (length > 15 && length < 50) {
      totalDays += length;
      count++;
    }
  }

  return count > 0 ? Math.round(totalDays / count) : AVERAGE_CYCLE_LENGTH;
}

// Predict the next period start date
export function predictNextPeriod(cycles: CycleRecord[]): Date | null {
  if (!cycles || cycles.length === 0) return null;

  const sorted = [...cycles].sort((a, b) =>
    isBefore(parseISO(a.startDate), parseISO(b.startDate)) ? -1 : 1
  );

  const lastCycle = sorted[sorted.length - 1];
  const averageLength = calculateAverageCycleLength(cycles);

  return addDays(parseISO(lastCycle.startDate), averageLength);
}

// Calculate the estimated fertile window
export function calculateFertileWindow(nextPeriodStart: Date): { start: Date, end: Date, ovulation: Date } {
  // Ovulation typically occurs 14 days before the NEXT period
  const ovulation = addDays(nextPeriodStart, -14);
  // Fertile window is typically 5 days before ovulation to 1 day after
  const start = addDays(ovulation, -5);
  const end = addDays(ovulation, 1);

  return { start, end, ovulation };
}

// Ensure date is valid ISO string (YYYY-MM-DD)
export function getValidDateString(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}
