// This is a Main Component of including everything else
import Nav from "./NavigationBar/nav";
import Hero from "./Hero/hero";
import Profile from "./Profile/profile";
import Project from "./Project/project";
import Footer from "./Footer/footer";
import XP from "./Experience/xp";
import Resume from "./Resume/resume";
import Contact from "./Contact/contact";

const  main = () =>{
    return (
        <>
            <div className="bg-slate-800">
                <Nav/>
            </div>
            <div className="bg-slate-500">
                <Hero/>
            </div>
            <hr className="border-4 border-black" />
            <div className="bg-gray-800">
                <Profile/>
                <hr className="border-4 border-black" />
                <div className="flex flex-col lg:flex-row justify-between w-full">
                <XP/>
                </div>
                <Project/>
                <hr className="border-4 border-black" /> 
                <Footer/>
            </div>
            
        </>
    );
}
export default main