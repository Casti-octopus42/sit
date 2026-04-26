import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const { language, setLanguage, t, dir } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', label: t('nav.home') },
    { key: 'services', label: t('nav.services') },
    { key: 'portfolio', label: t('nav.portfolio') },
    { key: 'blog', label: t('nav.blog') },
    { key: 'faq', label: language === 'fr' ? 'FAQ' : 'الأسئلة الشائعة' },
  ];

  const handleContactClick = () => {
    window.location.href = '/reservation';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-900 shadow-md" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
            <span className="text-3xl">🐙</span>
            <div className="font-display text-xl">
              CASTI <span className="gold-accent">OCTUPUS</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <a
                key={item.key}
                href={`#${item.key}`}
                className="text-white hover:text-amber-400 transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Language Switcher & CTA */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === 'fr' ? 'ar' : 'fr')}
              className="px-4 py-2 rounded-full border-2 border-amber-400 text-amber-400 hover:bg-blue-800 transition-colors font-bold"
            >
              {language === 'fr' ? 'العربية' : 'Français'}
            </button>

            <button
              onClick={handleContactClick}
              className="hidden md:block px-6 py-2 bg-amber-500 text-blue-900 rounded-full font-bold hover:bg-amber-400 transition-colors"
            >
              {t('nav.contact')}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-blue-800">
            {navItems.map(item => (
              <a
                key={item.key}
                href={`#${item.key}`}
                className="block px-4 py-3 text-white hover:bg-blue-800 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="block w-full mt-4 mx-4 px-6 py-2 bg-amber-500 text-blue-900 rounded-full font-bold hover:bg-amber-400 transition-colors text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.contact')}
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
