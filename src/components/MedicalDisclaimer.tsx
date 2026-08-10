import React from 'react';

export function MedicalDisclaimer() {
  return (
    <div className="p-4 mt-8 mb-8 text-sm text-[var(--muted)] bg-[var(--surface)] border border-[var(--primary)]/20 rounded-xl shadow-sm">
      <p className="font-semibold text-[var(--foreground)] mb-1">
        Medical Disclaimer
      </p>
      <p>
        The information provided in this content is for educational purposes only and does not constitute medical advice. LunaCycle is not a medical device and should not be used as a substitute for professional medical consultation, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding your menstrual health, fertility, or any medical condition.
      </p>
    </div>
  );
}
