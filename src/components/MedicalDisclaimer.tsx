import { AlertCircle } from 'lucide-react';

export function MedicalDisclaimer() {
  return (
    <div className="bg-[var(--secondary)]/10 border-l-4 border-[var(--secondary)] p-4 rounded-r-lg my-8 flex gap-3 text-[var(--foreground)]/80 text-sm">
      <AlertCircle className="text-[var(--secondary)] flex-shrink-0 mt-0.5" size={20} />
      <div className="leading-relaxed">
        <strong>Medical Disclaimer:</strong> The information provided by LunaCycle is for educational purposes only and does not constitute medical advice. LunaCycle is not a medical device and should not be used as a substitute for professional medical consultation, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding your menstrual health, fertility, or any medical condition.
      </div>
    </div>
  );
}
