// This is the Hero Component where our figure will be shown
// and start a brief introduction
import React from 'react';
import HeroPic from "../../assets/icon.jpg";

const hero = () => {
    return (
        <>
            <section className="relative flex flex-col lg:flex-row justify-around items-center p-10 space-y-10 text-white">

                <div className="lg:w-1/3 w-full text-center lg:text-left">
                    <p className="text-4xl mb-5 text-slate-300">
                        Hi! I'm
                    </p>
                    <h1 className="text-6xl">Stefanos</h1>
                    <hr />
                    <p className="mt-10 text-xl text-slate-300 font-sans">
                        A 3rd year student, passionate for his studies. Likes to use
                    </p>
                </div>
        
                <div className="flex justify-center">
                    <img src={HeroPic} alt="Hero" width={250} height={250} className="rounded-full w-full border-8 border-black" />
                </div>
                
            </section>
        </>
    );
}
export default hero
