import re

with open('src/lib/date.ts', 'r') as f:
    content = f.read()

# Update import
content = content.replace(
    "import { CycleRecord } from './types';",
    "import { CycleRecord, UserPreferences } from './types';"
)

# Update predictNextPeriod
content = content.replace(
    "export function predictNextPeriod(cycles: CycleRecord[]): Date | null {",
    "export function predictNextPeriod(cycles: CycleRecord[], preferences?: UserPreferences): Date | null {"
)

content = re.sub(
    r"const averageLength = calculateAverageCycleLength\(cycles\);\s*return addDays\(parseISO\(lastCycle\.startDate\), averageLength\);",
    r"const averageLength = calculateAverageCycleLength(cycles);\n  return addDays(parseISO(lastCycle.startDate), averageLength);",
    content
)

# Update calculateFertileWindow
content = content.replace(
    "export function calculateFertileWindow(nextPeriodStart: Date): { start: Date, end: Date, ovulation: Date } {",
    "export function calculateFertileWindow(nextPeriodStart: Date, preferences?: UserPreferences): { start: Date, end: Date, ovulation: Date } {"
)

content = re.sub(
    r"const ovulation = addDays\(nextPeriodStart, -14\);",
    r"const lutealPhase = preferences?.lutealPhaseLength || 14;\n  const ovulation = addDays(nextPeriodStart, -lutealPhase);",
    content
)

with open('src/lib/date.ts', 'w') as f:
    f.write(content)
