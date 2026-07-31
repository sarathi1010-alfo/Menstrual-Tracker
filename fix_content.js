const fs = require('fs');
const path = require('path');

const mdxFiles = [
  'menstrual-cycle-101-beginners-guide.mdx',
  'cycle-phases-explained-follicular-ovulation-luteal.mdx',
  'hormones-and-your-cycle-explained.mdx',
  'how-to-track-your-cycle-step-by-step.mdx',
  'understanding-your-period-normal-vs-not-normal.mdx',
  'what-is-menstrual-cycle.mdx',
  'what-is-ovulation.mdx',
  'what-is-fertile-window.mdx',
  'what-is-luteal-phase.mdx',
  'what-is-follicular-phase.mdx',
  'cycle-tracking-teens-guide.mdx',
  'pcos-and-cycle-tracking-guide.mdx'
];

mdxFiles.forEach(file => {
  const filePath = path.join('src/data/blog', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/\[LunaCycle\]\(\/tracker\)/g, '[LunaCycle](/)');
    fs.writeFileSync(filePath, content);
  }
});
