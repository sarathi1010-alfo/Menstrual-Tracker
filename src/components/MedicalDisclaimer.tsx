export function MedicalDisclaimer() {
  return (
    <div className="bg-[var(--accent)]/10 border border-[var(--accent)]/20 p-4 rounded-lg my-6">
      <p className="text-sm text-[var(--accent)] font-medium mb-1">
        ⚠️ MEDICAL DISCLAIMER
      </p>
      <p className="text-sm text-[var(--muted)]">
        The information provided in this content is for educational purposes only and does not constitute medical advice. LunaCycle is not a medical device and should not be used as a substitute for professional medical consultation, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions regarding your menstrual health, fertility, or any medical condition.
      </p>
    </div>
  );
}
