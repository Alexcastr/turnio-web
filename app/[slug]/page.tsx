import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { fetchBusiness } from '@/lib/api/public';
import { Header } from '@/components/ui/header';
import { BusinessHeader } from '@/components/booking/business-header';
import { BookingWizard } from '@/components/booking/booking-wizard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const business = await fetchBusiness(slug);
    return {
      title: `${business.name} - Reservar Cita | TurnIO`,
      description: `Reserva tu cita en ${business.name}. ${business.category}.`,
    };
  } catch {
    return { title: 'Negocio no encontrado | TurnIO' };
  }
}

export default async function BusinessPage({ params }: PageProps) {
  const { slug } = await params;

  let business;
  try {
    business = await fetchBusiness(slug);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-lg px-4 py-6">
        <BusinessHeader business={business} />
        <BookingWizard slug={slug} business={business} />
      </div>
    </main>
  );
}
