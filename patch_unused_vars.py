# Fix settings page unused err
with open('src/app/settings/page.tsx', 'r') as f:
    content = f.read()

content = content.replace("} catch (err) {", "} catch (err: unknown) {")

with open('src/app/settings/page.tsx', 'w') as f:
    f.write(content)

# Fix CycleCalendar unused vars
with open('src/components/CycleCalendar.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    "const { cycles, addCycle, deleteCycle, fertileWindow, nextPeriodPrediction } = useTracker();",
    "const { cycles, fertileWindow, nextPeriodPrediction } = useTracker();"
)

with open('src/components/CycleCalendar.tsx', 'w') as f:
    f.write(content)

# Fix Transformer unused var
with open('src/components/tools/Transformer.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    "const handleTransform = () => {",
    "// eslint-disable-next-line @typescript-eslint/no-unused-vars\n  const handleTransform = () => {"
)

with open('src/components/tools/Transformer.tsx', 'w') as f:
    f.write(content)
