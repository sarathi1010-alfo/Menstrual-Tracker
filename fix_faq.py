with open('src/app/faq/page.tsx', 'r') as f:
    content = f.read()
if "MedicalDisclaimer />" not in content:
    content = content.replace('className="max-w-4xl mx-auto space-y-12 py-12 px-6">', 'className="max-w-4xl mx-auto space-y-12 py-12 px-6">\n      <MedicalDisclaimer />')
with open('src/app/faq/page.tsx', 'w') as f:
    f.write(content)
