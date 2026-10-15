import React from 'react';

export function MedicalDisclaimer() {
  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 my-8 rounded-r-md text-sm text-yellow-800 dark:text-yellow-200">
      <p className="font-semibold mb-1 uppercase tracking-wide">Medical Disclaimer</p>
      <p>
        The information provided in this content is for educational purposes only and does not constitute medical advice. LunaCycle is not a medical device and should not be used as a substitute for professional medical consultation, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding your menstrual health, fertility, or any medical condition.
      </p>
    </div>
  );
}
