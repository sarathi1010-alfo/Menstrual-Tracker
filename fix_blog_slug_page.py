with open('src/app/blog/[slug]/page.tsx', 'r') as f:
    content = f.read()

content = content.replace("const guide = getArticleBySlug", "const article = getArticleBySlug")
content = content.replace("if (!guide) {", "if (!article) {")
content = content.replace("Back to all guides", "Back to all articles")
content = content.replace("Was this guide helpful?", "Was this article helpful?")
content = content.replace("title: 'Guide Not Found',", "title: 'Article Not Found',")
content = content.replace("export default async function GuidePage", "export default async function ArticlePage")
content = content.replace("const allGuides = getAllArticles();", "const allArticles = getAllArticles();")
content = content.replace("const relatedGuides = allArticles", "const relatedArticles = allArticles")
content = content.replace("relatedGuides.length", "relatedArticles.length")
content = content.replace("relatedGuides.map", "relatedArticles.map")

with open('src/app/blog/[slug]/page.tsx', 'w') as f:
    f.write(content)
