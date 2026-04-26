import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const { t, dir } = useLanguage();

  const stats = t('hero.stats') || [];

  return (
    <section
      id="home"
      className="pt-32 pb-20 min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900"
      dir={dir}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fadeInUp">
            <div className="inline-block mb-6 px-4 py-2 bg-amber-100 rounded-full">
              <span className="gold-accent font-bold text-sm">
                🚀 {t('hero.subtitle')}
              </span>
            </div>

            <h1 className="font-display text-5xl lg:text-6xl mb-6 text-white">
              {t('hero.title')}
            </h1>

            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-lg">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="btn-primary flex items-center justify-center gap-2">
                {t('hero.cta')}
                <ArrowRight size={20} />
              </button>
              <button className="btn-secondary">
                Consulter Gratuitement
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Array.isArray(stats) && stats.map((stat: any, idx: number) => (
                <div key={idx} className="bg-blue-800 bg-opacity-50 p-4 rounded-lg shadow-sm border border-blue-700 backdrop-blur-sm">
                  <div className="gold-accent font-bold text-2xl">{stat.number}</div>
                  <div className="text-sm text-blue-100 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="animate-slideInRight hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-blue-100 rounded-2xl blur-3xl opacity-30"></div>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663516525360/4hpyp6cFQoUMhJDdYCbaxY/hero-digital-transformation-bMXSqGLPS5DrRyCCnLor9e.webp"
                alt="Digital Transformation"
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
