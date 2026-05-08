import FadeIn from './FadeIn';
import { motion } from 'framer-motion';

const services = [
  {
    num: '01',
    name: 'Cinematography',
    desc: 'Capturing visually stunning footage with expert camera work, lighting design, and composition to elevate every frame of your project.',
  },
  {
    num: '02',
    name: 'Film Direction',
    desc: 'Guiding the creative vision from script to screen — shaping performances, pacing, and visual tone into a cohesive cinematic experience.',
  },
  {
    num: '03',
    name: 'Video Editing',
    desc: 'Crafting seamless narratives in post-production with precise cuts, color grading, sound design, and visual effects that bring stories to life.',
  },
  {
    num: '04',
    name: 'Commercial Films',
    desc: 'Producing high-impact brand films, ad campaigns, and promotional content that connect with audiences and drive engagement.',
  },
  {
    num: '05',
    name: 'Music Videos',
    desc: 'Creating visually immersive music videos with dynamic storytelling, bold aesthetics, and cinematic production quality.',
  },
];

const ServicesSection = () => {
  return (
    <section
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]
                 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn delay={0} y={40} viewportAmount={0.3}>
        <h2
          className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Services
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {services.map((service, i) => (
          <FadeIn 
            key={service.num} 
            delay={0.1} 
            y={50} 
            viewportAmount={0.5} // Wait until half the item is in view
            className="border-b"
            style={{ borderColor: 'rgba(12, 12, 12, 0.15)' }}
          >
            <div className="flex items-start gap-6 sm:gap-8 md:gap-12 py-8 sm:py-10 md:py-12">
              <span
                className="font-black text-[#0C0C0C] leading-none flex-shrink-0"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {service.num}
              </span>
              <div className="flex flex-col gap-2 pt-2 sm:pt-4 md:pt-6">
                <h3
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </h3>
                <p
                  className="font-light leading-relaxed text-[#0C0C0C] opacity-60 max-w-2xl"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                >
                  {service.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
