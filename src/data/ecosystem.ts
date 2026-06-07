export interface EcosystemTool {
  name: string;
  url: string;
  description: string;
  tags: string[];
}

export const ecosystemTools: EcosystemTool[] = [
  {
    name: 'Resume Forge',
    url: 'https://resumeforge.alfo.online',
    description: 'Create professional resumes in minutes.',
    tags: ['productivity', 'document', 'career'],
  },
  {
    name: 'PDF Utility',
    url: 'https://pdfutility.app',
    description: 'Merge, split, and compress PDFs securely.',
    tags: ['productivity', 'document'],
  },
  {
    name: 'Palette Flow',
    url: 'https://paletteflow.alfo.online',
    description: 'Generate beautiful color palettes for your brand.',
    tags: ['design', 'brand'],
  },
  {
    name: 'QR Generator',
    url: 'https://qrgenerator.alfo.online',
    description: 'Create custom QR codes instantly.',
    tags: ['productivity', 'design', 'utility'],
  },
  {
    name: 'EMI Calculator',
    url: 'https://emicalculator.alfo.online',
    description: 'Calculate loan EMIs and plan your finances.',
    tags: ['finance', 'utility'],
  },
  {
    name: 'Pack Fit',
    url: 'https://packfit.alfo.online',
    description: 'Plan your carry-on luggage efficiently.',
    tags: ['lifestyle', 'utility'],
  }
];

export const getRelatedTools = (currentTags: string[], excludeName: string, limit = 4) => {
  return ecosystemTools
    .filter(tool => tool.name !== excludeName)
    // Sort by number of matching tags to ensure relevance
    .sort((a, b) => {
      const aMatches = a.tags.filter(tag => currentTags.includes(tag)).length;
      const bMatches = b.tags.filter(tag => currentTags.includes(tag)).length;
      return bMatches - aMatches;
    })
    .slice(0, limit);
};
