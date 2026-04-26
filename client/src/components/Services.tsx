import { useLanguage } from '@/contexts/LanguageContext';

export default function Services() {
  const { t, dir } = useLanguage();

  const services = t('services.items') || [];
  const serviceImages = [
    'https://d2xsxph8kpxj0f.cloudfront.net/310519663516525360/4hpyp6cFQoUMhJDdYCbaxY/services-web-development-RW9hv7a8SgC4UZUSGskuXG.webp',
    'https://d2xsxph8kpxj0f.cloudfront.net/310519663516525360/4hpyp6cFQoUMhJDdYCbaxY/services-ecommerce-oCUAryQn2fRbzKbT5WQqmx.webp',
    'https://d2xsxph8kpxj0f.cloudfront.net/310519663516525360/4hpyp6cFQoUMhJDdYCbaxY/services-ai-chatbot-TVuZoUdw3NxcouTUuzuZTk.webp',
    'https://d2xsxph8kpxj0f.cloudfront.net/310519663516525360/4hpyp6cFQoUMhJDdYCbaxY/services-training-28hbjQwoTzLQoQbjRqTQZ2.webp',
  ];

  return (
    <section id="services" className="py-20 bg-gray-50" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="font-display text-4xl lg:text-5xl mb-4 text-gray-900">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.isArray(services) && services.map((service: any, idx: number) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 overflow-hidden"
            >
              <img 
                src={serviceImages[idx] || serviceImages[0]} 
                alt={service.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-8">
                <h3 className="font-bold text-xl mb-3 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className="gold-accent font-bold text-sm">
                  {service.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
