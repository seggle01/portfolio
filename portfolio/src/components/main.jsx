// This is a Main Component of including everything else
import Nav from "./NavigationBar/nav"
import Hero from "./Hero/hero"

const  main = () =>{
    return (
        <>
            <div className="bg-slate-800">
                <Nav/>
            </div>
            <div className="bg-slate-500">
                <Hero/>
            </div>
        </>
    );
}
export default main