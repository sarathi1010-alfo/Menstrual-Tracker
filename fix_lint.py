import re

with open('src/app/[slug]/page.tsx', 'r') as f:
    content = f.read()
content = content.replace("import Link from 'next/link';\n", "")
with open('src/app/[slug]/page.tsx', 'w') as f:
    f.write(content)

with open('src/app/blog/[slug]/page.tsx', 'r') as f:
    content = f.read()
content = content.replace("import Link from 'next/link';\n", "")
with open('src/app/blog/[slug]/page.tsx', 'w') as f:
    f.write(content)

with open('src/app/blog/page.tsx', 'r') as f:
    content = f.read()
content = content.replace("  const fertility = allArticles.filter(a => a.category === 'fertility');\n", "")
content = content.replace("  const health = allArticles.filter(a => a.category === 'conditions');\n", "")
content = content.replace("  const privacy = allArticles.filter(a => a.category === 'privacy');\n", "")
with open('src/app/blog/page.tsx', 'w') as f:
    f.write(content)
