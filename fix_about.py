with open('src/app/about/page.tsx', 'r') as f:
    content = f.read()

content = content.replace("><MedicalDisclaimer /> className=", ' className=')
content = content.replace('className="max-w-3xl mx-auto space-y-8">', 'className="max-w-3xl mx-auto space-y-8">\n      <MedicalDisclaimer />')

with open('src/app/about/page.tsx', 'w') as f:
    f.write(content)

with open('src/app/faq/page.tsx', 'r') as f:
    content2 = f.read()

content2 = content2.replace("><MedicalDisclaimer /> className=", ' className=')
content2 = content2.replace('className="max-w-3xl mx-auto">', 'className="max-w-3xl mx-auto">\n      <MedicalDisclaimer />')

with open('src/app/faq/page.tsx', 'w') as f:
    f.write(content2)

with open('src/app/blog/page.tsx', 'r') as f:
    content3 = f.read()

content3 = content3.replace('className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[var(--foreground)]">\n          <MedicalDisclaimer />\n          Knowledge Base', 'className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[var(--foreground)]">\n          Knowledge Base\n        </h1>\n        <MedicalDisclaimer />')

with open('src/app/blog/page.tsx', 'w') as f:
    f.write(content3)
