import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';
import LiveProjectButton from './LiveProjectButton';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Fallback data so the site never breaks if the backend is down
const fallbackProjects = [
  {
    id: 1,
    num: '01',
    category: 'Film',
    name: 'The Escape Teaser',
    type: 'video',
    videoUrl: 'https://ayushs-portfolio.s3.ap-south-1.amazonaws.com/project+1.mov',
    description: 'Crafted entirely on iPhone, this teaser delivers a raw and immersive roller-coaster cinematic experience through intense visuals, dynamic shots, and gripping atmosphere.',
  },
  {
    id: 2,
    num: '02',
    category: 'Film',
    name: 'Blood Paradise Announcement',
    type: 'video',
    videoUrl: 'https://ayushs-portfolio.s3.ap-south-1.amazonaws.com/film30.mov',
    description: 'A hauntingly brutal visual announcement that unfolds through blood-soaked imagery and dark cinematic symbolism, revealing the terrifying timeline of Blood Paradise.',
  },
  {
    id: 3,
    num: '03',
    category: 'Film',
    name: 'The Escape',
    type: 'video',
    videoUrl: 'https://ayushs-portfolio.s3.ap-south-1.amazonaws.com/g5.mov',
    description: 'A metaphorical roller-coaster film driven more by actions than words, where emotions, tension, and storytelling unfold through powerful visuals and cinematic expression.',
  },
  {
    id: 4,
    num: '04',
    category: 'Cultural',
    name: 'Chaat Film',
    type: 'video',
    videoUrl: 'https://ayushs-portfolio.s3.ap-south-1.amazonaws.com/chat6.mov',
    description: 'A cultural cinematic portrayal of the grand festival celebrated across Bihar, Jharkhand, and Chhattisgarh, capturing deep devotion, traditions, and spiritual connection.',
  },
  {
    id: 5,
    num: '05',
    category: 'Event',
    name: 'College Cultural Festival Glimpse',
    type: 'video',
    videoUrl: 'https://ayushs-portfolio.s3.ap-south-1.amazonaws.com/ak7.mov',
    description: 'A high-energy cinematic glimpse of the college cultural fest where artist B Praak set the stage on fire, showcasing electrifying performances and unforgettable moments.',
  },
  {
    id: 6,
    num: '06',
    category: 'Short Film',
    name: 'KARM — The Game of Yes and No',
    type: 'video',
    videoUrl: 'https://ayushs-portfolio.s3.ap-south-1.amazonaws.com/K2.mov',
    description: 'My first short film, officially selected for the college film festival, telling the story of a college student through an engaging narrative that explores choices and emotions.',
  },
];

/* ─────────────────────────────────────────────────────────────
   Card content renderers
   ───────────────────────────────────────────────────────────── */

const ImageCardContent = ({ project }) => (
  <>
    <div className="flex flex-wrap items-start justify-between gap-4 mb-3 sm:mb-4">
      <div className="flex items-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
        <span
          className="font-black text-[#D7E2EA] leading-none"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
        >
          {project.num}
        </span>
        <div className="flex flex-col gap-1">
          <span className="text-[#D7E2EA]/60 text-sm uppercase tracking-widest">
            {project.category}
          </span>
          <h3
            className="text-[#D7E2EA] font-medium uppercase"
            style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2.2rem)' }}
          >
            {project.name}
          </h3>
        </div>
      </div>
      <LiveProjectButton />
    </div>
    <div className="flex gap-3 sm:gap-4 flex-1 min-h-0">
      <div className="w-[40%] flex flex-col gap-3 sm:gap-4 min-h-0">
        <img
          src={project.col1img1}
          alt=""
          className="w-full flex-1 min-h-0 object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
        />
        <img
          src={project.col1img2}
          alt=""
          className="w-full flex-1 min-h-0 object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
        />
      </div>
      <div className="w-[60%]">
        <img
          src={project.col2img}
          alt=""
          className="w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
        />
      </div>
    </div>
  </>
);

