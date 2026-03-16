import './globals.css';
import { Providers } from "@/components/shared/providers";
import { Navbar } from "@/components/layout/navbar";
import { auth } from "@/auth";
import { Noto_Serif, Noto_Sans } from 'next/font/google';

const noto_sans = Noto_Sans({ subsets: ['latin'], variable: '--font-sans' });
const noto_serif = Noto_Serif({ subsets: ['latin'], variable: '--font-serif' });

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en" className={`${noto_sans.variable} ${noto_serif.variable} dark`}>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
      </head>
      <body className="bg-background-dark text-white selection:bg-primary/30 font-sans">
        <Providers session={session}>
          <Navbar />
          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
