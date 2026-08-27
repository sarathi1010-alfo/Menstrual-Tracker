import { AlertCircle } from 'lucide-react';

export function MedicalDisclaimer() {
  return (
    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl p-4 my-6 text-sm">
      <div className="flex gap-3">
        <div className="flex-shrink-0 text-amber-600 dark:text-amber-500">
          <AlertCircle size={20} />
        </div>
        <div className="text-amber-900 dark:text-amber-200/90 leading-relaxed">
          <strong className="font-semibold block mb-1">Medical Disclaimer</strong>
          The information provided in this content is for educational purposes only and does not constitute medical advice. LunaCycle is not a medical device and should not be used as a substitute for professional medical consultation, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding your menstrual health, fertility, or any medical condition.
        </div>
      </div>
    </div>
  );
}
