import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { Providers } from '@/lib/providers';
import { SEO } from '@/lib/seo';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SEO.baseUrl),
  title: {
    default: SEO.defaultTitle,
    template: `%s | ${SEO.siteName}`,
  },
  description: SEO.defaultDescription,
  icons: {
    icon: [
      { url: '/web-icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/web-icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/web-icons/apple-touch-icon.png',
  },
  manifest: '/web-icons/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: SEO.siteName,
    locale: SEO.locale,
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    images: [{ url: SEO.ogImage, width: 1200, height: 630, alt: SEO.siteName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    images: [SEO.ogImage],
  },
};

const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('turnio-theme');
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', theme);
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} antialiased font-sans`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
