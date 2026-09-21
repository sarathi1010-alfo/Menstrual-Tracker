import React from 'react';

export function MedicalDisclaimer() {
  return (
    <div className="bg-[var(--accent)]/10 border-l-4 border-[var(--accent)] p-4 my-6 rounded-r-md">
      <h4 className="font-bold text-[var(--foreground)] mb-2 flex items-center">
        ⚠️ Medical Disclaimer
      </h4>
      <p className="text-sm text-[var(--muted)]">
        The information provided in this content is for educational purposes only and does not constitute medical advice. LunaCycle is not a medical device and should not be used as a substitute for professional medical consultation, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding your menstrual health, fertility, or any medical condition.
      </p>
    </div>
  );
}
