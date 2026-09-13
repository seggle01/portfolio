// This is a Main Component of including everything else
import Nav from "./new_components/nav";
import Intro from "./new_components/intro";
import Profile from "./new_components/profile";
import Interests from "./new_components/interests";
import Projects from "./new_components/projects";
import Footer from "./new_components/links";

const  main = () =>{
    return (
        <>
            <div className="bg-slate-800">
                <Nav/>
            </div>

            <div className="bg-slate-500">
                <Intro/>
            </div>
            
            <div className="bg-gray-800">
                <Profile/>
                <Interests/>
                <Projects/>
                <Footer/>
            </div>
        </>
    );
}
export default main