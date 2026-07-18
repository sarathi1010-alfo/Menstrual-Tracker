import re

with open('src/lib/mdx.ts', 'r') as f:
    content = f.read()

content = content.replace("const guidesDirectory = path.join(process.cwd(), 'src/data/blog');", "const articlesDirectory = path.join(process.cwd(), 'src/data/blog');")
content = content.replace("guidesDirectory", "articlesDirectory")
content = content.replace("const guides = slugs", "const articles = slugs")
content = content.replace(".filter((guide): guide is Article => guide !== null)", ".filter((article): article is Article => article !== null)")
content = content.replace(".map((guide) => article.meta)", ".map((article) => article.meta)")
content = content.replace("return guides;", "return articles;")
content = content.replace("Error reading guide", "Error reading article")

with open('src/lib/mdx.ts', 'w') as f:
    f.write(content)
