import { useRef, useState, useEffect } from 'react';

const allImages = [
  '/images/IMG_7452.PNG',
  '/images/IMG_7453.PNG',
  '/images/IMG_7454.PNG',
  '/images/IMG_7456 (1).PNG',
  '/images/IMG_7457.PNG',
  '/images/WhatsApp Image 2026-05-17 at 00.44.23.jpeg',
];

const row1Images = allImages.slice(0, 3);
const row2Images = allImages.slice(3);

/* Repeat enough times so the strip always covers the viewport */
const repeat = (arr, n) => Array.from({ length: n }, () => arr).flat();
const strip1 = repeat(row1Images, 8);
const strip2 = repeat(row2Images, 16);

const MarqueeSection = () => {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.offsetTop;
      const newOffset =
        (window.scrollY - sectionTop + window.innerHeight) * 0.35;
      setOffset(newOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-12 sm:pt-16 md:pt-20 pb-20 sm:pb-24 md:pb-28 overflow-hidden relative z-[1]"
    >
      <div className="flex flex-col gap-3">
        {/* Row 1 — moves right */}
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(${offset - 1400}px)`,
            willChange: 'transform',
          }}
        >
          {strip1.map((src, i) => (
            <img
              key={`r1-${i}`}
              src={src}
              alt=""
              loading="lazy"
              className="w-[420px] h-[270px] rounded-2xl object-cover flex-shrink-0"
            />
          ))}
        </div>

        {/* Row 2 — moves left */}
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(${-offset - 200}px)`,
            willChange: 'transform',
          }}
        >
          {strip2.map((src, i) => (
            <img
              key={`r2-${i}`}
              src={src}
              alt=""
              loading="lazy"
              className="w-[420px] h-[270px] rounded-2xl object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
