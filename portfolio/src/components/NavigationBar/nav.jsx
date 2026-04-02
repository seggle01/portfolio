/**
 * Navigation Bar component for the portfolio website.
 * 
 * @fileoverview This file contains a responsive navigation component with 5 main sections:
 * 1. Profile - Personal introduction and overview
 * 2. Experience - Professional work history  
 * 3. Projects - Portfolio showcase
 * 4. Resume - Downloadable CV/resume
 * 5. Contact Me - Contact information and form
 * 
 * @requires react
 * @requires react-icons
 * @requires tailwindcss
 * @styling Tailwind CSS utility classes for responsive layout and design.
 * 
 * @see {@link https://react-icons.github.io/react-icons/}      React Icons documentation
 * @see {@link https://tailwindcss.com/docs/responsive-design}  Tailwind responsive design
 * 
 * @version 1.0.0
 * @since 2025-01-17
 * @author Stefanos Englezou <egglezoustefanos@gmail.com>
*/
import { VscAccount } from "react-icons/vsc";
import {AiOutlineClose} from "react-icons/ai";
import {HiMenuAlt1} from "react-icons/hi";
import {useState} from 'react'; // Create a state hook for the toggle of the menu
/** 
 * @component
 * The Navigation Bar Component
 * 
 * @description The component features a responsive design that displays a horizontal
 * navigation bar on desktop screens and transforms into a hamburger menu on mobile
 * devices. Uses smooth scrolling to navigate between page sections.
 * 
 * @returns {JSX.Element}
*/
const  Nav = () =>{

    /**
     * State variable to track the visibility of the navigation menu.
     * @type {boolean}
     * @default false
     */
    const [toggle,setToggle] = useState(false); 
    /**
     * @function openMenu
     * @description Opens the navigation menu by setting the toggle state to true.
     * @returns {void}
     */
    function openMenu(){
        setToggle(true);
    }
    /**
     * @function closeMenu
     * @description Closes the navigation menu by setting the toggle state to false.
     * @returns {void}
     */
    function closeMenu(){
        setToggle(false);
    }

    return (
        <>  
            {/* Main Navigation Bar */}
            <nav className="flex items-center justify-between p-10 lg:flex-row">
                 {/* Logo and Name */}
                <div>
                    <a className="font-mono text-3xl 
                    tracking-wider flex items-center text-white ">
                        <VscAccount className="mr-2"/> Stefanos Englezou
                    </a>
                </div>
                {/* Desktop Menu Links */}
                <div className='space-x-4'>
                    <div className='hidden ssm:hidden lg:block space-x-2'>
                        <a href="#profile" className="font-mono text-white hover:bg-slate-400 hover:underline
                        rounded-full px-5 py-2 text-xl">Profile</a>
                        <a href="#experience" className="font-mono text-white hover:bg-slate-400 hover:underline
                        rounded-full px-5 py-2 text-xl">Experience</a>
                        <a href="#projects" className="font-mono text-white hover:bg-slate-400 hover:underline
                        rounded-full px-5 py-2 text-xl">Projects</a>
                        <a href="#resume" className="font-mono text-white hover:bg-slate-400 hover:underline
                        rounded-full px-5 py-2 text-xl">Resume</a>
                        <a href="#contact" className="font-mono text-white hover:bg-slate-400 hover:underline
                        rounded-full px-5 py-2 text-xl whitespace-nowrap">Contact Me</a>
                    </div>
                    <div className='lg:hidden ssm:block'>
                        {/* If toggle show the closing icon else the hamburger menu icon. */}
                        {toggle ? 
                            (<AiOutlineClose onClick={closeMenu} size={30} className='text-white' />)
                            :(<HiMenuAlt1 onClick={openMenu} size={30} className='text-white' />)}
                    </div>
                </div>
            </nav>
            {/* Mobile Toggle Icon */}
            <div className="lg:hidden ssm:block">
                {/* If toggle is true show the list */}
                {toggle && 
                    (<div className='flex justify-between ml-10'>
                            <ul>
                                <li className='text-white text-xl mb-2 hover:underline'><a href="#profile">Profile</a></li>
                                <li className='text-white text-xl mb-2 hover:underline'><a href="#experience">Experience</a></li>
                                <li className='text-white text-xl mb-2 hover:underline'><a href="#projects">Projects</a></li>
                                <li className='text-white text-xl mb-2 hover:underline'><a href="#resume">Resume</a></li>
                                <li className='text-white text-xl mb-6 hover:underline'><a href="#contact">Contact Me</a></li>
                            </ul>
                        </div>)
                }
            </div>
        </>
    );
}
export default Nav;