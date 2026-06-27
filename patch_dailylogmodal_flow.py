with open('src/components/DailyLogModal.tsx', 'r') as f:
    content = f.read()

# Make flow selection always visible
content = content.replace(
    "<div className={`transition-all duration-300 ${isPeriodStart || flow ? 'block' : 'hidden'}`}>",
    "<div className=\"transition-all duration-300 block\">"
)

with open('src/components/DailyLogModal.tsx', 'w') as f:
    f.write(content)
