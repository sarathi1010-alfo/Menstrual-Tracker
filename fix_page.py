import re

with open('src/app/page.tsx', 'r') as f:
    content = f.read()

content = content.replace('<MedicalDisclaimer />\n      <MedicalDisclaimer />', '<MedicalDisclaimer />')

with open('src/app/page.tsx', 'w') as f:
    f.write(content)
