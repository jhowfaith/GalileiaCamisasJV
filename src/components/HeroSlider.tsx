import { useState, useEffect, useCallback } from 'react';

// Desktop: landscape banners (4 e 2)  |  Mobile: portrait banners (3 e 1)
const bannersDesktop = [
  { src: '/images/BANNER-SITE-4-scaled-721aa8dc.png', alt: 'Preço de Fábrica' },
  { src: '/images/BANNER-SITE-2-scaled-16ec503e.png', alt: 'Seja VIP' },
];

const bannersMobile = [
  { src: '/images/BANNER-SITE-3-scaled-81815bf5.png', alt: 'Preço de Fábrica' },
  { src: '/images/BANNER-SITE-1-scaled-a496bc5e.png', alt: 'Seja VIP' },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const banners = isMobile ? bannersMobile : bannersDesktop;

  const next = useCallback(() => setCurrent(c => (c + 1) % banners.length), [banners.length]);
  const prev = useCallback(() => setCurrent(c => (c - 1 + banners.length) % banners.length), [banners.length]);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="banner-slider">
      <div className="banner-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {banners.map(b => (
          <div key={b.src} className="banner-slide">
            <img src={b.src} alt={b.alt} />
          </div>
        ))}
      </div>

      <button className="banner-arrow left" onClick={prev} aria-label="Anterior">‹</button>
      <button className="banner-arrow right" onClick={next} aria-label="Próximo">›</button>

      <div className="banner-dots">
        {banners.map((_, i) => (
          <button key={i} className={`banner-dot${i === current ? ' active' : ''}`} onClick={() => setCurrent(i)} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}
