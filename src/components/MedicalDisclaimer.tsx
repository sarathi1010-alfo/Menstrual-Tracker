import React from 'react';
import { AlertCircle } from 'lucide-react';

export function MedicalDisclaimer() {
  return (
    <div className="bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-lg p-4 my-6 flex gap-3 text-[var(--muted)] text-sm">
      <AlertCircle className="w-5 h-5 flex-shrink-0 text-[var(--primary)] mt-0.5" />
      <div>
        <p className="font-semibold text-[var(--foreground)] mb-1">Medical Disclaimer</p>
        <p>
          The information provided in this content is for educational purposes only and does not constitute medical advice. LunaCycle is not a medical device and should not be used as a substitute for professional medical consultation, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding your menstrual health, fertility, or any medical condition.
        </p>
      </div>
    </div>
  );
}
