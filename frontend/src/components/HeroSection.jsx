import FadeIn from './FadeIn';
import ContactButton from './ContactButton';
import './HeroMarquee.css';

const HEADING_TEXT = "Ayush — Filmmaker & Cinematographer";

const HeroSection = () => {
  return (
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
          {['About', 'Price', 'Projects', 'Contact'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
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
              {[...Array(4)].map((_, i) => (
                <span key={`a-${i}`} className="hero-marquee-item">
                  {HEADING_TEXT}
                </span>
              ))}
            </div>
            {/* Group B — identical clone for seamless loop */}
            <div className="hero-marquee-group" aria-hidden="true">
              {[...Array(4)].map((_, i) => (
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

        {/* Contact button — centered below subtitle */}
        <FadeIn delay={0.5} y={20} className="mt-8 sm:mt-10">
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
