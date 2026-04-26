import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function WhatsAppChat() {
  const { t, language, dir } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // WhatsApp number for CASTI OCTUPUS
  const whatsappNumber = '+213552438906';
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`;

  // Pre-defined messages for quick contact
  const quickMessages = {
    fr: [
      'Bonjour, je souhaite discuter d\'un projet de transformation numérique.',
      'Pouvez-vous me fournir plus d\'informations sur vos services?',
      'Je suis intéressé par une consultation gratuite.',
      'Quel est votre tarif pour la création d\'un site web?',
    ],
    ar: [
      'مرحبا، أود مناقشة مشروع تحول رقمي.',
      'هل يمكنك تزويدي بمزيد من المعلومات عن خدماتك؟',
      'أنا مهتم باستشارة مجانية.',
      'ما هو سعرك لإنشاء موقع ويب؟',
    ],
  };

  const messages = quickMessages[language as 'fr' | 'ar'] || quickMessages.fr;

  const handleQuickMessage = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`${whatsappLink}?text=${encodedMessage}`, '_blank');
  };

  const handleDirectChat = () => {
    window.open(whatsappLink, '_blank');
  };

  // Show widget after component mounts
  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-6 ${dir === 'rtl' ? 'left-6' : 'right-6'} z-40`}>
      {/* Chat Window */}
      {isOpen && (
        <div
          className={`absolute ${dir === 'rtl' ? 'right-0' : 'left-0'} bottom-20 w-80 bg-white rounded-lg shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300`}
        >
          {/* Header */}
          <div className="bg-green-500 text-white p-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">WhatsApp</h3>
              <p className="text-xs text-green-100">
                {language === 'fr' ? 'Répondez généralement en 1 heure' : 'نرد عادة في غضون ساعة'}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-green-600 p-1 rounded transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 max-h-96 overflow-y-auto">
            <div className="mb-4">
              <p className="text-gray-700 text-sm mb-3">
                {language === 'fr'
                  ? 'Choisissez un message ou discutez directement avec nous:'
                  : 'اختر رسالة أو تحدث معنا مباشرة:'}
              </p>

              {/* Quick Messages */}
              <div className="space-y-2 mb-4">
                {messages.map((message, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickMessage(message)}
                    className="w-full text-left p-3 bg-gray-100 hover:bg-green-50 rounded-lg text-sm text-gray-700 transition-colors border border-gray-200 hover:border-green-400"
                  >
                    {message}
                  </button>
                ))}
              </div>

              {/* Direct Chat Button */}
              <button
                onClick={handleDirectChat}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                {language === 'fr' ? 'Ouvrir WhatsApp' : 'فتح واتساب'}
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 p-3 text-center border-t">
            <p className="text-xs text-gray-600">
              {language === 'fr'
                ? 'Alimenté par WhatsApp'
                : 'مدعوم من واتساب'}
            </p>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen ? 'scale-95' : 'scale-100'
        }`}
        title={language === 'fr' ? 'Chat WhatsApp' : 'دردشة واتساب'}
      >
        {isOpen ? (
          <X size={28} />
        ) : (
          <div className="flex items-center justify-center">
            <MessageCircle size={28} />
            {/* Notification Badge */}
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
          </div>
        )}
      </button>

      {/* Tooltip */}
      {!isOpen && (
        <div
          className={`absolute ${dir === 'rtl' ? 'right-20' : 'left-20'} bottom-5 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none`}
        >
          {language === 'fr' ? 'Contactez-nous' : 'اتصل بنا'}
        </div>
      )}
    </div>
  );
}
