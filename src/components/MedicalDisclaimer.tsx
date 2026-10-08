import React from 'react';
import { AlertCircle } from 'lucide-react';

export function MedicalDisclaimer() {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-8 rounded-r-lg shadow-sm">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-semibold text-blue-800 uppercase tracking-wider">
            Medical Disclaimer
          </h3>
          <div className="mt-2 text-sm text-blue-700">
            <p>
              The information provided in this content is for educational purposes only and does not constitute medical advice. LunaCycle is not a medical device and should not be used as a substitute for professional medical consultation, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding your menstrual health, fertility, or any medical condition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
