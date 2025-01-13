// // This is the Hero Component where our figure will be shown
// // and start a brief introduction
import { motion } from "framer-motion"; 
import HeroPic from "../../assets/icon.jpg";

const hero = () => {
    return (
        <>  
            <section className="flex flex-col lg:flex-row justify-around items-center p-10 space-y-10 text-white">
                <div className="lg:w-1/3 w-full text-center lg:text-left">
                    <motion.p
                        className="text-4xl mb-5 text-slate-300"
                        initial={{ opacity: 0, x: -100 }}  
                        animate={{ opacity: 1, x: 0 }}     
                        transition={{ duration: 1 }}>
                        Hi! I'm
                    </motion.p>
                    <motion.h1
                        className="text-6xl"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2 }}>
                        Stefanos
                    </motion.h1>
                    <hr />
                    <motion.p
                        className="mt-10 text-xl text-slate-300 font-sans"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.4 }}>
                        A 3rd year student, passionate for his studies. Likes to use
                    </motion.p>
                </div>
                <div className="flex justify-center bg-slate-500">
                     <img src={HeroPic} alt="Hero" width={250} height={250} 
                     className="rounded-full w-full border-8 border-black" />
                </div>
            </section>
        </>
    );
}

export default hero;