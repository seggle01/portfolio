/**
 * Hero sectiion and Typewrite components for the portfolio website.
 * 
 * @fileoverview This file contains a responsive hero component that uses animations 
 * from framer-motion presenting the person image as well as an introductory welcoming message.
 * It also includes a Typewrite component that creates an typewrite animation.
 * 
 * @requires react
 * @requires framer-motion
 * @requires tailwindcss
 * @styling Tailwind CSS utility classes for responsive layout and design.
 * 
 * @see {@link https://www.framer.com/motion/} Framer Motion documentation
 * @see {@link https://tailwindcss.com/docs/responsive-design} Tailwind responsive design
 * 
 * 
 *  @assets
 * - HeroPic (../../assets/icon.jpg) - Profile/hero image
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
 * @component
 * Typewrite Component
 * 
 * @abstract Renders a sentence with a typewriter effect using staggered animation.
 * 
 * @description This component takes an sentence and divides the words to specific elements.
 * Then each word is divided to letter spans along with a flashing box cursor.
 *
 * @param {{ sentence: string }} props - The sentence to animate.
 * 
 * @returns {JSX.Element}
 */
const Typewrite = ({ sentence }) => {

    /**
     * An array of all the words in the sentence.
     * @type {string[]}
     */
    const words = sentence.split(" ");
    let letterIndex = 0; // Global letter counter for continuous timing
    
    return (
        <p className="mt-5 break-words leading-relaxed">
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
                    })

                }</motion.span>
            ))}
        </p>
    );
};

/**
 * @component
 * Hero Section Component
 * 
 * @description The Hero section for the personalized portfolio. A photo
 * of the person can be uploaded and also provide a welcoming message.
 * 
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
