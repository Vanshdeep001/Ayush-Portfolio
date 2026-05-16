import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ──────────────────────────────────────────
   Contact data
   ────────────────────────────────────────── */
const contacts = [
  {
    id: 'phone',
    num: '01',
    label: 'Phone',
    value: '+91 990 527 2012',
    href: 'tel:+919905272012',
  },
  {
    id: 'email',
    num: '02',
    label: 'Email',
    value: 'filmmakerayush13@gmail.com',
    href: 'mailto:filmmakerayush13@gmail.com',
  },
  {
    id: 'linkedin',
    num: '03',
    label: 'LinkedIn',
    value: 'Ayush Kumar',
    href: 'https://www.linkedin.com/in/ayush-kumar-4a50b12a7',
  },
  {
    id: 'instagram',
    num: '04',
    label: 'Instagram',
    value: '@ayush_kumar2.0',
    href: 'https://www.instagram.com/ayush_kumar2.0',
  },
];

/* ──────────────────────────────────────────
   Film grain canvas — keeps the cinematic feel
   ────────────────────────────────────────── */
const FilmGrain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frame;

    const draw = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const imgData = ctx.createImageData(canvas.width, canvas.height);
      const d = imgData.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() * 255;
        d[i] = v; d[i + 1] = v; d[i + 2] = v; d[i + 3] = 10;
      }
      ctx.putImageData(imgData, 0, 0);
      frame = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', mixBlendMode: 'overlay',
      }}
    />
  );
};

/* ──────────────────────────────────────────
   Single contact row — full-width editorial style
   ────────────────────────────────────────── */
const ContactRow = ({ item, index }) => (
  <motion.a
    href={item.href}
    target={item.href.startsWith('http') ? '_blank' : undefined}
    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      delay: 0.5 + index * 0.15,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    }}
    style={{ textDecoration: 'none', display: 'block', cursor: 'pointer' }}
    onMouseEnter={(e) => {
      const row = e.currentTarget;
      row.querySelector('.row-num').style.color = 'rgba(215,226,234,0.6)';
      row.querySelector('.row-label').style.color = 'rgba(215,226,234,0.7)';
      row.querySelector('.row-value').style.color = '#ffffff';
      row.querySelector('.row-value').style.transform = 'translateX(12px)';
      row.querySelector('.row-arrow').style.opacity = '1';
      row.querySelector('.row-arrow').style.transform = 'translateX(0)';
      row.querySelector('.row-line').style.background = 'rgba(215,226,234,0.15)';
    }}
    onMouseLeave={(e) => {
      const row = e.currentTarget;
      row.querySelector('.row-num').style.color = 'rgba(215,226,234,0.1)';
      row.querySelector('.row-label').style.color = 'rgba(215,226,234,0.3)';
      row.querySelector('.row-value').style.color = 'rgba(215,226,234,0.85)';
      row.querySelector('.row-value').style.transform = 'translateX(0)';
      row.querySelector('.row-arrow').style.opacity = '0';
      row.querySelector('.row-arrow').style.transform = 'translateX(-10px)';
      row.querySelector('.row-line').style.background = 'rgba(215,226,234,0.05)';
    }}
  >
    {/* Top divider line */}
    <div
      className="row-line"
      style={{
        height: '1px',
        background: 'rgba(215,226,234,0.05)',
        transition: 'background 0.5s',
      }}
    />

    {/* Row content */}
    <div style={{
      display: 'flex',
      alignItems: 'baseline',
      padding: '28px 0',
      gap: '20px',
    }}>
      {/* Number */}
      <span
        className="row-num"
        style={{
          fontFamily: 'monospace',
          fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)',
          fontWeight: 400,
          color: 'rgba(215,226,234,0.1)',
          transition: 'color 0.4s',
          flexShrink: 0,
          width: '28px',
        }}
      >
        {item.num}
      </span>

      {/* Label */}
      <span
        className="row-label"
        style={{
          fontSize: 'clamp(0.55rem, 0.9vw, 0.7rem)',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.25em',
          color: 'rgba(215,226,234,0.3)',
          transition: 'color 0.4s',
          flexShrink: 0,
          width: '90px',
        }}
      >
        {item.label}
      </span>

      {/* Value — the star of the row */}
      <span
        className="row-value"
        style={{
          fontSize: 'clamp(1.2rem, 3.5vw, 2.8rem)',
          fontWeight: 300,
          color: 'rgba(215,226,234,0.85)',
          letterSpacing: '-0.01em',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          flex: 1,
          lineHeight: 1.2,
        }}
      >
        {item.value}
      </span>

      {/* Arrow — appears on hover */}
      <span
        className="row-arrow"
        style={{
          fontSize: '1.4rem',
          color: 'rgba(215,226,234,0.4)',
          opacity: 0,
          transform: 'translateX(-10px)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          flexShrink: 0,
        }}
      >
        →
      </span>
    </div>
  </motion.a>
);

/* ──────────────────────────────────────────
   Main modal — full-screen cinematic credits
   ────────────────────────────────────────── */
const ContactModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999]"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(100% 0 0 0)' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          style={{
            background: '#080808',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <FilmGrain />

          {/* Scanlines */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.015) 3px, rgba(0,0,0,0.015) 6px)',
            pointerEvents: 'none',
          }} />

          {/* Close */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={onClose}
            style={{
              position: 'fixed', top: '28px', right: '28px',
              background: 'none',
              border: '1px solid rgba(215,226,234,0.08)',
              borderRadius: '50%',
              width: '48px', height: '48px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              color: 'rgba(215,226,234,0.3)',
              transition: 'all 0.3s',
              zIndex: 10,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(215,226,234,0.25)';
              e.currentTarget.style.color = '#D7E2EA';
              e.currentTarget.style.transform = 'rotate(90deg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(215,226,234,0.08)';
              e.currentTarget.style.color = 'rgba(215,226,234,0.3)';
              e.currentTarget.style.transform = 'rotate(0deg)';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </motion.button>

          {/* Content */}
          <div style={{
            position: 'relative', zIndex: 5,
            width: '100%', maxWidth: '900px',
            padding: '60px 32px',
          }}>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ marginBottom: '56px' }}
            >


              <h2 style={{
                fontSize: 'clamp(2.2rem, 7vw, 5rem)',
                fontWeight: 200,
                color: '#D7E2EA',
                lineHeight: 1,
                margin: 0,
                letterSpacing: '-0.03em',
              }}>
                Let's work{' '}
                <span style={{ fontStyle: 'italic', fontWeight: 300 }}>
                  together
                </span>
              </h2>
            </motion.div>

            {/* Contact rows */}
            <div>
              {contacts.map((item, i) => (
                <ContactRow key={item.id} item={item} index={i} />
              ))}
              {/* Bottom line */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                style={{
                  height: '1px',
                  background: 'rgba(215,226,234,0.05)',
                }}
              />
            </div>


          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
