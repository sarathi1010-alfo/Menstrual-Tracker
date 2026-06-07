interface AdPlaceholderProps {
  type: 'leaderboard' | 'rectangle' | 'mobile';
  className?: string;
}

export function AdPlaceholder({ type, className = '' }: AdPlaceholderProps) {
  // Define dimensions based on ad type
  const getAdStyles = () => {
    switch (type) {
      case 'leaderboard':
        return 'w-[728px] h-[90px] hidden md:flex'; // Desktop leaderboard
      case 'rectangle':
        return 'w-[300px] h-[250px] mx-auto'; // Sidebar or in-content
      case 'mobile':
        return 'w-[320px] h-[50px] md:hidden mx-auto'; // Mobile top
      default:
        return 'w-full h-auto';
    }
  };

  return (
    <div className={`my-4 flex items-center justify-center bg-gray-100 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-500 rounded-sm ${getAdStyles()} ${className}`}>
      <div className="flex flex-col items-center justify-center">
        <span className="text-xs font-semibold uppercase tracking-wider">Advertisement</span>
        <span className="text-[10px] opacity-70">
          {type === 'leaderboard' && '728x90'}
          {type === 'rectangle' && '300x250'}
          {type === 'mobile' && '320x50'}
        </span>
      </div>
    </div>
  );
}
