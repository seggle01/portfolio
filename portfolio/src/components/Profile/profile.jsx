// This is the Profile Component where information about the 
// person will be displayed and shown

const profile = () => {

    return (
        <>
            <section id="profile" className="flex flex-col lg:flex-row pt-10 pb-5 px-10 space-y-10 text-white">
                <div>
                    <h1 className="text-4xl text-white font-sans font-semibold">Profile</h1>
                    <p className="text-xl text-slate-300 font-sans mt-5 lg:w-3/5 text-justify">
                        I’m a dedicated third-year student at the department of Computer Science, 
                        University of Cyprus. I’m enthusiastic and driven about my studies and 
                        I’m actively seeking opportunities to expand my knowledge to different branches 
                        within my field. Excited to contribute my skills and learn from the dynamic and evolving 
                        landscape of Computer Science.
                    </p>
                    <p className="text-xl text-slate-300 font-sans mt-5 lg:w-3/5 text-justify">
                        At the moment, I am focused on the wide area of Artificial Intelligence, 
                        with a particular interest in Machine Learning and Neural Networks. 
                        I am keen to apply my skills to meaningful projects, while also practicing knowledge
                        from new experiences and challenges.
                    </p>
                </div>
            </section>
        </>
    );
}
export default profile