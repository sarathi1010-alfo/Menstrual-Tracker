'use client';

import React, { useMemo, useState } from 'react';
import { useTracker } from './TrackerContext';
import { differenceInDays, parseISO, isBefore } from 'date-fns';

export function PatternsChart() {
  const { cycles, dailyLogs, isLoading, averageCycleLength } = useTracker();
  const [activeMetric, setActiveMetric] = useState<'mood' | 'energy'>('energy');

  // Compute average metric per cycle day
  const chartData = useMemo(() => {
    if (isLoading || cycles.length === 0) return [];

    // Initialize accumulators for up to 35 cycle days
    const maxDays = Math.min(averageCycleLength + 5, 35);
    const dayAccumulators: Record<number, { sum: number; count: number }> = {};
    for (let i = 1; i <= maxDays; i++) {
      dayAccumulators[i] = { sum: 0, count: 0 };
    }

    // Sort cycles chronologically to properly assign logs to cycles
    const sortedCycles = [...cycles].sort((a, b) =>
      isBefore(parseISO(a.startDate), parseISO(b.startDate)) ? -1 : 1
    );

    // Process all daily logs
    Object.values(dailyLogs).forEach(log => {
      const metricValue = log[activeMetric];
      if (metricValue === undefined) return;

      const logDate = parseISO(log.date);

      // Find which cycle this log belongs to
      let currentCycleStart: Date | null = null;
      for (let i = sortedCycles.length - 1; i >= 0; i--) {
        const cycleStart = parseISO(sortedCycles[i].startDate);
        if (!isBefore(logDate, cycleStart)) {
          currentCycleStart = cycleStart;
          break;
        }
      }

      if (currentCycleStart) {
        // Cycle day is 1-indexed
        const cycleDay = differenceInDays(logDate, currentCycleStart) + 1;
        if (cycleDay >= 1 && cycleDay <= maxDays) {
          dayAccumulators[cycleDay].sum += metricValue;
          dayAccumulators[cycleDay].count += 1;
        }
      }
    });

    // Calculate averages
    return Object.entries(dayAccumulators).map(([dayStr, data]) => {
      const day = parseInt(dayStr, 10);
      const average = data.count > 0 ? data.sum / data.count : null;
      return { day, average };
    });

  }, [cycles, dailyLogs, isLoading, averageCycleLength, activeMetric]);

  if (isLoading) return null;

  const hasData = chartData.some(d => d.average !== null);

  if (!hasData) {
    return (
      <div className="card p-6 flex flex-col items-center justify-center text-center text-[var(--muted)] min-h-[250px]">
        <p className="mb-2">No pattern data available yet.</p>
        <p className="text-sm">Log your mood and energy daily to see your cycle trends.</p>
      </div>
    );
  }

  // SVG Configuration
  const width = 1000;
  const height = 300;
  const paddingX = 40;
  const paddingY = 40;
  const maxMetric = 5;

  // Generate path points
  const points: {x: number, y: number, val: number, day: number}[] = [];
  const numDays = chartData.length;
  const stepX = (width - paddingX * 2) / Math.max(1, numDays - 1);

  chartData.forEach((d, i) => {
    if (d.average !== null) {
      const x = paddingX + (i * stepX);
      const y = height - paddingY - ((d.average - 1) / (maxMetric - 1)) * (height - paddingY * 2);
      points.push({ x, y, val: d.average, day: d.day });
    }
  });

  const pathD = points.length > 0
    ? `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`
    : '';

  return (
    <div className="card p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="heading-3 mb-1">Cycle Patterns</h3>
          <p className="text-sm text-[var(--muted)]">Average {activeMetric} across your cycle.</p>
        </div>

        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <button
            onClick={() => setActiveMetric('energy')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeMetric === 'energy' ? 'bg-white dark:bg-gray-700 shadow-sm text-[var(--foreground)]' : 'text-[var(--muted)] hover:text-[var(--foreground)]'
            }`}
          >
            Energy
          </button>
          <button
            onClick={() => setActiveMetric('mood')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeMetric === 'mood' ? 'bg-white dark:bg-gray-700 shadow-sm text-[var(--foreground)]' : 'text-[var(--muted)] hover:text-[var(--foreground)]'
            }`}
          >
            Mood
          </button>
        </div>
      </div>

      <div className="w-full relative h-[250px] md:h-[300px] -mx-2 md:mx-0">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Grid Lines (Y-Axis) */}
          {[1, 2, 3, 4, 5].map(val => {
            const y = height - paddingY - ((val - 1) / (maxMetric - 1)) * (height - paddingY * 2);
            return (
              <g key={val}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="currentColor"
                  strokeOpacity="0.1"
                  strokeWidth="1"
                />
                <text
                  x={paddingX - 10}
                  y={y + 4}
                  fontSize="12"
                  fill="var(--muted)"
                  textAnchor="end"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Data Path */}
          {points.length > 1 && (
            <path
              d={pathD}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="4"
              strokeLinejoin="round"
              strokeLinecap="round"
              className="drop-shadow-md"
            />
          )}

          {/* Data Points */}
          {points.map((p, i) => (
            <g key={i} className="group cursor-pointer">
              <circle
                cx={p.x}
                cy={p.y}
                r="6"
                fill="var(--surface)"
                stroke="var(--primary)"
                strokeWidth="3"
                className="transition-all duration-200 group-hover:r-[8px]"
              />
              <g className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <rect
                  x={p.x - 30}
                  y={p.y - 45}
                  width="60"
                  height="30"
                  rx="4"
                  fill="var(--foreground)"
                />
                <text
                  x={p.x}
                  y={p.y - 25}
                  fontSize="12"
                  fill="var(--background)"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {p.val.toFixed(1)}
                </text>
              </g>
            </g>
          ))}

          {/* X-Axis Labels (Cycle Days) */}
          {chartData.map((d, i) => {
            if (d.day % 5 === 0 || d.day === 1) {
              const x = paddingX + (i * stepX);
              return (
                <text
                  key={d.day}
                  x={x}
                  y={height - paddingY + 25}
                  fontSize="12"
                  fill="var(--muted)"
                  textAnchor="middle"
                >
                  Day {d.day}
                </text>
              );
            }
            return null;
          })}
        </svg>
      </div>

      <p className="text-center text-xs text-[var(--muted)] mt-4">
        Tap or hover over points to see average score (1-5 scale).
      </p>
    </div>
  );
}
