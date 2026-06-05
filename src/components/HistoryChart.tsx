'use client';

import React from 'react';
import { useTracker } from './TrackerContext';
import { calculateCycleLength } from '../lib/date';
import { isBefore, parseISO } from 'date-fns';

export function HistoryChart() {
  const { cycles, isLoading } = useTracker();

  if (isLoading) return null;
  if (cycles.length < 2) {
    return (
      <div className="card p-6 flex flex-col items-center justify-center text-center text-[var(--muted)] min-h-[200px]">
        <p>Log at least two periods to see your cycle history chart.</p>
      </div>
    );
  }

  // Prepare data for chart
  const sorted = [...cycles].sort((a, b) =>
    isBefore(parseISO(a.startDate), parseISO(b.startDate)) ? -1 : 1
  );

  const chartData = [];
  let totalLength = 0;

  for (let i = 0; i < sorted.length - 1; i++) {
    const length = calculateCycleLength(sorted[i].startDate, sorted[i+1].startDate);
    // filter out crazy outliers for the chart visually
    if (length > 15 && length < 50) {
      chartData.push(length);
      totalLength += length;
    }
  }

  if (chartData.length === 0) return null;

  const average = Math.round(totalLength / chartData.length);
  const max = Math.max(...chartData, 35); // Ensure reasonable Y scale

  // SVG dimensions
  const width = 100; // viewbox %
  const height = 40; // viewbox %

  return (
    <div className="card p-6">
      <h3 className="heading-3 mb-6">Cycle History</h3>

      <div className="w-full relative h-[200px]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Average Line */}
          <line
            x1="0"
            y1={height - (average / max) * height}
            x2={width}
            y2={height - (average / max) * height}
            stroke="var(--secondary)"
            strokeWidth="0.5"
            strokeDasharray="1,1"
          />

          {/* Bars */}
          {chartData.map((val, i) => {
            const barWidth = Math.min((width / chartData.length) * 0.6, 10);
            const gap = (width - (barWidth * chartData.length)) / (chartData.length + 1);
            const x = gap + i * (barWidth + gap);
            const barHeight = (val / max) * height;
            const y = height - barHeight;

            return (
              <g key={i} className="group">
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill="var(--primary)"
                  rx="1"
                  className="transition-all duration-300 hover:fill-[var(--accent)] cursor-pointer"
                />
                <text
                  x={x + barWidth / 2}
                  y={y - 2}
                  fontSize="3"
                  fill="var(--muted)"
                  textAnchor="middle"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {val}d
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm text-[var(--muted)]">
        <span>Oldest</span>
        <div className="flex items-center gap-2">
          <div className="w-3 h-[2px] bg-[var(--secondary)] border-dashed border-b-2"></div>
          <span>Avg: {average}d</span>
        </div>
        <span>Recent</span>
      </div>
    </div>
  );
}
