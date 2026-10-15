import { constructMetadata } from '@/lib/seo';
import MedicalDisclaimer from '@/components/MedicalDisclaimer';
import FAQAccordion from '@/components/FAQAccordion';
import faqsData from '@/data/faqs.json';

export const metadata = constructMetadata({
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about LunaCycle and menstrual cycle tracking.',
  path: '/faq',
});

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h1>
      <MedicalDisclaimer />
      <FAQAccordion faqs={faqsData} />
    </div>
  );
}
