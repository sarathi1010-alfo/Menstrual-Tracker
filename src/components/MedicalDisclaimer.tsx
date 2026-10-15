import React from 'react';
import { AlertCircle } from 'lucide-react';

export function MedicalDisclaimer() {
  return (
    <div className="bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-500 p-4 my-8 rounded-r-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-0.5">
          <AlertCircle className="h-5 w-5 text-amber-500" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-bold text-amber-800 dark:text-amber-200 uppercase tracking-wider mb-1">
            Medical Disclaimer
          </h3>
          <p className="text-sm text-amber-700 dark:text-amber-300">
            The information provided in this content is for educational purposes only and does not constitute medical advice. LunaCycle is not a medical device and should not be used as a substitute for professional medical consultation, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding your menstrual health, fertility, or any medical condition.
          </p>
        </div>
      </div>
    </div>
  );
}
