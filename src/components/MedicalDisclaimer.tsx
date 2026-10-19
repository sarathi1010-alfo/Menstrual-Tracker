import React from 'react';

export default function MedicalDisclaimer() {
  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 rounded-lg p-4 my-8">
      <div className="flex gap-3">
        <span className="text-xl" aria-hidden="true">⚠️</span>
        <div className="text-sm text-yellow-800 dark:text-yellow-200/90 leading-relaxed">
          <strong>MEDICAL DISCLAIMER:</strong> The information provided in this content is for educational purposes only and does not constitute medical advice. LunaCycle is not a medical device and should not be used as a substitute for professional medical consultation, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding your menstrual health, fertility, or any medical condition.
        </div>
      </div>
    </div>
  );
}
