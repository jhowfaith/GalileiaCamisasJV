import { useState } from 'react';

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: '#000', minHeight: 641 }}>
      {/* Fundo: foto da menina */}
      <div style={{
        backgroundImage: 'url(/images/Screenshot_1-a3da380d.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        filter: playing ? 'brightness(0.3)' : 'brightness(0.75)',
        transition: 'filter 0.4s',
        position: 'absolute', inset: 0,
      }} />

      {/* Conteúdo */}
      <div style={{ position: 'relative', zIndex: 2, padding: '120px 24px', textAlign: 'center', maxWidth: 960, margin: '0 auto' }}>
        <h2 style={{ color: '#fff', fontSize: 26, fontWeight: 700, marginBottom: 28, letterSpacing: -0.3, textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
          Novo por aqui?{' '}
          <span style={{ color: '#a78bfa' }}>Assista o vídeo até o final.</span>
        </h2>

        {!playing ? (
          /* Thumbnail / botão play */
          <div
            onClick={() => setPlaying(true)}
            style={{ cursor: 'pointer', display: 'inline-block', position: 'relative' }}
          >
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'rgba(105,9,255,0.85)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto',
              boxShadow: '0 0 0 12px rgba(105,9,255,0.25)',
              transition: 'transform 0.2s',
            }}
              onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.08)')}
              onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 16, fontWeight: 500 }}>
              Clique para assistir
            </p>
          </div>
        ) : (
          /* Player Vimeo */
          <div style={{ maxWidth: 800, margin: '0 auto', borderRadius: 10, overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,0.6)' }}>
            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
              <iframe
                src="https://player.vimeo.com/video/1189223101?autoplay=1&color&autopause=0&loop=0&title=0&portrait=0&byline=0"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="PlaynoDrop"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
