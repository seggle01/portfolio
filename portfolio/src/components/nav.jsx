import {VscAccount} from "react-icons/vsc";
import {AiOutlineClose} from "react-icons/ai";
import {HiMenuAlt1} from "react-icons/hi";
import {useState} from 'react'; // Create a state hook for the toggle of the menu

const  Nav = () =>{

    const [toggle,setToggle] = useState(false); 
    
    function openMenu(){
        setToggle(true);
    }
   
    function closeMenu(){
        setToggle(false);
    }

    return (
        <>  
            {/* Main Navigation Bar */}
            <nav className="text-white font-mono flex items-center justify-between p-5 md:p-10 lg:flex-row">
                 {/* Logo and Name */}
                <div>
                    <a className="text-2xl md:text-3xl lg:text-4xl tracking-wider flex items-center px-5 py-2">
                        <VscAccount  size={40} className="mr-5"/> 
                        Stefanos Englezou 
                    </a>
                </div>
                {/* Desktop Menu Links */}
                <div className='space-x-4'>
                    <div className='hidden lg:block space-x-2 text-2xl tracking-wider '>
                        <a href="#profile" className="hover:bg-slate-400 hover:underline
                        rounded-full px-5 py-2">Profile</a>
                        <a href="#interests" className="hover:bg-slate-400 hover:underline
                        rounded-full px-5 py-2">Interests</a>
                        <a href="#projects" className="hover:bg-slate-400 hover:underline
                        rounded-full px-5 py-2">Projects</a>
                        <a href="#links" className="hover:bg-slate-400 hover:underline
                        rounded-full px-5 py-2">Links</a>
                    </div>
                    <div className='lg:hidden block'>
                        {/* If toggle show the closing icon else the hamburger menu icon. */}
                        {toggle ? 
                            (<AiOutlineClose onClick={closeMenu} size={30} className='text-white' />)
                            :(<HiMenuAlt1 onClick={openMenu} size={30} className='text-white' />)}
                    </div>
                </div>
            </nav>



            {/* Mobile Toggle Icon */}
            <div className="font-mono lg:hidden block">
                {/* If toggle is true show the list */}
                {toggle && 
                    (<div className='flex justify-between ml-10'>
                            <ul className='text-white text-xl'>
                                <li className='mb-2 hover:underline'><a href="#profile">Profile</a></li>
                                <li className='mb-2 hover:underline'><a href="#interests">Interests</a></li>
                                <li className='mb-2 hover:underline'><a href="#projects">Projects</a></li>
                                <li className='mb-5 hover:underline'><a href="#links">Links</a></li>
                            </ul>
                        </div>)
                }
            </div>
        </>
    );
}
export default Nav;