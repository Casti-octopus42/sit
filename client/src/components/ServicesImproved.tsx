import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';

export default function ServicesImproved() {
  const { language, content } = useLanguage();

  if (!content) {
    return <div className="text-center py-20">Chargement...</div>;
  }

  const langContent = content[language];
  const services = langContent?.serviceCategories || [];
  const isArabic = language === 'ar';

  return (
    <section id="services" className={`py-20 px-4 md:px-8 bg-white ${isArabic ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {language === 'fr' ? 'Nos Services' : 'خدماتنا'}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {language === 'fr'
              ? 'Solutions complètes pour votre transformation numérique'
              : 'حلول شاملة لتحولك الرقمي'}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service: any, idx: number) => (
            <Link key={idx} href={`/service/${service.id}`}>
              <a className="group">
                <div className="bg-gradient-to-br from-[#0B1730] to-[#1a2a4a] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
                  {/* Icon/Title Area */}
                  <div className="p-8 text-white">
                    <div className="text-4xl mb-4">{service.title.split(' ')[0]}</div>
                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-2">{service.subtitle}</p>

                    {/* Price Range */}
                    <div className="mb-6 pb-6 border-b border-gray-700">
                      <p className="text-[#C8A84B] font-semibold text-sm">
                        {language === 'fr' ? 'À partir de' : 'من'}
                      </p>
                      <p className="text-2xl font-bold text-[#C8A84B]">
                        {service.price_range}
                      </p>
                    </div>

                    {/* Features Preview */}
                    <div className="space-y-2 mb-6">
                      {service.subServices?.slice(0, 3).map((sub: any, sidx: number) => (
                        <div key={sidx} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="text-[#C8A84B] mt-1">✓</span>
                          <span>{sub.name}</span>
                        </div>
                      ))}
                      {service.subServices?.length > 3 && (
                        <p className="text-[#C8A84B] text-sm font-semibold">
                          +{service.subServices.length - 3} {language === 'fr' ? 'autres services' : 'خدمات أخرى'}
                        </p>
                      )}
                    </div>

                    {/* CTA Button */}
                    <button className="w-full bg-[#C8A84B] text-[#0B1730] py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-yellow-400 transition group-hover:gap-3">
                      {language === 'fr' ? 'En Savoir Plus' : 'اعرف المزيد'}
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            {language === 'fr'
              ? 'Vous ne trouvez pas ce que vous cherchez?'
              : 'لا تجد ما تبحث عنه؟'}
          </p>
          <a href="#contact" className="inline-block bg-[#C8A84B] text-[#0B1730] px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition">
            {language === 'fr' ? 'Nous Contacter' : 'اتصل بنا'}
          </a>
        </div>
      </div>
    </section>
  );
}
