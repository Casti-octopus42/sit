import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import ReservationCalendar from './ReservationCalendar';

export default function ReservationForm() {
  const { t, dir, language } = useLanguage();
  const [selectedSlotId, setSelectedSlotId] = useState<number | undefined>();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    serviceType: '',
    message: '',
  });

  const createReservation = trpc.reservations.createReservation.useMutation({
    onSuccess: () => {
      toast.success(t('reservation.success'));
      setFormData({ fullName: '', email: '', phone: '', company: '', serviceType: '', message: '' });
      setSelectedSlotId(undefined);
      setSelectedDate(null);
      setSelectedTime(null);
    },
    onError: (error) => {
      toast.error(error.message || t('reservation.error'));
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSlotSelect = (slotId: number, date: string, time: string) => {
    setSelectedSlotId(slotId);
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedSlotId === undefined) {
      toast.error(t('reservation.selectSlot'));
      return;
    }

    if (!formData.fullName || !formData.email || !formData.phone || !formData.serviceType) {
      toast.error(t('reservation.fillRequired'));
      return;
    }

    setIsSubmitting(true);
    try {
      await createReservation.mutateAsync({
        slotId: selectedSlotId!,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        serviceType: formData.serviceType,
        message: formData.message,
        language: language as 'fr' | 'ar',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceTypes = [
    { value: 'website', label: t('services.website') || 'Website Development' },
    { value: 'ecommerce', label: t('services.ecommerce') || 'E-commerce Store' },
    { value: 'chatbot', label: t('services.chatbot') || 'AI Chatbot' },
    { value: 'training', label: t('services.training') || 'Digital Training' },
  ];

  return (
    <div className={`w-full max-w-4xl mx-auto p-6 ${dir === 'rtl' ? 'rtl' : 'ltr'}`}>
      <div className="bg-gradient-to-br from-blue-50 to-amber-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-blue-900 mb-2">{t('reservation.title')}</h2>
        <p className="text-gray-600 mb-8">{t('reservation.subtitle')}</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Calendar Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('reservation.selectDate')}</h3>
            <ReservationCalendar onSlotSelect={handleSlotSelect} selectedSlotId={selectedSlotId} />
          </div>

          {/* Selected Slot Display */}
          {selectedSlotId && selectedDate && selectedTime && (
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
              <p className="text-green-800">
                <span className="font-semibold">{t('reservation.selectedSlot')}:</span> {selectedDate} - {selectedTime}
              </p>
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">{t('reservation.yourInfo')}</h3>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('reservation.fullName')} *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder={t('reservation.fullNamePlaceholder')}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('reservation.email')} *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder={t('reservation.emailPlaceholder')}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('reservation.phone')} *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder={t('reservation.phonePlaceholder')}
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('reservation.company')}
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder={t('reservation.companyPlaceholder')}
              />
            </div>

            {/* Service Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('reservation.serviceType')} *
              </label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                <option value="">{t('reservation.selectService')}</option>
                {serviceTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('reservation.message')}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder={t('reservation.messagePlaceholder')}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || selectedSlotId === undefined}
            className="w-full bg-gold-500 hover:bg-gold-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {isSubmitting ? t('reservation.submitting') : t('reservation.submit')}
          </button>
        </form>
      </div>
    </div>
  );
}
