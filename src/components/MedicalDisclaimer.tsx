import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const MedicalDisclaimer = () => {
  return (
    <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900 rounded-lg p-4 my-8">
      <div className="flex items-start gap-3">
        <AlertTriangle className="text-orange-600 dark:text-orange-400 mt-1 flex-shrink-0" size={20} />
        <div>
          <h4 className="text-orange-800 dark:text-orange-300 font-semibold mb-1">Medical Disclaimer</h4>
          <p className="text-orange-700 dark:text-orange-400 text-sm leading-relaxed">
            The information provided in this content is for educational purposes only and does not constitute medical advice. LunaCycle is not a medical device and should not be used as a substitute for professional medical consultation, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding your menstrual health, fertility, or any medical condition.
          </p>
        </div>
      </div>
    </div>
  );
};
