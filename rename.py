import os
import glob
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Simple replacements
    content = content.replace('/guides', '/blog')
    content = content.replace("from '@/data/guides'", "from '@/data/blog'")
    content = content.replace("getGuideBySlug", "getArticleBySlug")
    content = content.replace("getGuideSlugs", "getArticleSlugs")
    content = content.replace("getAllGuides", "getAllArticles")
    content = content.replace("GuideMeta", "ArticleMeta")
    content = content.replace("Guide", "Article")
    content = content.replace("guide.meta", "article.meta")
    content = content.replace("guide.content", "article.content")

    with open(filepath, 'w') as f:
        f.write(content)

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            filepath = os.path.join(root, file)
            process_file(filepath)
