import re

with open('src/app/tracker/page.tsx', 'r') as f:
    content = f.read()

# Add import
content = content.replace(
    "import { HistoryChart } from '@/components/HistoryChart';",
    "import { HistoryChart } from '@/components/HistoryChart';\nimport { PatternsChart } from '@/components/PatternsChart';"
)

# Insert component after HistoryChart
content = content.replace(
    "<HistoryChart />",
    "<HistoryChart />\n          <PatternsChart />"
)

with open('src/app/tracker/page.tsx', 'w') as f:
    f.write(content)
