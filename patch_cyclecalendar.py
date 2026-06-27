import re

with open('src/components/CycleCalendar.tsx', 'r') as f:
    content = f.read()

# Add imports
content = content.replace(
    "import { ChevronLeft, ChevronRight } from 'lucide-react';",
    "import { ChevronLeft, ChevronRight } from 'lucide-react';\nimport { DailyLogModal } from './DailyLogModal';"
)

# Add state
content = content.replace(
    "const [currentMonth, setCurrentMonth] = React.useState(new Date());",
    "const [currentMonth, setCurrentMonth] = React.useState(new Date());\n  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);"
)

# Update handleDayClick
old_handler = """  const handleDayClick = (date: Date) => {
    const dateStr = getValidDateString(date);
    const existingCycle = cycles.find(c => c.startDate === dateStr);

    if (existingCycle) {
      if (window.confirm("Remove this period start date?")) {
        deleteCycle(existingCycle.id);
      }
      return;
    }

    addCycle({ startDate: dateStr });
  };"""

new_handler = """  const handleDayClick = (date: Date) => {
    const dateStr = getValidDateString(date);
    setSelectedDate(dateStr);
  };"""

content = content.replace(old_handler, new_handler)

# Inject modal before closing tag
modal_inject = """      <div className="mt-6 flex flex-wrap gap-4 text-xs text-[var(--muted)] justify-center">
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

      {selectedDate && (
        <DailyLogModal
          date={selectedDate}
          isOpen={!!selectedDate}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>"""

content = re.sub(r'<div className="mt-6 flex flex-wrap gap-4 text-xs text-\[var\(--muted\)\] justify-center\">[\s\S]*?</div>\s*</div>', modal_inject, content)

with open('src/components/CycleCalendar.tsx', 'w') as f:
    f.write(content)
