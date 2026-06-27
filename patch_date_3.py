import re

with open('src/lib/date.ts', 'r') as f:
    content = f.read()

# Update predictNextPeriod averageLength calculation
content = content.replace(
    "const averageLength = calculateAverageCycleLength(cycles);",
    "const averageLength = calculateAverageCycleLength(cycles, preferences);"
)

with open('src/lib/date.ts', 'w') as f:
    f.write(content)
