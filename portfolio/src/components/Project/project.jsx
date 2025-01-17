//This is the Projects Section
import { CiCircleCheck } from "react-icons/ci";
import SlideShow from "../SlideShow/slideshow";
import Project1 from "../../assets/project1.jpg"; 
import Project2 from "../../assets/project2.jpg"; 
import Project3 from "../../assets/project3.png"; 
import Project4 from "../../assets/project4.png"; 
import Project5 from "../../assets/project5.png"; 

const images = [Project1, Project2, Project3];

const slides = [
    {
        image: Project1,
        title: 'WBL Sampling',
        description: 'A Django Web Application for the Water Board of Limassol.',
        fullDescription: 'Lead contributor at WBLSampling web app during internship at KIOS Centre of Excellence, which was constructed using the Django Python framework. A project specialized in monitoring, adding and editing chlorine and other substance measurements for the Water Board of Limassol (WBL). I utilized various technologies, including jQuery for organizing data retrieved from database queries, and Leaflet JavaScript library for developing interactive maps to manage geospatial data stored in a Postgres database.',
        tags: 'Python,Html/Css,Django,Javascript,JQuery,PostgresSQL,Docker'
    },
    {
        image: Project2,
        title: 'Oceanos Digital Twin',
        description: 'Integrated Water Management System.',
        fullDescription: 'Contributor at Oceanos Digital Twin (OceanosDT) Water Management System during internship at KIOS Centre of Excellence. An evolutionary project for monitoring, calibrating  water models of the Water Board of Limassol and Larnaca (WBL - LWB) , as well as running specialized genetic algorithms and simulations for their needs.',
        tags: 'Python,QGIS,UI'
    },
    {
        image: Project3,
        title: 'Battleships Game',
        description: 'A libGDX game for the classic game of Battleships.',
        fullDescription: 'A personal project currently in progress, that uses the popular Java game development framework libGDX. Assets were created by myself using programs like Asesprite and Piskel.',
        tags: 'LibGDX,Java,UI'
    },
    {
        image: Project4,
        title: 'Theogetricltd Team Project',
        description: 'A Django Web Application for Software Engineering course.',
        fullDescription: "As part of a team project for the Software Engineering course during my Bachelor's degree, we developed a Django web application for Theogetricltd, a solar installation company. The application features a management system that enables the company to keep in touch with customers by publishing offers, scheduling events through s calendar, and managing job assignments.",
        tags:'Python,Django,UI,Javascript,MySQL'
    },
    {
        image: Project5,
        title: 'EVManager Team Project',
        description: 'A Laravel Web Portal for Databases course.',
        fullDescription: "As part of a team project for the Databases course during my Bachelor's degree, we developed a Laravel web application which featured a web portal for the Department of Road Transport (TOM) to put in action the Recovery and Resilence Plan:for the Promotion of Electromobility in Cyprus, where users could apply for sponsorships.The whole system covers every end user view (employee, natural and physical users, car dealers, administrators etc.).The project took 1st place in the the course.",
        tags:'PHP,Laravel,UI,SQLServer'
    }
];

const  project = () =>{
    return (
        <>
        <div id="projects" className="bg-slate-500 m-10 rounded-xl">
                <div className="grid justify-items-center m-10">
                    <h1 className="text-4xl text-white mt-10 font-sans font-semibold">Projects</h1>
                </div>
                <div className="flex items-center justify-center">
                    <p className="text-xl text-white ml-2">
                        Here are some projects that provide a glimpse of my work, knowledge and dedication.
                    </p>
                </div>
                <hr className="text-xl"/>
                <SlideShow slides={slides} />
        </div>
        </>
    );
}
export default project