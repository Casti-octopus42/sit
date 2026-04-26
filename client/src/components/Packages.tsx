import { useLanguage } from '@/contexts/LanguageContext';
import { Check } from 'lucide-react';

export default function Packages() {
  const { t, dir } = useLanguage();

  const packages = t('packages.items') || [];
  const packageImages = [
    'https://d2xsxph8kpxj0f.cloudfront.net/310519663516525360/4hpyp6cFQoUMhJDdYCbaxY/packages-startup-RH7AFckP9RpKvFEP3JkZTz.webp',
    'https://d2xsxph8kpxj0f.cloudfront.net/310519663516525360/4hpyp6cFQoUMhJDdYCbaxY/packages-growth-UkNwQJkvHWtun6w6DuVrbC.webp',
    'https://d2xsxph8kpxj0f.cloudfront.net/310519663516525360/4hpyp6cFQoUMhJDdYCbaxY/packages-enterprise-5TTY2AvutJ2HTMf5oErUMS.webp',
  ];

  return (
    <section id="packages" className="py-20 bg-gradient-to-br from-blue-900 to-blue-800" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="font-display text-4xl lg:text-5xl mb-4 text-white">
            {t('packages.title')}
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            {t('packages.subtitle')}
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.isArray(packages) && packages.map((pkg: any, idx: number) => (
            <div
              key={idx}
              className={`rounded-xl overflow-hidden transition-all duration-300 ${
                pkg.featured
                  ? 'bg-amber-500 text-gray-900 shadow-2xl scale-105'
                  : 'bg-white text-gray-900 shadow-lg hover:shadow-xl hover:-translate-y-2'
              }`}
            >
              <img 
                src={packageImages[idx] || packageImages[0]} 
                alt={pkg.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-8">
                <div className="text-5xl mb-4">{pkg.icon}</div>
                <h3 className="font-bold text-2xl mb-2">{pkg.name}</h3>
                <div className="mb-6">
                  <div className={`font-display text-4xl mb-1 ${pkg.featured ? 'text-gray-900' : 'gold-accent'}`}>
                    {pkg.price}
                  </div>
                  <div className={`text-sm ${pkg.featured ? 'text-gray-800' : 'text-gray-600'}`}>
                    {pkg.unit}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature: string, fidx: number) => (
                    <li key={fidx} className="flex items-start gap-3">
                      <Check size={20} className={pkg.featured ? 'text-gray-900' : 'gold-accent'} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-full font-bold transition-all ${
                    pkg.featured
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'btn-primary'
                  }`}
                >
                  {pkg.featured ? 'Commencer Maintenant' : 'Choisir ce forfait'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
