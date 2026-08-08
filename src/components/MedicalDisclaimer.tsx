import React from 'react';
import { AlertCircle } from 'lucide-react';

export function MedicalDisclaimer() {
  return (
    <div className="bg-[var(--surface)] border border-[var(--primary)]/20 rounded-xl p-4 my-8 flex items-start gap-3">
      <div className="text-[var(--primary)] shrink-0 mt-0.5">
        <AlertCircle size={20} />
      </div>
      <div>
        <h4 className="font-semibold text-sm mb-1">Medical Disclaimer</h4>
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          The information provided by LunaCycle is for educational purposes only and does not constitute medical advice. LunaCycle is not a medical device and should not be used as a substitute for professional medical consultation, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding your menstrual health, fertility, or any medical condition.
        </p>
      </div>
    </div>
  );
}
