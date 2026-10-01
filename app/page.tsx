import Nav from '@/components/Nav';
import FeatureImage from '@/components/FeatureImage';
import GameFeed from '@/components/GameFeed';

const tickerText =
    'LAKERS VS CELTICS • 8:00PM EST • LIVE ON SCREEN 01 // MAN CITY VS REAL MADRID • 21:00 GMT • LIVE ON SCREEN 02 // HAPPY HOUR UNTIL 10PM // BOTTLE SERVICE STARTING AT 150K // ';

const cocktails = [
    { name: 'WHISKEY SOUR', price: '₦8,500' },
    { name: 'LONG ISLAND ICED TEA', price: '₦12,000' },
    { name: 'SMOKE & MIRRORS SIGNATURE', price: '₦15,000', signature: true },
    { name: 'HENNESSY MARGARITA', price: '₦18,000' },
];

const gallery = [
    { src: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=800', alt: 'Bar' },
    { src: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=800', alt: 'Lounge' },
    { src: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&q=80&w=800', alt: 'People' },
];

export default function Home() {
    return (
        <>
            <div className="ambient-bg"></div>
            <div className="diagonal-stripes"></div>

            <Nav />

            <section className="hero">
                <div className="gold-border-accent"></div>
                <div className="hero-content">
                    <div className="eyebrow">PREMIER ROOFTOP SPORTS LOUNGE</div>
                    <h1>
                        UNLIMITED<br />VIBES
                        <span className="script">Only at Admiralty Mall</span>
                    </h1>
                    <p className="hero-lede">
                        Experience the game through a lens of luxury. High-definition visuals, artisan cocktails, and the pulse of the city.
                    </p>
                    <div className="hero-actions">
                        <div className="luxury-pill luxury-pill--cta">
                            <h3>VIEW TONIGHT&apos;S LINEUP</h3>
                        </div>
                    </div>
                </div>

                <div className="hero-feature">
                    <FeatureImage />
                </div>
            </section>

            <div className="live-ticker">
                <div className="ticker-content">{tickerText.repeat(2).trim()}</div>
            </div>

            <div className="container">
                <div className="section-header">
                    <div>
                        <p className="section-kicker">THE CRAFT</p>
                        <h2>MIXOLOGY</h2>
                    </div>
                    <div className="nav-pill nav-pill--outline">DOWNLOAD FULL MENU PDF</div>
                </div>

                <div className="grid-layout">
                    <div className="card-stack">
                        {cocktails.map(({ name, price, signature }) => (
                            <div key={name} className={signature ? 'luxury-pill luxury-pill--signature' : 'luxury-pill'}>
                                <h3>{name}</h3>
                                <div className={signature ? 'price-badge price-badge--red' : 'price-badge'}>{price}</div>
                            </div>
                        ))}
                    </div>

                    <GameFeed />
                </div>
            </div>

            <section className="premium">
                <div className="premium-inner">
                    <h2 className="premium-title">UNAPOLOGETICALLY<br /><span>PREMIUM</span></h2>
                    <p className="premium-copy">
                        Smoke &amp; Mirrors isn&apos;t just a sports bar. It&apos;s the intersection of culture, competition, and craft. Join us at the rooftop where the game never stops and the vibes never fade.
                    </p>
                    <div className="premium-gallery">
                        {gallery.map(({ src, alt }) => (
                            <img key={alt} src={src} alt={alt} />
                        ))}
                    </div>
                </div>
            </section>

            <footer>
                <div className="logo footer-logo">SMOKE &amp; MIRRORS</div>
                ADMIRALTY MALL • LEKKI PHASE 1 • LAGOS, NIGERIA<br />
                OPEN MON-FRI 4PM-2AM • SAT-SUN 12PM-4AM<br />
                © 2024 SMOKE &amp; MIRRORS GROUP. ALL RIGHTS RESERVED.
            </footer>
        </>
    );
}
