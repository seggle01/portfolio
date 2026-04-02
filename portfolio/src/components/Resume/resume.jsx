// This is the resume section which i just provide a link to the persons CV
import { PiReadCvLogoBold } from "react-icons/pi";
import { GrSelect } from "react-icons/gr";

const resume = () =>{
    return (
        <>
    <div className="flex flex-col pb-5 px-10 space-y-10 text-white items-center">
        {/* Title and Icon */}
        <div className="flex items-center space-x-3 justify-center">
            <h1 className="text-4xl text-white font-sans">Resume</h1>
            <PiReadCvLogoBold className="text-white text-4xl" />
        </div>
        
        {/* Description Text with Icon at the End */}
        <p className="text-2xl text-white font-sans mt-5 text-center lg:w-3/5 flex items-center justify-center space-x-3">
            Here you can view my resume.
            <a 
                href="/pdf/StefanosEnglezouCV.pdf"  
                target="_blank" 
                rel="noopener noreferrer"   
                className="text-white text-4xl"
            >
                <GrSelect />
            </a>
        </p>
    </div>
</>
    );
}

export default resume