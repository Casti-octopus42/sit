import Navigation from '@/components/Navigation';
import ReservationForm from '@/components/ReservationForm';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Reservation() {
  const { dir } = useLanguage();

  return (
    <div className={`min-h-screen bg-white ${dir === 'rtl' ? 'rtl' : 'ltr'}`}>
      <Navigation />
      <main className="pt-20 pb-20">
        <ReservationForm />
      </main>
      <Footer />
    </div>
  );
}
