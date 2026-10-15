import { AlertCircle } from 'lucide-react';

export function MedicalDisclaimer() {
  return (
    <div className="bg-[var(--surface)] border border-yellow-500/30 rounded-xl p-5 my-8 flex items-start gap-4">
      <div className="text-yellow-500 mt-1 shrink-0">
        <AlertCircle size={24} />
      </div>
      <div>
        <h3 className="font-bold text-[var(--foreground)] mb-1">Medical Disclaimer</h3>
        <p className="text-sm text-[var(--muted)] leading-relaxed">
          The information provided in this content is for educational purposes only and does not constitute medical advice. LunaCycle is not a medical device and should not be used as a substitute for professional medical consultation, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding your menstrual health, fertility, or any medical condition.
        </p>
      </div>
    </div>
  );
}
