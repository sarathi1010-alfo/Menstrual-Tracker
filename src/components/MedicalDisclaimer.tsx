import React from 'react';

export function MedicalDisclaimer() {
  return (
    <div className="p-4 my-6 bg-red-50 border border-red-200 rounded-lg shadow-sm">
      <p className="text-sm text-red-900 font-medium">
        <span className="font-bold uppercase tracking-wider text-red-700">Medical Disclaimer: </span>
        The information provided in this content is for educational purposes only and does not constitute medical advice. LunaCycle is not a medical device and should not be used as a substitute for professional medical consultation, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding your menstrual health, fertility, or any medical condition.
      </p>
    </div>
  );
}
