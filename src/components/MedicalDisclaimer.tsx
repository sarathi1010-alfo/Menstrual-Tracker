import React from 'react';
import { AlertTriangle } from 'lucide-react';

export function MedicalDisclaimer() {
  return (
    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 my-6">
      <div className="flex gap-3">
        <AlertTriangle className="text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" size={20} />
        <div className="text-sm text-amber-900 dark:text-amber-200 space-y-1">
          <p className="font-semibold">Medical Disclaimer</p>
          <p>
            The information provided in this content is for educational purposes only and does not constitute medical advice.
            LunaCycle is not a medical device and should not be used as a substitute for professional medical consultation,
            diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding your menstrual
            health, fertility, or any medical condition.
          </p>
        </div>
      </div>
    </div>
  );
}
