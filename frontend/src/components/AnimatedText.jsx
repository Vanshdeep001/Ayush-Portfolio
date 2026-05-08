import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AnimatedChar = ({ char, index, total, progress }) => {
  // We want the animation to start early and finish before the scroll ends
  // So we map the progress (0 to 1) to a tighter range (e.g., 0.1 to 0.9)
  const charStart = index / total;
  const charEnd = (index + 1) / total;
  
  // This opacity mapping happens within the progress provided by the parent
  const opacity = useTransform(progress, [charStart, charEnd], [0.2, 1]);

  return (
    <motion.span style={{ opacity }}>
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
};

const AnimatedText = ({ text, className = '', style = {}, progress }) => {
  // Use the progress passed from the parent instead of calculating its own
  const words = text.split(' ');
  let charCounter = 0;

  return (
    <p className={className} style={style}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map((char, ci) => {
            const globalIndex = charCounter++;
            return (
              <AnimatedChar
                key={ci}
                char={char}
                index={globalIndex}
                total={text.length}
                progress={progress}
              />
            );
          })}
          {wi < words.length - 1 && (
            <AnimatedChar
              char=" "
              index={charCounter++}
              total={text.length}
              progress={progress}
            />
          )}
        </span>
      ))}
    </p>
  );
};

export default AnimatedText;
