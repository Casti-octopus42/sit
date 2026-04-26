import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  company: string;
  role: string;
  image: string;
  text: string;
  rating: number;
}

export default function Testimonials() {
  const { language, content } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Calculate items with fallback to empty array
  const langContent = content?.[language];
  const testimonials = langContent?.testimonials;
  const items: Testimonial[] = testimonials?.items || [];
  const isArabic = language === 'ar';

  // useEffect MUST be called unconditionally, before any early returns
  useEffect(() => {
    if (!autoPlay || items.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay, items.length]);

  // Reset currentIndex if it's out of bounds after items change
  useEffect(() => {
    if (currentIndex >= items.length && items.length > 0) {
      setCurrentIndex(0);
    }
  }, [items.length, currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setAutoPlay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setAutoPlay(false);
  };

  // Early return after all hooks are called
  if (!content || items.length === 0) {
    return null;
  }

  const currentTestimonial = items[currentIndex];

  return (
    <section id="testimonials" className={`py-20 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-gray-100 ${isArabic ? 'rtl' : 'ltr'}`}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {testimonials?.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {testimonials?.subtitle}
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
            {/* Image */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C8A84B] to-[#0B1730] rounded-xl blur-lg opacity-30"></div>
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="relative w-full max-w-sm rounded-xl shadow-lg object-cover aspect-square"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center">
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(currentTestimonial.rating)].map((_: any, i: number) => (
                  <Star key={i} size={20} className="fill-[#C8A84B] text-[#C8A84B]" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl text-gray-700 mb-6 italic leading-relaxed">
                "{currentTestimonial.text}"
              </blockquote>

              {/* Author Info */}
              <div className="border-t border-gray-200 pt-6">
                <p className="font-bold text-lg text-gray-900">{currentTestimonial.name}</p>
                <p className="text-[#C8A84B] font-semibold">{currentTestimonial.role}</p>
                <p className="text-gray-600">{currentTestimonial.company}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="bg-gradient-to-r from-[#0B1730] to-[#1a2a4a] px-8 py-6 flex items-center justify-between">
            {/* Dots */}
            <div className="flex gap-2">
              {items.map((_: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setAutoPlay(false);
                  }}
                  className={`h-3 rounded-full transition ${
                    idx === currentIndex ? 'bg-[#C8A84B] w-8' : 'bg-gray-600 w-3'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrow Buttons */}
            <div className="flex gap-4">
              <button
                onClick={goToPrevious}
                className="p-2 hover:bg-white/20 rounded-full transition text-white"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={goToNext}
                className="p-2 hover:bg-white/20 rounded-full transition text-white"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Counter */}
            <div className="text-white font-semibold">
              {currentIndex + 1} / {items.length}
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center">
            <p className="text-3xl font-bold text-[#C8A84B]">+40</p>
            <p className="text-gray-600">{language === 'fr' ? 'Clients Satisfaits' : 'عملاء راضون'}</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#C8A84B]">4.9/5</p>
            <p className="text-gray-600">{language === 'fr' ? 'Note Moyenne' : 'متوسط التقييم'}</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#C8A84B]">100%</p>
            <p className="text-gray-600">{language === 'fr' ? 'Recommandation' : 'التوصية'}</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#C8A84B]">+300%</p>
            <p className="text-gray-600">{language === 'fr' ? 'Croissance Moyenne' : 'متوسط النمو'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
