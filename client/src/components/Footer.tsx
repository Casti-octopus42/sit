import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const { t, dir } = useLanguage();

  const footerLinks = t('footer.links') || {};
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-900 text-blue-100 py-16" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🐙</span>
              <div>
                <div className="font-display text-white text-lg">
                  CASTI <span className="gold-accent">OCTUPUS</span>
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-blue-800 rounded-lg hover:bg-amber-500 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-blue-800 rounded-lg hover:bg-amber-500 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-blue-800 rounded-lg hover:bg-amber-500 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="p-2 bg-blue-800 rounded-lg hover:bg-amber-500 transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-white mb-6">Entreprise</h4>
            <ul className="space-y-3">
              {Array.isArray(footerLinks.company) && (footerLinks.company || []).map((link: string, idx: number) => (
                <li key={idx}>
                  <a href="#" className="hover:text-amber-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-bold text-white mb-6">Ressources</h4>
            <ul className="space-y-3">
              {Array.isArray(footerLinks.resources) && (footerLinks.resources || []).map((link: string, idx: number) => (
                <li key={idx}>
                  <a href="#" className="hover:text-amber-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-bold text-white mb-6">Légal</h4>
            <ul className="space-y-3">
              {Array.isArray(footerLinks.legal) && (footerLinks.legal || []).map((link: string, idx: number) => (
                <li key={idx}>
                  <a href="#" className="hover:text-amber-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-blue-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-blue-300">
              © {currentYear} CASTI OCTUPUS. Tous droits réservés.
            </p>
            <div className="mt-4 md:mt-0 text-sm text-blue-300">
              Développé avec ❤️ pour la transformation numérique en Algérie
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
