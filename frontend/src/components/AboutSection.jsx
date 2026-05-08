import { useRef } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';
import AnimatedText from './AnimatedText';
import ContactButton from './ContactButton';

const AboutSection = () => {
  const containerRef = useRef(null);
  
  // Track scroll progress of the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const aboutText =
    "With years of experience behind the lens, i focus on cinematography, narrative filmmaking, and visual storytelling. i truly enjoy collaborating with brands and artists who want their vision brought to life through powerful imagery. Let's create something unforgettable together!";

  // Remap scrollYProgress so text animation uses only the 0.05–0.70 range
  // This means the text finishes revealing well before the section unpins
  const textProgress = useTransform(scrollYProgress, [0.05, 0.70], [0, 1]);

  // Button appears after text is done
  const buttonOpacity = useTransform(scrollYProgress, [0.72, 0.82], [0, 1]);
  const buttonY = useTransform(scrollYProgress, [0.72, 0.82], [30, 0]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative bg-[#0C0C0C]"
      style={{ height: '400vh' }}
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-5 sm:px-8 md:px-10 py-20">
        
        {/* Center content */}
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16 z-10">
          <FadeIn delay={0} y={40}>
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight text-center"
              style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            >
              About me
            </h2>
          </FadeIn>

          <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
            <AnimatedText
              text={aboutText}
              progress={textProgress}
              className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[660px]"
              style={{ fontSize: 'clamp(1rem, 2.2vw, 1.5rem)' }}
            />

            <motion.div style={{ opacity: buttonOpacity, y: buttonY }}>
              <ContactButton />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
