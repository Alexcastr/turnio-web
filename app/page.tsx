import { Header } from '@/components/ui/header';
import { HeroSection } from '@/components/landing/hero-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { DownloadAppSection } from '@/components/landing/download-app-section';
import { ContactSection } from '@/components/landing/contact-section';
import { Footer } from '@/components/landing/footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <DownloadAppSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
