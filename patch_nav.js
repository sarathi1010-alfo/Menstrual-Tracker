const fs = require('fs');

let navContent = fs.readFileSync('src/components/Layout.tsx', 'utf8');

navContent = navContent.replace(
  '{ href: \'/guides\', label: \'Guides\' },',
  '{ href: \'/guides\', label: \'Guides\' },\n    { href: \'/blog\', label: \'Blog\' },'
);

fs.writeFileSync('src/components/Layout.tsx', navContent);
