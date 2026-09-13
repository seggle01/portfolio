import { motion } from "framer-motion";
import { useState, useEffect, useRef } from 'react';
import NET from 'vanta/dist/vanta.net.min';

const Typewrite = ({ sentence }) => {
    
    // Animation timing constants
    const LETTER_DELAY = 0.075;
    const BOX_FADE_DURATION = 0.175;

    const words = sentence.split(" ");
    let letterIndex = 0; // Global letter counter for continuous timing
    
    return (
        <p className="font-serif mt-5 break-words leading-relaxed">
            {/* Map each word in the array with an index
                and create a span element for it. */}
            {words.map((word, wordIndex) => (
                <motion.span key={wordIndex} className="inline-block whitespace-nowrap mr-2" // Force word to stay together
                >{
                    // Now for each word map each letter with an index 
                    // and create an animated motion span for each one
                    word.split("").map((letter, letterIndexInWord) => {
                        const currentLetterIndex = letterIndex++; // Keep current index
                        return (
                            // Each span has two sub elements: One is the letter itself and the other the flashing box cursor
                            <motion.span className="relative inline-block" key={letterIndexInWord}>
                                {/* Fading in each character with delay */}
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        delay: currentLetterIndex * LETTER_DELAY,
                                        duration: 1,
                                    }}
                                    className="text-3xl lg:text-4xl mb-5 text-white"
                                >
                                    {letter}
                                </motion.span>

                                {/* Flashing box cursor effect */}
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{
                                        delay: currentLetterIndex * LETTER_DELAY,
                                        duration: BOX_FADE_DURATION,
                                        ease: "easeInOut",
                                        times: [0, 0.1, 1],
                                    }}
                                    className="absolute bottom-[3px] left-[1px] right-0 top-[3px] bg-stone-950"
                                />
                            </motion.span>
                        );
                    })

                }</motion.span>
            ))}
        </p>
    );
};

const Background = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);

  useEffect(() => {
    // Tailwind's md breakpoint is 768px
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const getVantaConfig = (isMdOrAbove) => ({
      // Current desktop (md+) values
      points: isMdOrAbove ? 15.0 : 8.0,
      maxDistance: isMdOrAbove ? 30.0 : 20.0,
      spacing: isMdOrAbove ? 20.0 : 20.0,
    });

    let effect = null;

    if (!vantaEffect && myRef.current) {
      const isMd = mediaQuery.matches;
      const responsiveSettings = getVantaConfig(isMd);

      effect = NET({
        el: myRef.current,
        mouseControls: true,
        touchControls: true,
        minHeight: 150.0,
        minWidth: 150.0,
        scale: 1.0,
        scaleMobile: 1.0,
        // color: 0x55acc5,
        color: 0xA595D4,
        backgroundColor: 0x1e293b,
        ...responsiveSettings,
      });

      setVantaEffect(effect);
    }

    // Update settings if the user crosses the breakpoint while resizing
    const handleBreakpointChange = (e) => {
      const activeEffect = effect || vantaEffect;
      if (activeEffect && typeof activeEffect.setOptions === 'function') {
        activeEffect.setOptions(getVantaConfig(e.matches));
      }
    };

    mediaQuery.addEventListener('change', handleBreakpointChange);

    return () => {
      mediaQuery.removeEventListener('change', handleBreakpointChange);
      if (effect) effect.destroy();
      else if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div
      ref={myRef}
      className="relative flex h-96 w-full items-center justify-center overflow-hidden"
    >
      <div className="relative z-10 px-4 text-center">
        <Typewrite sentence="Welcome to my personal webpage!" />
      </div>
    </div>
  );
};

const Intro = () => {
    return (
        <section className="relative w-full overflow-hidden border-y border-white">
            <Background />
        </section>
    );
};

export default Intro;
