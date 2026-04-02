import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TimelineItem = ({ title, date, description, index }) => {
    const itemVariants = {
        hidden: { 
            opacity: 0, 
            y: 20,
            scale: 0.95
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: { 
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut"
            } 
        },
        exit: {
            opacity: 0,
            y: -20,
            scale: 0.95,
            transition: { duration: 0.3 }
        }
    };

    return (
        <motion.li
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative last:mb-0"
            data-testid={`timeline-item-${index}`}
        >
            <div className="flex items-start gap-4">
                {/* Timeline dot */}
                <div className="relative flex-shrink-0 mt-1">
                    <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"></div>
                    {/* Connecting line */}
                    <div className="absolute top-4 left-1/2 w-0.5 h-8 bg-gray-300 dark:bg-gray-600 transform -translate-x-1/2 last:hidden"></div>
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0 pb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            {title}
                        </h3>
                        <time className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-2 block">
                            {date}
                        </time>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed "  style={{ whiteSpace: 'pre-line' }}>
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </motion.li>
    );
};

const ExpandButton = ({ isExpanded, onClick, hiddenCount, isLoading }) => {
    return (
        <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
        >
            <motion.button
                onClick={onClick}
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-expanded={isExpanded}
                aria-label={isExpanded ? 'Show less timeline items' : `Show ${hiddenCount} more timeline items`}
            >
                <span>
                    {isLoading ? 'Loading...' : isExpanded ? 'Show Less' : `Show ${hiddenCount} More`}
                </span>
                <motion.svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
            </motion.button>
        </motion.div>
    );
};

const Timeline = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const defaultVisibleCount = 3;

    const timelineData = [
        { 
            id: 'job-2',
            title: "Grant Thornton, Nicosia, Cyprus", 
            date: "June 2025 - July 2025", 
            description: " Quantitative Risk department." 
        },
        { 
            id: 'job-1',
            title: "KIOS Center of Excellence, Nicosia, Cyprus", 
            date: "January 2024 - Present", 
            description: "Intern Research Engineer Position." 
        },
        { 
            id: 'cs-studies',
            title: "University of Cyprus, Nicosia, Cyprus", 
            date: "September 2022 - Present", 
            description: "Bachelor’s degree in computer science.\nCurrently on third year of studies.\nCurrent GPA: 8.01 / 10"
        },
        { 
            id: 'military',
            title: "Military Service – National Guard, Cyprus", 
            date: "2021 - 2022", 
            description: "Served in Armored Corps.\nRank: Private first class" 
        },
        { 
            id: 'school',
            title: "Arch.Makariou III Lyceum , Nicosia, Cyprus", 
            date: "2018 - 2021", 
            description: "Secondary education.\nGPA: 18.78 / 20" 
        },
    ];

    const visibleItems = isExpanded ? timelineData : timelineData.slice(0, defaultVisibleCount);
    const hiddenCount = Math.max(0, timelineData.length - defaultVisibleCount);

    const handleToggleExpand = async () => {
        setIsLoading(true);
        
        // Simulate loading delay for smooth UX (remove in production if not needed)
        await new Promise(resolve => setTimeout(resolve, 150));
        
        setIsExpanded(prev => !prev);
        setIsLoading(false);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    return (
        <section 
            id="experience" 
            className="max-w-4xl mx-auto pt-10 pb-5 px-6 sm:px-10"
            aria-labelledby="experience-heading"
        >
            <motion.h1 
                id="experience-heading"
                className="text-4xl text-white font-sans font-semibold mb-12 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Experience
            </motion.h1>
            
            <motion.div
                className="relative"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <AnimatePresence mode="wait">
                    <motion.ul 
                        key={isExpanded ? 'expanded' : 'collapsed'}
                        className="space-y-0"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={containerVariants}
                    >
                        {visibleItems.map((item, index) => (
                            <TimelineItem
                                key={item.id}
                                title={item.title}
                                date={item.date}
                                description={item.description}
                                index={index}
                            />
                        ))}
                    </motion.ul>
                </AnimatePresence>
            </motion.div>

            {hiddenCount > 0 && (
                <ExpandButton
                    isExpanded={isExpanded}
                    onClick={handleToggleExpand}
                    hiddenCount={hiddenCount}
                    isLoading={isLoading}
                />
            )}
        </section>
    );
};

export default Timeline;
