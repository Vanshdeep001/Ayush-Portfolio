import { useState } from 'react';
import FadeIn from './FadeIn';
import ContactModal from './ContactModal';
import './HeroMarquee.css';

const HEADING_TEXT = "Ayush — Filmmaker & Cinematographer";

const HeroSection = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
    <section className="h-screen flex flex-col relative" style={{ overflowX: 'clip' }}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://res.cloudinary.com/dfonotyfb/video/upload/v1775585556/dds3_1_rqhg7x.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay on video */}
      <div className="absolute inset-0 bg-[#0C0C0C]/70 z-[1]" />

      {/* Navbar */}
      <FadeIn delay={0} y={-20} className="relative z-10">
        <nav className="flex justify-between px-6 md:px-10 pt-6 md:pt-8">
          {['About', 'Projects', 'Contact'].map((link) => (
            <a
              key={link}
              href={link === 'Contact' ? '#' : `#${link.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                if (link === 'Contact') {
                  setIsContactOpen(true);
                } else {
                  document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider
                         text-sm md:text-lg lg:text-[1.4rem]
                         hover:opacity-70 transition-opacity duration-200"
            >
              {link}
            </a>
          ))}
        </nav>
      </FadeIn>

      {/* Main content area — fully centered */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">

        {/* Hero heading — infinite horizontal marquee */}
        <FadeIn delay={0.15} y={40} className="w-full overflow-hidden">
          <div className="hero-marquee-track">
            {/* Group A */}
            <div className="hero-marquee-group">
              {[...Array(6)].map((_, i) => (
                <span key={`a-${i}`} className="hero-marquee-item">
                  {HEADING_TEXT}
                </span>
              ))}
            </div>
            {/* Group B — identical clone for seamless loop */}
            <div className="hero-marquee-group" aria-hidden="true">
              {[...Array(6)].map((_, i) => (
                <span key={`b-${i}`} className="hero-marquee-item">
                  {HEADING_TEXT}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Subtitle — centered below heading */}
        <FadeIn delay={0.35} y={20} className="mt-6 sm:mt-8">
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-center
                       max-w-[260px] sm:max-w-[360px] md:max-w-[460px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a filmmaker & cinematographer crafting cinematic stories that move audiences
          </p>
        </FadeIn>

        {/* Scroll indicator — replaces Contact button */}
        <FadeIn delay={0.5} y={20} className="mt-10 sm:mt-14">
          <div
            className="flex flex-col items-center gap-3 cursor-pointer select-none group"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {/* Rotating ring with text */}
            <div className="relative w-[72px] h-[72px] sm:w-[88px] sm:h-[88px]">
              {/* Spinning outer ring */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                style={{ animation: 'heroScrollSpin 12s linear infinite' }}
              >
                <defs>
                  <path id="circlePath" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                </defs>
                <text
                  fill="rgba(215,226,234,0.25)"
                  fontSize="9.5"
                  fontFamily="Kanit, sans-serif"
                  fontWeight="500"
                  letterSpacing="3.5"
                  textTransform="uppercase"
                >
                  <textPath href="#circlePath">
                    SCROLL TO DISCOVER · SCROLL TO DISCOVER ·&nbsp;
                  </textPath>
                </text>
              </svg>

              {/* Center arrow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  width="18"
                  height="22"
                  viewBox="0 0 18 22"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-y-1"
                  style={{ animation: 'heroScrollBounce 2s ease-in-out infinite' }}
                >
                  <path
                    d="M9 1v18M2 14l7 7 7-7"
                    stroke="rgba(182,0,168,0.7)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Inline keyframes for the scroll indicator */}
      <style>{`
        @keyframes heroScrollSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes heroScrollBounce {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(5px); }
        }
      `}</style>
    </section>

    <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
};

export default HeroSection;
