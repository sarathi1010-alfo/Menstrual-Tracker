with open('src/components/TrackerContext.tsx', 'r') as f:
    content = f.read()

content = content.replace("} | null;\n}", "}")
content = content.replace("}export function useTracker", "}\n\nexport function useTracker")

with open('src/components/TrackerContext.tsx', 'w') as f:
    f.write(content)
