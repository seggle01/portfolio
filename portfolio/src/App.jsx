// This is a Main Component of including everything else
import Nav from "./components/nav";
import Intro from "./components/intro";
import Profile from "./components/profile";
import Interests from "./components/interests";
import Projects from "./components/projects";
import Footer from "./components/links";

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