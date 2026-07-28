import { getRelatedTools } from '@/data/ecosystem';
import { ArrowUpRight } from 'lucide-react';

interface RelatedToolsWidgetProps {
  currentTags?: string[];
  excludeName?: string;
}

export function RelatedToolsWidget({
  currentTags = ['lifestyle', 'health', 'utility'],
  excludeName = 'LunaCycle'
}: RelatedToolsWidgetProps) {
  const relatedTools = getRelatedTools(currentTags, excludeName, 4);

  return (
    <div className="w-full py-12 mt-12 border-t border-gray-200 dark:border-gray-800">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-[var(--foreground)]">You might also need</h3>
          <p className="text-sm text-[var(--muted)]">Other free tools in the alfo.online ecosystem</p>
        </div>
        <a
          href="https://hub.alfo.online"
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="text-sm font-medium text-[var(--primary)] hover:underline inline-flex items-center gap-1"
        >
          View all tools <ArrowUpRight size={14} />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {relatedTools.map((tool) => (
          <a
            key={tool.name}
            href={tool.url}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="group block p-4 bg-[var(--surface)] border border-gray-200 dark:border-gray-800 rounded-xl hover:border-[var(--primary)]/50 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                {tool.name}
              </h4>
              <ArrowUpRight size={16} className="text-gray-400 group-hover:text-[var(--primary)] transition-colors" />
            </div>
            <p className="text-sm text-[var(--muted)] line-clamp-2">
              {tool.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
