const fs = require('fs');

const filesToUpdate = [
  'src/app/blog/[slug]/page.tsx',
  'src/app/use-cases/[slug]/page.tsx',
  'src/app/conditions/[slug]/page.tsx',
  'src/app/[slug]/page.tsx'
];

for (const file of filesToUpdate) {
  let content = fs.readFileSync(file, 'utf8');

  // Inject Article schema
  if (content.includes('</article>')) {
    const articleSchema = `
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.meta.title,
            "description": article.meta.summary,
            "url": absoluteUrl(\`/\${slug}\`),
            "author": {
              "@type": "Organization",
              "name": "LunaCycle"
            }
          })
        }}
      />
    `;
    content = content.replace('</article>', `${articleSchema}\n    </article>`);
    fs.writeFileSync(file, content);
  }
}

console.log("Updated article pages with Article Schema.");
