import { AlertCircle } from 'lucide-react';

export default function MedicalDisclaimer() {
  return (
    <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 my-6">
      <div className="flex gap-3 items-start">
        <AlertCircle className="text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" size={20} />
        <div className="text-sm text-red-800 dark:text-red-200 leading-relaxed">
          <strong>Medical Disclaimer:</strong> The information provided in this content is for educational purposes only and does not constitute medical advice. LunaCycle is not a medical device and should not be used as a substitute for professional medical consultation, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding your menstrual health, fertility, or any medical condition.
        </div>
      </div>
    </div>
  );
}
