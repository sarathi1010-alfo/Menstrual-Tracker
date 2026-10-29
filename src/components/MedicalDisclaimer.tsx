import React from 'react';
import { AlertCircle } from 'lucide-react';

export const MedicalDisclaimer = () => {
  return (
    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-8">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-amber-800 dark:text-amber-200">
          <strong className="font-semibold block mb-1">Educational Purposes Only</strong>
          The information provided by LunaCycle is for educational purposes only and does not constitute medical advice. LunaCycle is not a medical device and should not be used as a substitute for professional medical consultation, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding your menstrual health, fertility, or any medical condition.
        </p>
      </div>
    </div>
  );
};
