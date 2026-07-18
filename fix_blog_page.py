with open('src/app/blog/page.tsx', 'r') as f:
    content = f.read()

content = content.replace("const guides = getAllArticles();", "const articles = getAllArticles();")
content = content.replace("{guides.map((guide) => (", "{articles.map((article) => (")
content = content.replace("key={guide.slug}", "key={article.slug}")
content = content.replace("href={`/blog/${guide.slug}`}", "href={`/blog/${article.slug}`}")
content = content.replace("guide.tags.map", "article.tags.map")
content = content.replace("{guide.title}", "{article.title}")
content = content.replace("{guide.summary}", "{article.summary}")
content = content.replace("Read guide", "Read article")

with open('src/app/blog/page.tsx', 'w') as f:
    f.write(content)
