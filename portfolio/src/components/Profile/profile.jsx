// This is the Profile Component where information about the 
// person will be displayed and shown

const profile = () => {

    return (
        <>
            <section id="profile" className="flex flex-col lg:flex-row pt-10 pb-10 px-10 text-white">
                <div className="lg:mr-20 lg:w-2/3 lg:max-w-2/3">
                    <h1 className="text-4xl text-white font-sans font-semibold">Profile</h1>
                    <p className="text-xl text-slate-300 font-sans mt-5 text-justify">
                        I’m a dedicated third-year student at the department of Computer Science, University of Cyprus. I’m enthusiastic and
                        driven about my studies and I’m actively seeking opportunities to expand my knowledge to different branches within my
                        field. Excited to contribute my skills and learn from the dynamic and evolving landscape of Computer Science.
                    </p>
                    <p className="text-xl text-slate-300 font-sans mt-5 text-justify">
                        My studies included a wide range of courses: starting with object-oriented programming in Java,
                        followed by algorithm design and data structures, software engineering, and database development using SQL Server.
                        I further explored parallel programming in C and system security, ultimately applying my skills to advanced topics 
                        such as machine learning and computer vision by developing specialized algorithms in Python using libraries like NumPy and OpenCV.
                    </p>
                    <p className="text-xl text-slate-300 font-sans mt-5 text-justify">
                        Beyond the curriculum i wanted to expand my practical experience and so I built a background in full-stack web development and applications. 
                        I’ve gained hands-on experience in building databases, developing web applications using Django and Laravel
                        using popular JavaScript libraries like Leaflet and JQuery, and creating custom QGIS plugins using PyQt. 
                        These experiences have provided me with a strong skill set but also sparked my interest in adjacent fields, 
                        encouraging me to explore new areas where my skills can be applied.
                    </p>
                    <p className="text-xl text-slate-300 font-sans mt-5 text-justify">
                        Currently, I’m focusing in Machine Learning and Neural Networks to follow up in the future. 
                        So I’m eager to apply my development background to intelligent systems, while continuously 
                        learning through meaningful, hands-on projects and real-world challenges.
                    </p>
                </div>
                <div className="hidden lg:block lg: ml-10">
                </div>
            </section>
        </>
    );
}
export default profile