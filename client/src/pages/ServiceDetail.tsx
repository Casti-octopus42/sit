import { useParams } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronRight, Check, Star, Users, Zap, Shield, Clock, Award } from 'lucide-react';
import { useState } from 'react';

export default function ServiceDetail() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { language, content } = useLanguage();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  if (!content) {
    return <div className="text-center py-20">Chargement...</div>;
  }

  const langContent = content[language];
  const service = langContent?.serviceCategories?.find((s: any) => s.id === serviceId);

  if (!service) {
    return <div className="text-center py-20">Service non trouvé</div>;
  }

  const isArabic = language === 'ar';
  const dir = isArabic ? 'rtl' : 'ltr';

  return (
    <div className={`min-h-screen bg-white ${dir}`} dir={dir}>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0B1730] to-[#1a2a4a] text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-6 text-[#C8A84B]">
            <span>Accueil</span>
            <ChevronRight size={20} />
            <span>{service.title}</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">{service.title}</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">{service.description}</p>
          <button className="bg-[#C8A84B] text-[#0B1730] px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition">
            {language === 'fr' ? 'Demander un Devis Gratuit' : 'طلب عرض سعر مجاني'}
          </button>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            {language === 'fr' ? 'À Qui C\'est Destiné ?' : 'لمن هذه الخدمة؟'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.useCases?.map((useCase: string, idx: number) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="w-12 h-12 bg-[#C8A84B] rounded-full flex items-center justify-center mb-4">
                  <Users className="text-white" size={24} />
                </div>
                <p className="font-semibold text-gray-900">{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            {language === 'fr' ? 'Détail des Services Inclus' : 'تفاصيل الخدمات المضمنة'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.subServices?.map((subService: any, idx: number) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-md bg-[#C8A84B] text-white">
                    <Check size={20} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{subService.name}</h3>
                  <p className="text-gray-600">{subService.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Comparison Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            {language === 'fr' ? 'Nos Packages' : 'حزمنا'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.packages?.map((pkg: any, idx: number) => (
              <div
                key={idx}
                className={`rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 ${
                  pkg.popular ? 'ring-2 ring-[#C8A84B] relative' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="bg-[#C8A84B] text-[#0B1730] py-2 text-center font-bold text-sm">
                    ⭐ {language === 'fr' ? 'POPULAIRE' : 'الأكثر شهرة'}
                  </div>
                )}
                <div className="bg-white p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-[#C8A84B] mb-6">{pkg.price}</div>
                  <ul className="space-y-4 mb-8">
                    {pkg.features?.map((feature: string, fidx: number) => (
                      <li key={fidx} className="flex items-center gap-3">
                        <Check className="text-[#C8A84B]" size={20} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setSelectedPackage(pkg.name)}
                    className={`w-full py-3 rounded-lg font-bold transition ${
                      pkg.popular
                        ? 'bg-[#C8A84B] text-[#0B1730] hover:bg-yellow-400'
                        : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                    }`}
                  >
                    {language === 'fr' ? 'Choisir' : 'اختيار'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            {language === 'fr' ? 'Technologies Utilisées' : 'التقنيات المستخدمة'}
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {service.technologies?.map((tech: string, idx: number) => (
              <div key={idx} className="bg-[#0B1730] text-white px-6 py-3 rounded-full font-semibold">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process/Timeline Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
            {language === 'fr' ? 'Comment Ça Marche ?' : 'كيف يعمل؟'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                fr: 'Audit gratuit',
                ar: 'تدقيق مجاني',
                icon: Shield
              },
              {
                fr: 'Proposition devis',
                ar: 'اقتراح عرض السعر',
                icon: Award
              },
              {
                fr: 'Installation',
                ar: 'التثبيت',
                icon: Zap
              },
              {
                fr: 'Formation & Support',
                ar: 'التدريب والدعم',
                icon: Clock
              }
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 bg-[#C8A84B] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {language === 'fr' ? step.fr : step.ar}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {language === 'fr'
                      ? `Étape ${idx + 1}`
                      : `الخطوة ${idx + 1}`}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#0B1730] to-[#1a2a4a] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            {language === 'fr' ? 'Prêt à Commencer ?' : 'هل أنت مستعد للبدء؟'}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {language === 'fr'
              ? 'Contactez-nous dès aujourd\'hui pour une consultation gratuite'
              : 'اتصل بنا اليوم للحصول على استشارة مجانية'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#C8A84B] text-[#0B1730] px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition">
              {language === 'fr' ? 'Devis Gratuit' : 'عرض سعر مجاني'}
            </button>
            <button className="border-2 border-[#C8A84B] text-white px-8 py-3 rounded-full font-bold hover:bg-[#C8A84B] hover:text-[#0B1730] transition">
              {language === 'fr' ? 'Appeler Expert' : 'اتصل بخبير'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
