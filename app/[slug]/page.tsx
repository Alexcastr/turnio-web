import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { fetchBusiness } from '@/lib/api/public';
import { Header } from '@/components/ui/header';
import { BusinessHeader } from '@/components/booking/business-header';
import { BookingWizard } from '@/components/booking/booking-wizard';
import { SEO } from '@/lib/seo';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const business = await fetchBusiness(slug);
    const title = `${business.name} — Reservar Cita`;
    const description = `Reserva tu cita en ${business.name}. ${business.category}. Agenda en línea fácil y rápida.`;

    return {
      title,
      description,
      openGraph: {
        title: `${title} | TurnIO`,
        description,
        url: `/${slug}`,
        ...(business.logoUrl && {
          images: [{ url: business.logoUrl, alt: business.name }],
        }),
      },
      twitter: {
        card: 'summary',
        title: `${title} | TurnIO`,
        description,
      },
    };
  } catch {
    return { title: 'Negocio no encontrado' };
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    url: `${SEO.baseUrl}/${slug}`,
    telephone: business.phone || undefined,
    image: business.logoUrl || undefined,
  };

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <div className="mx-auto max-w-lg px-4 py-6">
        <BusinessHeader business={business} />
        <BookingWizard slug={slug} business={business} />
      </div>
    </main>
  );
}
