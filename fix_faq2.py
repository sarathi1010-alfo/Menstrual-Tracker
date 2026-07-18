with open('src/app/faq/page.tsx', 'r') as f:
    content = f.read()

content = content.replace('className="max-w-3xl mx-auto space-y-8">', 'className="max-w-3xl mx-auto space-y-8">\n      <MedicalDisclaimer />')

with open('src/app/faq/page.tsx', 'w') as f:
    f.write(content)
