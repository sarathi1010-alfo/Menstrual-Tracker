import { AlertCircle } from 'lucide-react';

export function MedicalDisclaimer() {
  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 my-8 rounded-r-md">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-bold text-yellow-800 dark:text-yellow-400 uppercase tracking-wider mb-1">
            Medical Disclaimer
          </h3>
          <div className="text-sm text-yellow-700 dark:text-yellow-300/90 leading-relaxed font-medium">
            <p>
              The information provided in this content is for educational purposes only and does not constitute medical advice. LunaCycle is not a medical device and should not be used as a substitute for professional medical consultation, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding your menstrual health, fertility, or any medical condition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
