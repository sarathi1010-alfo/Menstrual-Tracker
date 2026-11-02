import React from 'react';

export function MedicalDisclaimer() {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-8 rounded-r-lg dark:bg-amber-900/20 dark:border-amber-700">
      <div className="flex items-start">
        <div className="ml-3">
          <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300">
            ⚠️ Medical Disclaimer
          </h3>
          <div className="mt-2 text-sm text-amber-700 dark:text-amber-200">
            <p>
              The information provided in this content is for educational purposes only and does not constitute medical advice. LunaCycle is not a medical device and should not be used as a substitute for professional medical consultation, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding your menstrual health, fertility, or any medical condition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
