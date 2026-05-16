import { useRef, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';
import AnimatedText from './AnimatedText';

import AboutModal from './AboutModal';

const AboutSection = () => {
  const containerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Track scroll progress of the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const aboutText =
    "With years of experience behind the lens, i focus on cinematography, narrative filmmaking, and visual storytelling. i truly enjoy collaborating with brands and artists who want their vision brought to life through powerful imagery. Let's create something unforgettable together!";

  // Remap scrollYProgress so text animation uses only the 0.05–0.60 range
  const textProgress = useTransform(scrollYProgress, [0.05, 0.60], [0, 1]);

  return (
    <>
      <section
        id="about"
        ref={containerRef}
        className="relative bg-[#0C0C0C] z-[2]"
        style={{ height: '400vh' }}
      >
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-5 sm:px-8 md:px-10 py-10 sm:py-14 md:py-16 bg-[#0C0C0C]">
          
          {/* Center content */}
            <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10 z-10">
            <FadeIn delay={0} y={40}>
              <h2
                className="hero-heading font-black uppercase leading-none tracking-tight text-center"
                style={{ fontSize: 'clamp(3rem, 10vw, 120px)', letterSpacing: '0.15em' }}
              >
                About me
              </h2>
            </FadeIn>

            <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10">
              <AnimatedText
                text={aboutText}
                progress={textProgress}
                className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[660px]"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 1.5rem)' }}
              />

              {/* Read More — minimal cinematic style */}
              <FadeIn delay={0.2} y={20}>
                <button
                  className="group flex items-center gap-3 cursor-pointer bg-transparent border-none"
                  onClick={() => setIsModalOpen(true)}
                  style={{ padding: 0 }}
                >
                  <span
                    style={{
                      fontSize: 'clamp(0.75rem, 1.4vw, 1rem)',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.3em',
                      color: 'rgba(215,226,234,0.5)',
                      borderBottom: '1px solid rgba(182,0,168,0.4)',
                      paddingBottom: '4px',
                      transition: 'color 0.3s, border-color 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#D7E2EA';
                      e.target.style.borderColor = '#b600a8';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = 'rgba(215,226,234,0.5)';
                      e.target.style.borderColor = 'rgba(182,0,168,0.4)';
                    }}
                  >
                    Read More
                  </span>
                  <svg
                    width="20"
                    height="12"
                    viewBox="0 0 20 12"
                    fill="none"
                    style={{ transition: 'transform 0.3s' }}
                    className="group-hover:translate-x-1"
                  >
                    <path
                      d="M1 6h16M13 1l5 5-5 5"
                      stroke="rgba(182,0,168,0.6)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Modal rendered outside section to avoid overflow/sticky issues */}
      <AboutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default AboutSection;
