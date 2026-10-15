import React from 'react';

export function MedicalDisclaimer() {
  return (
    <div className="p-4 my-8 bg-[var(--secondary)]/10 border border-[var(--secondary)]/20 rounded-xl shadow-sm">
      <h3 className="text-sm font-bold text-[var(--secondary)] uppercase tracking-wider mb-2">
        Medical Disclaimer
      </h3>
      <p className="text-sm text-[var(--foreground)] m-0 leading-relaxed">
        The information provided in this content is for educational purposes only and does not constitute medical advice. LunaCycle is not a medical device and should not be used as a substitute for professional medical consultation, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding your menstrual health, fertility, or any medical condition.
      </p>
    </div>
  );
}
