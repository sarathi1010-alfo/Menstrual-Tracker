with open('src/app/blog/[slug]/page.tsx', 'r') as f:
    content = f.read()

# Add FAQ schema
new_schema = """const faqSchema = article.meta.faqs && article.meta.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.meta.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;"""

content = content.replace("const articleSchema = {", new_schema + "\n\n  const articleSchema = {")

# Add FAQ schema render
content = content.replace("<SchemaMarkup schema={articleSchema} />", "<SchemaMarkup schema={articleSchema} />\n        {faqSchema && <SchemaMarkup schema={faqSchema} />}")

# Add Takeaways (AEO box) right after quick answer block
takeaways_block = """
          {article.meta.takeaways && article.meta.takeaways.length > 0 && (
            <div className="p-5 rounded-xl bg-[var(--primary)]/5 border border-[var(--primary)]/20 shadow-sm mt-8 mb-10">
              <h2 className="text-sm font-bold text-[var(--primary)] uppercase tracking-wider mb-3">Key Takeaways</h2>
              <ul className="list-disc pl-5 space-y-2 text-[var(--foreground)]">
                {article.meta.takeaways.map((takeaway, idx) => (
                  <li key={idx}>{takeaway}</li>
                ))}
              </ul>
            </div>
          )}
"""
content = content.replace("</p>\n          </div>\n        </div>", "</p>\n          </div>\n" + takeaways_block + "\n        </div>")

# Add FAQs section right after MDX remote
faqs_block = """
        {article.meta.faqs && article.meta.faqs.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {article.meta.faqs.map((faq, idx) => (
                <div key={idx} className="border border-gray-200 dark:border-gray-800 rounded-lg p-5">
                  <h3 className="font-bold mb-2">{faq.question}</h3>
                  <p className="text-[var(--muted)]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
"""
content = content.replace("<MDXRemote source={article.content} />\n        </div>", "<MDXRemote source={article.content} />\n        </div>" + faqs_block)


with open('src/app/blog/[slug]/page.tsx', 'w') as f:
    f.write(content)
