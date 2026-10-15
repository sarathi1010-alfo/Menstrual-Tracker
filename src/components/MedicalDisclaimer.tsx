import React from 'react';
import { AlertCircle } from 'lucide-react';

export function MedicalDisclaimer() {
  return (
    <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900 rounded-xl p-4 my-8 flex gap-3 text-orange-800 dark:text-orange-200">
      <AlertCircle className="shrink-0 mt-0.5" size={20} />
      <div className="text-sm">
        <p className="font-semibold mb-1">Medical Disclaimer</p>
        <p>
          The information provided in this content is for educational purposes only and does not constitute medical advice.
          LunaCycle is not a medical device and should not be used as a substitute for professional medical consultation, diagnosis, or treatment.
          Always consult a qualified healthcare provider with any questions regarding your menstrual health, fertility, or any medical condition.
        </p>
      </div>
    </div>
  );
}
