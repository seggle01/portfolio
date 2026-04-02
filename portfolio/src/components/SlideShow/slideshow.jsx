//This is the SlideShow component for the projects
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import { useEffect, useState } from "react";

function SlideShow({ slides }) {
    const [slideIndex, setSlideIndex] = useState(0);
    const [isModalOpen, setModalOpen] = useState(false);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        // Cleanup: ensure scroll is re-enabled when component unmounts
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isModalOpen]);

    function setSlider(number) {
        if (slideIndex === 0 && number === -1) {
            setSlideIndex(slides.length - 1);
            return;
        }
        if (slideIndex === slides.length - 1 && number === 1) {
            setSlideIndex(0);
            return;
        }
        setSlideIndex(slideIndex + number);
    }

    function toggleModal() {
        setModalOpen(!isModalOpen);
    }

    const tagColors = {
        LibGDX: "bg-red-700",
        Javascript: "bg-yellow-400",
        Django: "bg-green-700",
        Python: "bg-teal-700",
        "Html/Css": "bg-orange-600",
        JQuery: "bg-red-700",
        PostgresSQL: "bg-blue-600",        
        Docker: "bg-blue-800",
        SQL: "bg-blue-500",
        QGIS: "bg-lime-900",
        UI: "bg-emerald-600",
        Laravel: "bg-purple-600",
        PHP: "bg-indigo-700",              
        Java: "bg-orange-500",             
    };

    const textColors = {
        LibGDX: "text-red-300",
        Javascript: "text-yellow-100",
        Django: "text-green-200",
        Python: "text-teal-200",
        "Html/Css": "text-orange-200",
        JQuery: "text-red-300",
        PostgresSQL: "text-blue-200",  
        Docker: "text-blue-200",
        SQL: "text-blue-200",             
        QGIS: "text-lime-200",             
        UI: "text-emerald-100",
        Laravel: "text-purple-200",        
        PHP: "text-indigo-200",          
        Java: "text-orange-200",           
    };

    const borderColors = {
        LibGDX: "border-red-800",
        Javascript: "border-yellow-500",
        Django: "border-green-800",
        Python: "border-teal-800",
        "Html/Css": "border-orange-700",
        JQuery: "border-red-800",
        PostgresSQL: "border-blue-700",        
        Docker: "border-blue-900",
        SQL: "border-blue-600",
        QGIS: "border-lime-900",
        UI: "border-emerald-700",
        Laravel: "border-purple-700",
        PHP: "border-indigo-800",              
        Java: "border-orange-600",            
    };

    function getTagColor(tag) {
        return tagColors[tag] || "bg-gray-500";
    }

    function getTextColor(tag) {
        return textColors[tag] || "text-white";
    }

    function getBorderColor(tag) {
        return borderColors[tag] || "border-gray-600";
    }

    return (
        <div id="slider" className="flex flex-col items-center justify-center p-8">
            {slides && (
                <>
                    <div className="relative w-full h-[calc(100vw/2)] 
                                    sm:h-[200px] md:h-[300px] lg:h-[400px]">
                            <img className="shadow-lg rounded-xl object-cover w-full h-full 
                                            transition-all duration-300 ease-in-out transform hover:scale-105"
                                            src={slides[slideIndex].image} alt={`Slide ${slideIndex + 1}`}/>

                            <div className="absolute rounded-xl inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center 
                                            text-white opacity-0 opacity-100 transition-opacity duration-300">

                                <h2 className="text-[5vw] ssm:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold my-2 text-center ">{slides[slideIndex].title}</h2>

                                <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-2 px-4 text-center">{slides[slideIndex].description}</p>

                                <button onClick={toggleModal} className="bg-blue-500 px-2 text-white py-py text-sm rounded mb-2 font-medium
                                  ssm:text-sm sm:py-2 sm:text-base md:px-4 md:text-lg lg:px-8 lg:text-xl">
                                    View More
                                </button>
                            </div>
                    </div>
                    <div className="flex">
                        <GrFormPreviousLink
                        className="btn-prev top-1/2 w-10 h-10 sm:left-10 bg-white mr-4 mt-4 p-2 rounded-full shadow-lg hover:cursor-pointer"
                        onClick={() => setSlider(-1)}
                        />
                        <GrFormNextLink
                            className="btn-next top-1/2 w-10 h-10 sm:right-10 bg-white ml-4 mt-4 p-2 shadow-lg rounded-full hover:cursor-pointer"
                            onClick={() => setSlider(1)}
                        />
                    </div>
                    
                </>
            )}

            {/* Improved Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-slate-600 rounded-lg p-6 sm:p-8 w-full max-w-sm sm:max-w-lg lg:max-w-2xl border-2 border-slate-700 overflow-y-auto">
                        {/* Close button */}
                        <button 
                            onClick={toggleModal}
                            className="float-right text-white hover:text-gray-300 text-2xl font-bold mb-4 leading-none"
                            aria-label="Close modal"
                        >
                            ×
                        </button>
                        
                        <h2 className="text-xl sm:text-2xl text-white font-bold mb-4 clear-both pr-8">
                            {slides[slideIndex].title}
                        </h2>
                        
                        <p className="mb-6 text-white leading-relaxed text-sm sm:text-base">
                            {slides[slideIndex].fullDescription}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {slides[slideIndex].tags &&
                                slides[slideIndex].tags.split(",").map((tag, index) => (
                                    <div
                                        key={index}
                                        className={`px-3 py-1.5 sm:px-4 sm:py-2 ${getTagColor(tag.trim())} ${getTextColor(tag.trim())}  border-2 ${getBorderColor(tag.trim())} font-medium rounded-full text-xs sm:text-sm`}
                                    >
                                        #{tag.trim()}
                                    </div>
                                ))}
                        </div>

                        <button
                            onClick={toggleModal}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded transition-colors duration-200"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SlideShow;
