import re

with open('src/lib/date.ts', 'r') as f:
    content = f.read()

# Update calculateAverageCycleLength
content = content.replace(
    "export function calculateAverageCycleLength(cycles: CycleRecord[]): number {",
    "export function calculateAverageCycleLength(cycles: CycleRecord[], preferences?: UserPreferences): number {"
)

content = re.sub(
    r"if \(length > 15 && length < 50\) {",
    r"const tolerance = preferences?.cycleVariabilityTolerance || 7;\n    const lowerBound = AVERAGE_CYCLE_LENGTH - tolerance - 6; // ~15\n    const upperBound = AVERAGE_CYCLE_LENGTH + tolerance + 15; // ~50\n    if (length > lowerBound && length < upperBound) {",
    content
)

with open('src/lib/date.ts', 'w') as f:
    f.write(content)
