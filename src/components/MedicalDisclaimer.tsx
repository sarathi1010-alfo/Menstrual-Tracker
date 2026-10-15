import { AlertCircle } from 'lucide-react';

export default function MedicalDisclaimer() {
  return (
    <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 dark:bg-orange-950/20 dark:border-orange-900 text-sm text-orange-900 dark:text-orange-200 my-8">
      <div className="flex items-start">
        <AlertCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
        <div>
          <strong className="font-semibold block mb-1">Medical Disclaimer</strong>
          <p>
            The information provided in this content is for educational purposes only and does not constitute medical advice. LunaCycle is not a medical device and should not be used as a substitute for professional medical consultation, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding your menstrual health, fertility, or any medical condition.
          </p>
        </div>
      </div>
    </div>
  );
}
