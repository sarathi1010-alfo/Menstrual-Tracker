with open('src/app/blog/page.tsx', 'r') as f:
    content = f.read()

content = content.replace("<header", "<MedicalDisclaimer />\n      <header")

with open('src/app/blog/page.tsx', 'w') as f:
    f.write(content)
