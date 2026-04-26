import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import WhyUs from '@/components/WhyUs';
import ServicesImproved from '@/components/ServicesImproved';
import Portfolio from '@/components/Portfolio';
import Packages from '@/components/Packages';
import Testimonials from '@/components/Testimonials';
import Blog from '@/components/Blog';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useAuth } from '@/_core/hooks/useAuth';

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  const { user, loading, error, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-20">
        <Hero />
        <WhyUs />
        <ServicesImproved />
        <Packages />
        <Portfolio />
        <Testimonials />
        <Blog />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
