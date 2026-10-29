const fs = require('fs');
let layoutContent = fs.readFileSync('src/app/layout.tsx', 'utf8');

if (!layoutContent.includes('TrackerProvider')) {
  layoutContent = `
import { TrackerProvider } from '@/components/TrackerProvider';
` + layoutContent;
}

// Check if we need to add TrackerProvider wrap, actually Layout already wraps it, let's check
console.log('Done');
