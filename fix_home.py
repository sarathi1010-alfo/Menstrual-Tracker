with open('src/app/page.tsx', 'r') as f:
    content = f.read()

content = content.replace("><MedicalDisclaimer /> className=", ' className=')
content = content.replace('className="space-y-16 pb-8">', 'className="space-y-16 pb-8">\n      <div className="max-w-6xl mx-auto px-6 pt-8">\n        <MedicalDisclaimer />\n      </div>')

with open('src/app/page.tsx', 'w') as f:
    f.write(content)
