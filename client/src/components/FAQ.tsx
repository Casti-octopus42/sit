import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const { language, content } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!content) {
    return (
      <section id="faq" className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center text-gray-500">
          Chargement...
        </div>
      </section>
    );
  }

  // Accéder au contenu par langue
  const langContent = content[language];
  if (!langContent || !langContent.faq) {
    return null;
  }

  const faqData = langContent.faq;
  const isArabic = language === 'ar';

  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="faq" className={`py-20 px-4 md:px-8 ${isArabic ? 'rtl' : 'ltr'}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {faqData.title}
          </h2>
          <p className="text-xl text-gray-300">
            {faqData.subtitle}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.items && Array.isArray(faqData.items) && faqData.items.map((item: any) => (
            <div
              key={item.id}
              className="bg-gradient-to-r from-[#0B1730] to-[#1a2a4a] border border-[#C8A84B] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Question */}
              <button
                onClick={() => toggleExpanded(item.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#1a2a4a] transition-colors"
              >
                <h3 className="text-lg font-semibold text-white text-left flex-1">
                  {item.question}
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-[#C8A84B] transition-transform flex-shrink-0 ${
                    expandedId === item.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Answer */}
              {expandedId === item.id && (
                <div className="px-6 py-4 bg-[#0B1730] border-t border-[#C8A84B]">
                  <p className="text-gray-300 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-300 mb-6">
            {language === 'fr'
              ? "Vous n'avez pas trouvé votre réponse?"
              : 'هل لم تجد إجابتك؟'}
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-[#C8A84B] text-[#0B1730] font-bold rounded-full hover:bg-yellow-400 transition-colors"
          >
            {language === 'fr' ? 'Nous Contacter' : 'اتصل بنا'}
          </a>
        </div>
      </div>
    </section>
  );
}
