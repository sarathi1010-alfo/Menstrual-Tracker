const fs = require('fs');
const path = require('path');

const mdxFiles = fs.readdirSync('src/data/blog').filter(file => file.endsWith('.mdx'));

mdxFiles.forEach(file => {
  const filePath = path.join('src/data/blog', file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix what-is-* links
  content = content.replace(/\/blog\/what-is-([a-zA-Z0-9-]+)/g, '/what-is-$1');

  // Fix use-case link
  content = content.replace(/\/blog\/cycle-tracking-teens-guide/g, '/use-cases/cycle-tracking-teens-guide');

  // Fix condition link
  content = content.replace(/\/blog\/pcos-and-cycle-tracking-guide/g, '/conditions/pcos-and-cycle-tracking-guide');

  fs.writeFileSync(filePath, content);
});
