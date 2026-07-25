import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function MedicalDisclaimer() {
  return (
    <div className="mt-8 p-6 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl flex gap-4 text-sm text-red-800 dark:text-red-200">
      <AlertCircle className="shrink-0 text-red-500" size={20} />
      <div className="space-y-1">
        <strong className="font-semibold block">Medical Disclaimer</strong>
        <p>
          The information provided by LunaCycle is for educational purposes only and does not constitute medical advice. LunaCycle is not a medical device and should not be used as a substitute for professional medical consultation, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding your menstrual health, fertility, or any medical condition.
        </p>
      </div>
    </div>
  );
}
