import type { Metadata } from 'next';
import { Bebas_Neue, Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '700', '900'],
    variable: '--font-inter',
});

const bebas = Bebas_Neue({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-bebas',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: '700',
    style: 'italic',
    variable: '--font-playfair',
});

export const metadata: Metadata = {
    title: 'SMOKE & MIRRORS | PREMIER SPORTS LOUNGE',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${inter.variable} ${bebas.variable} ${playfair.variable}`}>
            <body>{children}</body>
        </html>
    );
}
