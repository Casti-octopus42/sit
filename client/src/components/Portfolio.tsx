import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

export default function Portfolio() {
  const { t, dir } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = t('portfolio.projects') || [];
  const filters = ['all', 'website', 'ecommerce', 'ai', 'training'];

  const portfolioImages = [
    'https://d2xsxph8kpxj0f.cloudfront.net/310519663516525360/4hpyp6cFQoUMhJDdYCbaxY/portfolio-ecommerce-BVdG9pXNvF4y37tE5uFCkw.webp',
    'https://d2xsxph8kpxj0f.cloudfront.net/310519663516525360/4hpyp6cFQoUMhJDdYCbaxY/portfolio-website-mEVyoqKdqoHcaN8ADNXQ3Y.webp',
    'https://d2xsxph8kpxj0f.cloudfront.net/310519663516525360/4hpyp6cFQoUMhJDdYCbaxY/blog-ecommerce.png',
    'https://d2xsxph8kpxj0f.cloudfront.net/310519663516525360/4hpyp6cFQoUMhJDdYCbaxY/blog-ai-chatbot.png',
    'https://d2xsxph8kpxj0f.cloudfront.net/310519663516525360/4hpyp6cFQoUMhJDdYCbaxY/blog-seo.png',
    'https://d2xsxph8kpxj0f.cloudfront.net/310519663516525360/4hpyp6cFQoUMhJDdYCbaxY/blog-trends.png',
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p: any) => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-20 bg-white" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="font-display text-4xl lg:text-5xl mb-4 text-gray-900">
            {t('portfolio.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('portfolio.subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                activeFilter === filter
                  ? 'btn-primary'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {filter === 'all' ? t('portfolio.filters.0') : 
               filter === 'website' ? t('portfolio.filters.1') :
               filter === 'ecommerce' ? t('portfolio.filters.2') :
               filter === 'ai' ? t('portfolio.filters.3') :
               t('portfolio.filters.4')}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(filteredProjects) && filteredProjects.map((project: any, idx: number) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <img 
                src={portfolioImages[idx % portfolioImages.length]} 
                alt={project.title} 
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <div className="gold-accent text-sm font-bold mb-2">
                  {project.category}
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string, tidx: number) => (
                    <span
                      key={tidx}
                      className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
