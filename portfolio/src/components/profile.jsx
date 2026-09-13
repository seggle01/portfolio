// This is the Profile Component where information about the 
// person will be displayed and shown
import HeroPic from "../assets/hero.jpg";

const profile = () => {

    return (
        <>
            <section id="profile" className="flex flex-col lg:flex-row md:items-center p-5 md:p-10">

                <div className="font-serif w-full lg:w-3/4 lg:mr-10 text-lg md:text-xl text-slate-300">

                    <h2 className="font-mono text-3xl text-white font-semibold">Profile</h2>

                    <p className="mt-5 text-justify">
                        I am a Computer Science graduate from the University of Cyprus, currently pursuing an MSc in Informatics at the 
                        University of Zurich. My research interests lie at the intersection of deep learning, bioinformatics and 
                        computational neuroscience, with a particular focus on applying neural network architectures to problems in these 
                        fields, such as protein structure prediction and self-control modelling. I am also exploring the applications of 
                        spiking neural networks and neuromorphic computing as biologically plausible alternatives to conventional artificial 
                        neural networks.
                    </p>
                    <p className="mt-5 text-justify">
                       Alongside my research, I've built a strong foundation in software engineering through both industry 
                       and applied research roles. As a Software Developer Intern at Grant Thornton Cyprus, I built an internal 
                       CV-Proposal System on the Microsoft Power Platform, implementing a hybrid matching engine that combined 
                       semantic search with LLM integration. As a Research Engineer at the KIOS Center of Excellence, 
                       I developed QGIS plugins in Python, contributed to the Oceanos Digital Twin water-network simulation platform, 
                       and led development of a Django-based geospatial web application with a PostgreSQL backend.
                    </p>
                    <p className="mt-5 text-justify">
                        This mix of research depth and engineering practice lets me move fluidly between designing neural architectures 
                        for scientific problems and shipping robust, production-grade software. I'm always looking for meaningful projects, 
                        personal or collaborative, that let me keep doing both.
                    </p>

                </div>
               
                <div className="py-5 justify-center flex">
                    <img src={HeroPic} alt="Hero" 
                        className="aspect-square max-w-xs sm:max-w-sm md:max-w-md 
                        rounded-full border-2 border-slate-900 object-cover"/>
                </div>
            </section>
        </>
    );
}
export default profile