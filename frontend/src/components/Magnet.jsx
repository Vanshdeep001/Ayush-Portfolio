import { useState, useRef, useEffect, useCallback } from 'react';

const Magnet = ({
  children,
  padding = 100,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
}) => {
  const ref = useRef(null);
  const [style, setStyle] = useState({
    transform: 'translate3d(0, 0, 0)',
    transition: inactiveTransition,
    willChange: 'transform',
  });

  const handleMouseMove = useCallback(
    (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      const isInRange =
        e.clientX >= rect.left - padding &&
        e.clientX <= rect.right + padding &&
        e.clientY >= rect.top - padding &&
        e.clientY <= rect.bottom + padding;

      if (isInRange) {
        setStyle({
          transform: `translate3d(${distX / strength}px, ${distY / strength}px, 0)`,
          transition: activeTransition,
          willChange: 'transform',
        });
      } else {
        setStyle((prev) =>
          prev.transform !== 'translate3d(0, 0, 0)'
            ? {
                transform: 'translate3d(0, 0, 0)',
                transition: inactiveTransition,
                willChange: 'transform',
              }
            : prev
        );
      }
    },
    [padding, strength, activeTransition, inactiveTransition]
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
};

export default Magnet;
