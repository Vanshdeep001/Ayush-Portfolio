import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import './AboutModal.css';

/* ── Cinematic section data ── */
const sections = [
  {
    id: 'intro',
    chapter: '01',
    heading: 'The Origin',
    body: (
      <>
        Hello, I'm <em>Ayush Kumar</em> from <em>Bokaro Steel City, Jharkhand</em> — a
        passionate filmmaker and storyteller driven by the vision of creating cinema that
        leaves a lasting emotional and psychological impact on audiences. Alongside my
        creative journey, I am currently pursuing{' '}
        <em>B.Tech in Computer Science (CCVT), 3rd Year</em> at{' '}
        <em>University of Petroleum and Energy Studies</em>.
      </>
    ),
  },
  {
    id: 'craft',
    chapter: '02',
    heading: 'The Craft',
    body: (
      <>
        I work across multiple areas of filmmaking including{' '}
        <em>writing, screenplay development, direction, cinematography, editing, and production</em>.
        My creative vision mainly explores genres such as{' '}
        <em>
          dark thrillers, psychological rage, dark romance, survival thrillers, science fiction,
          emotionally driven narratives, and socially impactful stories
        </em>
        . I am deeply interested in exploring human emotions, conflict, fear, obsession,
        survival, and reality through visually immersive storytelling and cinematic atmosphere.
      </>
    ),
  },
  {
    id: 'quote',
    chapter: null,
    heading: null,
    isQuote: true,
    quoteText:
      '"Pick up a camera. Shoot something. No matter how small, no matter how cheesy, no matter whether your friends and your sister star in it. Put your name on it as director. Now you\'re a director."',
    quoteAuthor: '— James Cameron',
    body: (
      <>
        This mindset strongly represents my filmmaking journey. I believe cinema begins with
        passion, creativity, and the courage to create instead of waiting for perfect
        conditions. Every project I work on becomes an opportunity to experiment, improve my
        storytelling, and evolve both creatively and professionally.
      </>
    ),
  },
  {
    id: 'vision',
    chapter: '03',
    heading: 'The Vision',
    body: (
      <>
        My strongest creative abilities lie in{' '}
        <em>
          visual storytelling, dark atmosphere creation, cinematic framing, story-driven
          editing, and exploring character psychology through emotionally intense narratives
        </em>
        . I enjoy building cinematic worlds that create emotional depth and leave a lasting
        impression through visuals, pacing, atmosphere, sound, and unique camera work. My aim
        is to create a distinctive style of storytelling that delivers immersive experiences
        and emotionally powerful cinema.
      </>
    ),
  },
  {
    id: 'tools',
    chapter: '04',
    heading: 'The Tools',
    body: (
      <>
        For cinematography, I primarily work using the <em>iPhone 16 Pro Max</em>, which has
        helped me understand how creativity, framing, lighting, and storytelling are more
        important than expensive equipment. Working with mobile cinematography has strengthened
        my practical filmmaking skills, adaptability, and visual experimentation. At the same
        time, I am continuously upgrading and refining my camera work, cinematic techniques,
        and technical understanding to achieve more professional and visually advanced
        storytelling.
      </>
    ),
  },
  {
    id: 'influences',
    chapter: '05',
    heading: 'The Influences',
    body: (
      <>
        My storytelling style is heavily influenced by filmmakers like Sandeep Reddy Vanga,
        Christopher Nolan, and James Cameron. What inspires me most about their work is their
        ability to create strong world-building, impactful narration, powerful screenplays,
        cinematic visual design, and storytelling concepts that emotionally connect with
        audiences while maintaining a unique cinematic identity.
      </>
    ),
  },
  {
    id: 'journey',
    chapter: '06',
    heading: 'The Journey',
    body: (
      <>
        I have worked on <em>two short films</em> and multiple creative video projects where I
        gained practical experience in directing, cinematography, editing, screenplay writing,
        and production execution. One of the biggest milestones in my journey was having my{' '}
        <em>first short film officially selected for a college film festival</em>, which
        strengthened my confidence and passion for filmmaking.
        <br /><br />
        Alongside filmmaking, I have also held{' '}
        <em>head and executive positions in college clubs and creative societies</em>, where I
        developed strong <em>leadership, teamwork, communication, and execution skills</em>.
        Working in creative teams and leading productions has taught me how to manage pressure,
        coordinate ideas effectively, and transform creative vision into reality while
        maintaining professionalism and collaboration throughout the production process.
      </>
    ),
  },
  {
    id: 'edge',
    chapter: '07',
    heading: 'The Edge',
    body: (
      <>
        Being a Computer Science student also gives me a unique perspective toward filmmaking.
        It helps me approach cinema with{' '}
        <em>
          analytical thinking, structured execution, problem-solving ability, and modern
          digital creativity
        </em>
        . I constantly challenge myself to learn new techniques, experiment with storytelling
        styles, and improve with every project I create.
      </>
    ),
  },
  {
    id: 'finale',
    chapter: null,
    heading: 'The Finale',
    isFinale: true,
    body: (
      <>
        For me, filmmaking is not just about creating visuals — it is about creating
        experiences, emotions, and stories that audiences can connect with and remember long
        after the screen fades to black. My ultimate goal is to become a film director who
        brings fresh cinematic experiences and powerful storytelling to audiences through
        emotionally impactful narratives, unique visual language, and unforgettable cinematic
        worlds.
      </>
    ),
  },
];

