import { useLanguage } from '@/contexts/LanguageContext';
import { useRoute, useLocation } from 'wouter';
import { Calendar, User, Clock, Tag, ArrowLeft } from 'lucide-react';
import { Streamdown } from 'streamdown';

export default function BlogArticle() {
  const { t, dir } = useLanguage();
  const [match, params] = useRoute('/blog/:id');
  const [, setLocation] = useLocation();

  if (!match) {
    return null;
  }

  const articles = t('blog.articles') || [];
  const article = articles.find((a: any) => a.id === parseInt(params?.id || '0'));

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {dir === 'rtl' ? 'المقالة غير موجودة' : 'Article non trouvé'}
          </h1>
          <button
            onClick={() => setLocation('/blog')}
            className="btn-primary"
          >
            {dir === 'rtl' ? 'العودة إلى المدونة' : 'Retour au blog'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white" dir={dir}>
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <button
          onClick={() => setLocation('/blog')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-bold transition-colors"
        >
          <ArrowLeft size={20} />
          {dir === 'rtl' ? 'العودة إلى المدونة' : 'Retour au blog'}
        </button>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-amber-500 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-40 mb-8">
            <div className="text-8xl">📰</div>
          </div>
          <h1 className="font-display text-4xl lg:text-5xl text-white mb-4">
            {article.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-white">
            <div className="flex items-center gap-2">
              <User size={20} />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Badge */}
        <div className="mb-8">
          <span className="gold-accent text-sm font-bold px-4 py-2 rounded-full bg-blue-50">
            {article.category}
          </span>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <Streamdown>{article.content}</Streamdown>
        </div>

        {/* Tags */}
        <div className="border-t border-gray-200 pt-8 mb-8">
          <h3 className="font-bold text-lg mb-4">
            {dir === 'rtl' ? 'الوسوم' : 'Tags'}
          </h3>
          <div className="flex flex-wrap gap-3">
            {article.tags && article.tags.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full flex items-center gap-2 text-sm"
              >
                <Tag size={16} />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Articles Section */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="font-bold text-2xl mb-6">
            {dir === 'rtl' ? 'مقالات ذات صلة' : 'Articles connexes'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles
              .filter((a: any) => a.id !== article.id && a.category === article.category)
              .slice(0, 2)
              .map((relatedArticle: any) => (
                <div
                  key={relatedArticle.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setLocation(`/blog/${relatedArticle.id}`)}
                >
                  <h4 className="font-bold text-lg mb-2 line-clamp-2">
                    {relatedArticle.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {relatedArticle.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar size={16} />
                    <span>{new Date(relatedArticle.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-500 to-amber-500 rounded-xl p-8 mt-12 text-white text-center">
          <h3 className="font-bold text-2xl mb-4">
            {dir === 'rtl' ? 'هل تريد تحويل عملك رقميًا؟' : 'Prêt à transformer votre entreprise?'}
          </h3>
          <p className="mb-6 text-lg">
            {dir === 'rtl' ? 'تواصل معنا اليوم للحصول على استشارة مجانية' : 'Contactez-nous aujourd\'hui pour une consultation gratuite'}
          </p>
          <button
            onClick={() => setLocation('/#contact')}
            className="bg-white text-blue-600 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            {dir === 'rtl' ? 'تواصل معنا' : 'Nous Contacter'}
          </button>
        </div>
      </div>
    </article>
  );
}
