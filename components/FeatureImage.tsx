'use client';

import { useRef } from 'react';

export default function FeatureImage() {
    const imgRef = useRef<HTMLImageElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const img = imgRef.current;
        if (!img) return;
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        img.style.transform = `scale(1.1) translate(${x * 30}px, ${y * 30}px) rotateX(${y * 10}deg) rotateY(${x * 10}deg)`;
    };

    const handleMouseLeave = () => {
        if (imgRef.current) {
            imgRef.current.style.transform = 'scale(1) translate(0, 0) rotateX(0) rotateY(0)';
        }
    };

    return (
        <div className="feature-image-wrapper" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <img
                ref={imgRef}
                src="https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&q=80&w=1000"
                alt="Cocktail"
            />
            <div className="image-overlay-text">
                <span className="badge-alt">SIGNATURE MIX</span>
                <h3 className="feature-title">LEKKI RUM PUNCH</h3>
                <p className="feature-caption">Crafted with smoked hibiscus and premium aging.</p>
            </div>
        </div>
    );
}
