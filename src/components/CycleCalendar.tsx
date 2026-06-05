'use client';

import React from 'react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, addMonths, subMonths, isSameMonth, isSameDay, startOfMonth, endOfMonth, parseISO } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTracker } from './TrackerContext';
import { cn } from '@/lib/utils';
import { getValidDateString } from '@/lib/date';

export function CycleCalendar() {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const handlePreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const isPeriodDay = (date: Date) => {
    return cycles.some(cycle => {
      if (!cycle.endDate) {
        // If no end date, assume 5 days length for display purposes
        const start = parseISO(cycle.startDate);
        const end = new Date(start);
        end.setDate(end.getDate() + 4);
        return date >= start && date <= end;
      }
      return date >= parseISO(cycle.startDate) && date <= parseISO(cycle.endDate);
    });
  };

  const { cycles, addCycle, deleteCycle, fertileWindow, nextPeriodPrediction } = useTracker();

  const handleDayClick = (date: Date) => {
    const dateStr = getValidDateString(date);
    const existingCycle = cycles.find(c => c.startDate === dateStr);

    if (existingCycle) {
      if (window.confirm("Remove this period start date?")) {
        deleteCycle(existingCycle.id);
      }
      return;
    }

    addCycle({ startDate: dateStr });
  };

  return (
    <div className="card p-4 md:p-6 w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button onClick={handlePreviousMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
          <ChevronLeft size={20} />
        </button>
        <h2 className="heading-3">{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-[var(--muted)] py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => {
          const isPeriod = isPeriodDay(day);
          const isPredicted = nextPeriodPrediction && isSameDay(day, nextPeriodPrediction);
          const isFertile = fertileWindow && day >= fertileWindow.start && day <= fertileWindow.end;
          const isOvulation = fertileWindow && isSameDay(day, fertileWindow.ovulation);

          return (
            <button
              key={idx}
              onClick={() => handleDayClick(day)}
              className={cn(
                "h-10 w-full rounded-full flex items-center justify-center text-sm transition-all",
                !isSameMonth(day, monthStart) && "text-gray-300 dark:text-gray-600",
                isSameMonth(day, monthStart) && "hover:bg-gray-100 dark:hover:bg-gray-800",
                isPeriod && "bg-[var(--accent)] text-red-900 font-bold hover:bg-[#F0A08E]",
                isPredicted && !isPeriod && "border-2 border-[var(--accent)] border-dashed text-[var(--accent)]",
                isFertile && !isPeriod && !isPredicted && "bg-[var(--secondary)]/30 text-green-900",
                isOvulation && "border-2 border-[var(--secondary)]",
                isSameDay(day, new Date()) && !isPeriod && !isPredicted && !isFertile && "bg-[var(--primary)] text-white"
              )}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-4 text-xs text-[var(--muted)] justify-center">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[var(--accent)]"></div>
          <span>Period</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full border-2 border-[var(--accent)] border-dashed"></div>
          <span>Predicted</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[var(--secondary)]/30"></div>
          <span>Fertile Window</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[var(--primary)]"></div>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}
