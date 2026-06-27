with open('src/components/CycleCalendar.tsx', 'r') as f:
    content = f.read()

content = content.replace("    </div>\n    </div>\n  );\n}", "    </div>\n  );\n}")

with open('src/components/CycleCalendar.tsx', 'w') as f:
    f.write(content)
