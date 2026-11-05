import React from 'react';
import Link from 'next/link';

export const MDXComponents = {
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href && (href.startsWith('/') || href.startsWith('#'))) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
  MedicalDisclaimer: () => (
    <div className="p-4 my-6 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-lg shadow-sm">
      <p className="text-sm text-red-800 dark:text-red-200 font-semibold mb-1">
        ⚠️ MEDICAL DISCLAIMER
      </p>
      <p className="text-xs text-red-700 dark:text-red-300/80 leading-relaxed m-0">
        The information provided in this content is for educational purposes only and does not constitute medical advice. LunaCycle is not a medical device and should not be used as a substitute for professional medical consultation, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding your menstrual health, fertility, or any medical condition.
      </p>
    </div>
  ),
};
