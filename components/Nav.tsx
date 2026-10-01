'use client';

import { useState } from 'react';

const links = [
    { label: 'THE MENU' },
    { label: 'LIVE SPORTS' },
    { label: 'VIP LOUNGE' },
    { label: 'BOOK TABLE', gold: true },
];

export default function Nav() {
    const [open, setOpen] = useState(false);

    return (
        <nav className={open ? 'is-open' : undefined}>
            <div className="logo">
                SMOKE &amp; MIRRORS
                <span>EST. 2024</span>
            </div>
            <button
                type="button"
                className="nav-toggle"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                aria-controls="nav-links"
                onClick={() => setOpen((o) => !o)}
            >
                <span></span><span></span><span></span>
            </button>
            <div className="nav-links" id="nav-links">
                {links.map(({ label, gold }) => (
                    <a
                        key={label}
                        href="#"
                        className={gold ? 'nav-pill nav-pill--gold' : 'nav-pill'}
                        onClick={() => setOpen(false)}
                    >
                        {label}
                    </a>
                ))}
            </div>
        </nav>
    );
}
