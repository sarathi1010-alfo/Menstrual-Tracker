import React from 'react';
import { AlertCircle } from 'lucide-react';

export const MedicalDisclaimer: React.FC = () => {
  return (
    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl p-4 my-8 flex items-start gap-3">
      <AlertCircle className="text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" size={20} />
      <div className="text-sm text-amber-900 dark:text-amber-200">
        <strong className="font-semibold block mb-1">Medical Disclaimer</strong>
        The information provided by LunaCycle is for educational purposes only and does not constitute medical advice. LunaCycle is not a medical device and should not be used as a substitute for professional medical consultation, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding your menstrual health, fertility, or any medical condition.
      </div>
    </div>
  );
};
