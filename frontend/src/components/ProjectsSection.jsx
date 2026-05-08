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
    category: 'Client',
    name: 'Nextlevel Studio',
    type: 'video',
    videoUrl: 'https://ayushs-portfolio.s3.ap-south-1.amazonaws.com/project+1.mov',
    description: 'Nextlevel Studio Brand Vision',
  },
  {
    id: 2,
    num: '02',
    category: 'Personal',
    name: 'Aura Brand Identity',
    col1img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  },
  {
    id: 3,
    num: '03',
    category: 'Client',
    name: 'Solaris Digital',
    col1img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
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
      <div className="flex-1 w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px] overflow-hidden relative bg-black/40">
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
   Single animated card — driven by the parent's scrollYProgress.

   Each card gets a slice of the overall scroll:
     cardStart → cardEnd  =  the window in which this card is "active"

   Transitions:
     • Y position: starts below (100%) → slides to 0 → stays
     • Scale of PREVIOUS card: 1 → shrinks to 0.92
     • Opacity of PREVIOUS card: 1 → fades to 0.5
   ───────────────────────────────────────────────────────────── */

const AnimatedCard = ({ project, index, totalCards, scrollYProgress }) => {
  const segment = 1 / totalCards;
  const cardStart = index * segment;
  const cardEnd = (index + 1) * segment;
  const cardMid = cardStart + segment * 0.4;

  // Card entrance: slide up from below
  // First card is always visible (starts at y=0)
  const y = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 0.001]
      : [cardStart, cardMid],
    index === 0
      ? ['0%', '0%']
      : ['100%', '0%']
  );

  // Card exit: scale down when the NEXT card arrives
  const scale = useTransform(
    scrollYProgress,
    [cardEnd - segment * 0.1, cardEnd + segment * 0.3],
    [1, 0.92]
  );

  // Card exit: fade when next card arrives
  const opacity = useTransform(
    scrollYProgress,
    [cardEnd - segment * 0.1, cardEnd + segment * 0.3],
    [1, 0.4]
  );

  // z-index: later cards stack on top
  const zIndex = index + 1;

  // The last card shouldn't scale/fade (nothing comes after it)
  const isLast = index === totalCards - 1;

  return (
    <motion.div
      className="absolute inset-0 rounded-[40px] sm:rounded-[50px] md:rounded-[60px]
                 border-2 border-[#D7E2EA] bg-[#0C0C0C]
                 p-4 sm:p-5 md:p-6 overflow-hidden
                 origin-top will-change-transform
                 flex flex-col"
      style={{
        y,
        scale: isLast ? 1 : scale,
        opacity: isLast ? 1 : opacity,
        zIndex,
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
   1. A tall outer wrapper creates the scroll distance
      (100vh per card = totalCards × 100vh).
   2. Inside, a `sticky` container pins the visible area to
      the viewport. The screen "stops" here.
   3. The overall scroll progress through the wrapper drives
      the card entrance/exit animations.
   4. Cards animate in-place — the screen doesn't move,
      only the cards transition.
   ───────────────────────────────────────────────────────────── */

const ProjectsSection = () => {
  const [projects, setProjects] = useState(fallbackProjects);
  const sectionRef = useRef(null);

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
        style={{ height: `${projects.length * 100}vh` }}
      >
        {/* Sticky viewport — this is what "locks" the screen */}
        <div className="sticky top-0 h-screen overflow-hidden px-5 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6">
          <div className="max-w-7xl mx-auto relative h-full">
            {projects.map((project, i) => (
              <AnimatedCard
                key={project.id || project.num}
                project={project}
                index={i}
                totalCards={projects.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
