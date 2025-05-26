/**
 * Hero Section component for the portfolio website landing page.
 * 
 * @fileoverview Main landing section that serves as the first impression for visitors.
 * Features animated text introduction and profile image with responsive layout.
 * 
 * @description The Hero component displays a personal introduction with:
 * - Animated greeting text with slide-in effects
 * - Large name display as the main focal point
 * - Brief personal description/tagline
 * - Professional profile image with styling
 * - Fully responsive design (mobile-first approach)
 * 
 * @component
 * @example
 * // Basic usage 
 * import Hero from './Hero';
 * 
 * function App() {
 *   return (
 *     <div>
 *       <Hero />
 *     </div>
 *   );
 * }
 * 
 * @dependencies
 * - framer-motion (motion animations and transitions)
 * - React (functional component)
 * 
 * @assets
 * - HeroPic (../../assets/icon.jpg) - Profile/hero image
 * 
 * @animations
 * @description Uses Framer Motion for smooth entrance animations:
 * - Text elements slide in from left (-100px) to center (0px)
 * - Staggered animation timing for visual hierarchy
 * - Opacity fade-in effect combined with slide motion
 * 
 * @styling
 * @requires Tailwind CSS for responsive layout and styling
 * @breakpoints
 * - default: Mobile Vertical stack layout, centered text
 * - lg: Horizontal layout, left-aligned text
 * 
 * @see {@link https://www.framer.com/motion/} Framer Motion documentation
 * @see {@link https://tailwindcss.com/docs/responsive-design} Tailwind responsive design
 * 
 * @version 1.0.0
 * @since 2025-01-17
 * @author Stefanos Englezou <egglezoustefanos@gmail.com>
 */
import { motion } from "framer-motion"; 
import HeroPic from "../../assets/icon.jpg";

// Animation timing constants
const LETTER_DELAY = 0.075;
const BOX_FADE_DURATION = 0.175;

/**
 * Typewrite Component
 * @description Renders a sentence with a typewriter effect using staggered animation.
 *
 * @param {{ sentence: string }} props - The sentence to animate.
 * @returns {JSX.Element}
 */
const Typewrite = ({ sentence }) => {
    const words = sentence.split(" ");
    let letterIndex = 0; // Global letter counter for continuous timing
    
    return (
        <p className="mt-5 break-words leading-relaxed">
            {words.map((word, wordIndex) => (
                <motion.span
                    key={wordIndex}
                    className="inline-block whitespace-nowrap mr-2" // Force word to stay together
                >
                    {word.split("").map((letter, letterIndexInWord) => {
                        const currentLetterIndex = letterIndex++;
                        return (
                            <motion.span className="relative inline-block" key={letterIndexInWord}>
                                {/* Fading in each character with delay */}
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        delay: currentLetterIndex * LETTER_DELAY,
                                        duration: 1,
                                    }}
                                    className="text-2xl lg:text-3xl font-sans mb-5 text-slate-300"
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
                    })}
                </motion.span>
            ))}
        </p>
    );
};

/**
 * Hero Component
 * @description Main hero section with animated text and profile image.
 * @returns {JSX.Element}
 */
const Hero = () => {
    return (
        <section className="flex flex-col lg:flex-row justify-around items-center p-10 space-y-10 text-white">
            
            {/* Text content block (left on large screens) */}
            <div className="lg:w-1/3 w-full text-center lg:text-left">
                {/* Animated greeting */}
                <motion.p
                    className="text-4xl mb-5 text-slate-300"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    Hi! I'm
                </motion.p>

                {/* Animated name */}
                <motion.h1
                    className="text-6xl mb-5"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2 }}
                >
                    Stefanos
                </motion.h1>

                <hr />

                {/* Typewriter animated tagline */}
               <div className="max-w-full break-words">
                    <Typewrite sentence="Welcome to my personal webpage!" />
                </div>
            </div>

            {/* Profile image block (right on large screens) */}
            <div className="flex justify-center bg-slate-500 rounded-full shadow-lg">
                <img
                    src={HeroPic}
                    alt="Hero"
                    width={250}
                    height={250}
                    className="rounded-full w-full border-8 border-black object-cover"
                />
            </div>
        </section>
    );
};

export default Hero;
