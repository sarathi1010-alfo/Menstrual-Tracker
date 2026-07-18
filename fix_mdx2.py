with open('src/lib/mdx.ts', 'r') as f:
    content = f.read()

content = content.replace("tags: string[];", "tags: string[];\n  takeaways?: string[];\n  faqs?: { question: string; answer: string }[];")
content = content.replace("tags: data.tags || [],", "tags: data.tags || [],\n        takeaways: data.takeaways || [],\n        faqs: data.faqs || [],")

with open('src/lib/mdx.ts', 'w') as f:
    f.write(content)
