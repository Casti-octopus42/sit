import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { Calendar, User, Clock, Tag } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Blog() {
  const { t, dir } = useLanguage();
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const articles = Array.isArray(t('blog.articles')) ? t('blog.articles') : [];

  // Get unique categories
  const categories: string[] = articles.length > 0 
    ? ['all', ...Array.from(new Set(articles.map((a: any) => a.category))) as string[]]
    : ['all'];

  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter((a: any) => a.category === selectedCategory);

  return (
    <section id="blog" className="py-20 bg-gray-50" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <h2 className="font-display text-4xl lg:text-5xl mb-4 text-gray-900">
            {t('blog.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category: string) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                selectedCategory === category
                  ? 'btn-primary'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category === 'all' ? (dir === 'rtl' ? 'جميع المقالات' : 'Tous les articles') : (category as string)}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(filteredArticles) && filteredArticles.map((article: any) => (
            <article
              key={article.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col"
              onClick={() => setLocation(`/blog/${article.id}`)}
            >
              {/* Article Header */}
              <div className="bg-gradient-to-r from-blue-500 to-amber-500 h-40 flex items-center justify-center">
                <div className="text-6xl">📰</div>
              </div>

              {/* Article Content */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="gold-accent text-sm font-bold">
                    {article.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-xl mb-3 text-gray-900 line-clamp-2">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                  {article.excerpt}
                </p>

                {/* Meta Information */}
                <div className="space-y-2 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags && article.tags.slice(0, 2).map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full flex items-center gap-1"
                    >
                      <Tag size={12} />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More Button */}
                <button className="btn-primary w-full">
                  {dir === 'rtl' ? 'اقرأ المزيد' : 'Lire la suite'}
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              {dir === 'rtl' ? 'لا توجد مقالات في هذه الفئة' : 'Aucun article dans cette catégorie'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
