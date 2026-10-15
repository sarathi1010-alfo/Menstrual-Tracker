import React from 'react';
import { AlertCircle } from 'lucide-react';

export function MedicalDisclaimer() {
  return (
    <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 shadow-sm mt-8 mb-10 dark:bg-orange-950/20 dark:border-orange-900/30">
      <h3 className="text-sm font-bold text-orange-800 dark:text-orange-300 uppercase tracking-wider mb-2 flex items-center">
        <AlertCircle size={16} className="mr-2" /> Medical Disclaimer
      </h3>
      <p className="text-sm text-orange-900 dark:text-orange-200 leading-relaxed m-0">
        The information provided in this content is for educational purposes only and does not constitute medical advice. LunaCycle is not a medical device and should not be used as a substitute for professional medical consultation, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding your menstrual health, fertility, or any medical condition.
      </p>
    </div>
  );
}
