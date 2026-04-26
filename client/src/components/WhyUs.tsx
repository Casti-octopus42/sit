import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle } from 'lucide-react';

export default function WhyUs() {
  const { t, dir } = useLanguage();

  const features = t('whyUs.features') || [];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-amber-50" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-slideInLeft">
            <h2 className="font-display text-4xl lg:text-5xl mb-6 text-gray-900">
              {t('whyUs.title')}
            </h2>
            <p className="text-xl mb-8 leading-relaxed" style={{color: '#fdf7f7'}}>
              {t('whyUs.subtitle')}
            </p>

            <div className="space-y-4">
              {Array.isArray(features) && features.map((feature: any, idx: number) => (
                <div key={idx} className="flex gap-4 items-start">
                  <CheckCircle className="gold-accent flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p style={{color: '#fdf7f7'}}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="animate-slideInRight hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-amber-200 rounded-2xl blur-3xl opacity-30"></div>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663516525360/4hpyp6cFQoUMhJDdYCbaxY/why-us-expertise-LvAeV4PwhN5afv2RY9ELjS.webp"
                alt="Expertise Team"
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