const VideoCardContent = ({ project }) => (
  <>
    <div className="flex flex-wrap items-start justify-between gap-4 mb-3 sm:mb-4">
      <div className="flex items-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
        <span
          className="font-black text-[#D7E2EA] leading-none"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
        >
          {project.num}
        </span>
        <div className="flex flex-col gap-1">
          <span className="text-[#D7E2EA]/60 text-sm uppercase tracking-widest">
            {project.category}
          </span>
          <h3
            className="text-[#D7E2EA] font-medium uppercase"
            style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2.2rem)' }}
          >
            {project.name}
          </h3>
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-4 flex-1 min-h-0">
      {project.description && (
        <p className="text-[#D7E2EA]/70 text-sm sm:text-base italic tracking-wide px-2">
          &ldquo;{project.description}&rdquo;
        </p>
      )}
      <div className="flex-1 w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden relative bg-[#0C0C0C]">
        <video
          src={project.videoUrl}
          controls
          autoPlay
          muted
          loop
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  </>
);

/* ─────────────────────────────────────────────────────────────
   Individual card component.

   Two roles:
     • "active" card  → sits at y=0, z-index 1
     • "entering" card → slides up from 100% → 0%, z-index 2

   Since we only ever render 2 cards (active + entering), overlap
   between non-adjacent cards is impossible.
   ───────────────────────────────────────────────────────────── */

const SlidingCard = ({ project, isActive, cardStart, cardMid, scrollYProgress }) => {
  const y = useTransform(
    scrollYProgress,
    isActive ? [0, 0.001] : [cardStart, cardMid],
    isActive ? ['0%', '0%'] : ['100%', '0%']
  );

  return (
    <motion.div
      className="absolute inset-0 rounded-[40px] sm:rounded-[50px] md:rounded-[60px]
                 border-2 border-[#D7E2EA] bg-[#0C0C0C]
                 p-4 sm:p-5 md:p-6 overflow-hidden
                 will-change-transform flex flex-col"
      style={{
        y,
        zIndex: isActive ? 1 : 2,
      }}
    >
      {project.type === 'video' ? (
        <VideoCardContent project={project} />
      ) : (
        <ImageCardContent project={project} />
      )}
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────
   Main section — the scroll-locked pinned container.

   How it works:
   1. A tall outer wrapper creates the scroll distance.
   2. Inside, a sticky container pins the visible area.
   3. We track `activeIndex` from scrollYProgress — only the
      active card and the next entering card are rendered.
   4. All other cards are unmounted from the DOM, so zero
      chance of ghost overlap.
   ───────────────────────────────────────────────────────────── */

const ProjectsSection = () => {
  const [projects, setProjects] = useState(fallbackProjects);
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_URL}/api/projects`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.warn('Backend unreachable, using fallback projects:', err.message);
      }
    };
    fetchProjects();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const totalCards = projects.length;
  const segment = 1 / totalCards;

  // Track which card segment the scroll is in
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const idx = Math.min(Math.floor(v / segment), totalCards - 1);
      setActiveIndex(idx);
    });
    return unsubscribe;
  }, [scrollYProgress, segment, totalCards]);

  return (
    <section
      id="projects"
      className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]
                 -mt-10 sm:-mt-12 md:-mt-14 relative z-10"
    >
      {/* Heading — scrolls normally before the pinned area */}
      <div className="px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-10 sm:pb-14 md:pb-20">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Project
          </h2>
        </FadeIn>
      </div>

      {/* Scroll-locked wrapper: tall enough to drive the animation */}
      <div
        ref={sectionRef}
        className="relative"
        style={{ height: `${totalCards * 100}vh` }}
      >
        {/* Sticky viewport — this is what "locks" the screen */}
        <div className="sticky top-0 h-screen overflow-hidden px-5 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6">
          <div className="max-w-7xl mx-auto relative h-full">
            {projects.map((project, i) => {
              // Only render the active card and the next one sliding in
              const isActive = i === activeIndex;
              const isNext = i === activeIndex + 1;
              if (!isActive && !isNext) return null;

              const cardStart = i * segment;
              const cardMid = cardStart + segment * 0.5;

              return (
                <SlidingCard
                  key={project.id || project.num}
                  project={project}
                  isActive={isActive}
                  cardStart={cardStart}
                  cardMid={cardMid}
                  scrollYProgress={scrollYProgress}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
