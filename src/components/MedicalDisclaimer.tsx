import React from 'react';

export const MedicalDisclaimer = () => {
  return (
    <div className="my-8 p-6 bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl text-sm text-[var(--foreground)] opacity-90">
      <p className="font-bold mb-2 flex items-center">
        <span className="mr-2">⚠️</span> Medical Disclaimer
      </p>
      <p>
        The information provided in this content is for educational purposes only and does not constitute medical advice. LunaCycle is not a medical device and should not be used as a substitute for professional medical consultation, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding your menstrual health, fertility, or any medical condition.
      </p>
    </div>
  );
};
