import re

with open('src/app/blog/[slug]/page.tsx', 'r') as f:
    content = f.read()

content = re.sub(r'\bguide\.', 'article.', content)

with open('src/app/blog/[slug]/page.tsx', 'w') as f:
    f.write(content)
