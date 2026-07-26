import React from 'react';
import { AlertTriangle } from 'lucide-react';

export function MedicalDisclaimer() {
  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-4 my-8">
      <div className="flex items-start">
        <AlertTriangle className="text-yellow-600 dark:text-yellow-500 w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
        <div className="text-sm text-yellow-800 dark:text-yellow-200 leading-relaxed">
          <strong>Medical Disclaimer:</strong> The information provided in this content is for educational purposes only and does not constitute medical advice. LunaCycle is not a medical device and should not be used as a substitute for professional medical consultation, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding your menstrual health, fertility, or any medical condition.
        </div>
      </div>
    </div>
  );
}