/* ── Framer motion variants ── */
const backdropV = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const panelV = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  visible: {
    clipPath: 'inset(0% 0 0 0)',
    transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    clipPath: 'inset(0 0 100% 0)',
    transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] },
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } },
};

const fadeSlide = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Component ── */
const AboutModal = ({ isOpen, onClose }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      scrollRef.current?.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="am-backdrop"
          variants={backdropV}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="am-panel"
            variants={panelV}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* ── Decorative film perforations ── */}
            <div className="am-perf am-perf--l" aria-hidden="true">
              {Array.from({ length: 30 }).map((_, i) => (
                <span key={i} className="am-perf-hole" />
              ))}
            </div>
            <div className="am-perf am-perf--r" aria-hidden="true">
              {Array.from({ length: 30 }).map((_, i) => (
                <span key={i} className="am-perf-hole" />
              ))}
            </div>

            {/* ── Close ── */}
            <button className="am-close" onClick={onClose} aria-label="Close">
              <span className="am-close-line" />
              <span className="am-close-line" />
            </button>

            {/* ── Scrollable content ── */}
            <div className="am-scroll" ref={scrollRef}>
              {/* Hero title area */}
              <motion.header
                className="am-hero"
                variants={stagger}
                initial="hidden"
                animate="visible"
              >
                <motion.span className="am-hero-tag" variants={fadeSlide}>
                  About Ayush Kumar
                </motion.span>
                <motion.h2 className="am-hero-title" variants={fadeSlide}>
                  The Story
                  <br />
                  Behind The
                  <br />
                  <span className="am-hero-accent">Lens</span>
                </motion.h2>
                <motion.div className="am-hero-line" variants={fadeSlide} />
              </motion.header>

              {/* Sections */}
              <motion.div
                className="am-sections"
                variants={stagger}
                initial="hidden"
                animate="visible"
              >
                {sections.map((s) => (
                  <motion.article
                    key={s.id}
                    className={`am-section ${s.isQuote ? 'am-section--quote' : ''} ${s.isFinale ? 'am-section--finale' : ''}`}
                    variants={fadeSlide}
                  >
                    {s.chapter && (
                      <span className="am-chapter">{s.chapter}</span>
                    )}
                    {s.heading && (
                      <h3 className="am-heading">{s.heading}</h3>
                    )}

                    {/* Quote block */}
                    {s.isQuote && (
                      <blockquote className="am-quote">
                        <span className="am-quote-mark">"</span>
                        <p className="am-quote-text">{s.quoteText}</p>
                        <cite className="am-quote-author">{s.quoteAuthor}</cite>
                      </blockquote>
                    )}

                    <p className="am-body">{s.body}</p>
                  </motion.article>
                ))}
              </motion.div>

              {/* Footer */}
              <motion.footer className="am-footer" variants={fadeSlide}>
                <div className="am-footer-line" />
                <span className="am-footer-text">
                  Ayush Kumar · Filmmaker · Storyteller
                </span>
              </motion.footer>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AboutModal;
