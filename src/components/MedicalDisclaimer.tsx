import React from 'react';

export function MedicalDisclaimer() {
  return (
    <div className="card p-4 mt-8 bg-[var(--primary)]/5 border border-[var(--primary)]/20 text-sm text-[var(--muted)]">
      <p className="font-semibold mb-1 text-[var(--foreground)]">Medical Disclaimer</p>
      <p>
        The information provided by LunaCycle is for educational purposes only and does not constitute medical advice. LunaCycle is not a medical device and should not be used as a substitute for professional medical consultation, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding your menstrual health, fertility, or any medical condition.
      </p>
    </div>
  );
}
