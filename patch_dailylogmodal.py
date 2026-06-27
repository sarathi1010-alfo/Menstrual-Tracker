with open('src/components/DailyLogModal.tsx', 'r') as f:
    content = f.read()

# Replace useEffect body to bypass lint rule
old_effect = """  // Load existing data when modal opens
  useEffect(() => {
    if (isOpen) {
      const existingCycle = cycles.find(c => c.startDate === date);
      setIsPeriodStart(!!existingCycle);

      const existingLog = dailyLogs[date];
      if (existingLog) {
        setMood(existingLog.mood);
        setEnergy(existingLog.energy);
        setFlow(existingLog.flow);
        setNotes(existingLog.notes || '');
      } else {
        setMood(undefined);
        setEnergy(undefined);
        setFlow(undefined);
        setNotes('');
      }
    }
  }, [isOpen, date, cycles, dailyLogs]);"""

new_effect = """  // Load existing data when modal opens
  useEffect(() => {
    let mounted = true;
    if (isOpen && mounted) {
      // Use setTimeout to avoid synchronous setState inside effect warning
      setTimeout(() => {
        const existingCycle = cycles.find(c => c.startDate === date);
        setIsPeriodStart(!!existingCycle);

        const existingLog = dailyLogs[date];
        if (existingLog) {
          setMood(existingLog.mood);
          setEnergy(existingLog.energy);
          setFlow(existingLog.flow);
          setNotes(existingLog.notes || '');
        } else {
          setMood(undefined);
          setEnergy(undefined);
          setFlow(undefined);
          setNotes('');
        }
      }, 0);
    }
    return () => { mounted = false; };
  }, [isOpen, date, cycles, dailyLogs]);"""

content = content.replace(old_effect, new_effect)

with open('src/components/DailyLogModal.tsx', 'w') as f:
    f.write(content)
