//This is the SlideShow component for the projects
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import { useEffect, useState } from "react";

function SlideShow({ slides }) {
    const [slideIndex, setSlideIndex] = useState(0);
    const [isModalOpen, setModalOpen] = useState(false);

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
        LibGDX : "bg-red-700",
        Javascript : "bg-yellow-500",
        Django: "bg-green-800",
        Python: "bg-blue-600",
        "Html/Css": "bg-orange-500",
        JQuery: "bg-red-700",
        PostgresSQL: "",
        Docker: "bg-cyan-500",
        SQL: "bg-blue-500",
        QGIS : "bg-lime-900",
        UI : "bg-teal-100",
        Laravel : "bg-purple-900",
        PHP : "bg-purple-300",
    };

    const textColors = {
        Java: 'text-yellow-300',
        "Html/Css": "text-gray-600",
        Javascript: "text-black",
        UI : "text-black",
        Docker : "text-blue-700",
        PHP : "text-stone-500",
    };

    function getTagColor(tag) {
        return tagColors[tag] || "bg-gray-500";
    }

    function getTextColor(tag) {
        return textColors[tag] || "text-white";
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

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-8 max-w-lg w-full">
                        <h2 className="text-2xl font-bold mb-4">{slides[slideIndex].title}</h2>
                        <p className="mb-6">{slides[slideIndex].fullDescription}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {slides[slideIndex].tags &&
                                slides[slideIndex].tags.split(",").map((tag, index) => (
                                    <div
                                        key={index}
                                        className={`px-4 py-2 ${getTagColor(tag.trim())} ${getTextColor(tag.trim())} font-medium rounded-full`}
                                    >
                                        #{tag.trim()}
                                    </div>
                                ))}
                        </div>

                        <button
                            onClick={toggleModal}
                            className="bg-blue-500 text-white font-medium py-2 px-4 rounded"
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