with open('src/app/sitemap.ts', 'r') as f:
    lines = f.readlines()
with open('src/app/sitemap.ts', 'w') as f:
    for line in lines:
        if line.startswith('  const guideRoutes: MetadataRoute.Sitemap = guideSlugs'):
            f.write(line)
        else:
            f.write(line.replace('url: absoluteUrl(`/${article.slug}`)', 'url: absoluteUrl(`/${article.slug}`)').replace('url: absoluteUrl(`/blog/${article.slug}`)', 'url: absoluteUrl(`/blog/${article.slug}`)'))
