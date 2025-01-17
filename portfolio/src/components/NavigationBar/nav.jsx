// This is the Navigation Bar Component
import { VscAccount } from "react-icons/vsc";
import {AiOutlineClose} from "react-icons/ai";
import {HiMenuAlt1} from "react-icons/hi";
import {useState} from 'react';

const  nav = () =>{

    const [toggle,setToggle] = useState(false);

    function openMenu(){
        setToggle(true);
    }

    function closeMenu(){
        setToggle(false);
    }

    return (
    <>
        <nav className="flex items-center justify-between p-10 lg:flex-row">
            <div>
                <a href="#" className="font-mono text-3xl 
                tracking-wider flex items-center text-white ">
                    <VscAccount className="mr-2"/> Stefanos Englezou
                </a>
            </div>

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
                    {toggle ? (
                        <AiOutlineClose onClick={closeMenu} size={30} className='text-white' />
                    ):(<HiMenuAlt1 onClick={openMenu} size={30} className='text-white' />)}
                </div>
            </div>
        </nav>

        <div className="lg:hidden ssm:block">
            {toggle ? (
                <div className='flex justify-between ml-10'>
                    <ul>
                        <li className='text-white text-xl mb-2 hover:underline' >Profile</li>
                        <li className='text-white text-xl mb-2 hover:underline'>Experience</li>
                        <li className='text-white text-xl mb-2 hover:underline'>Projects</li>
                        <li className='text-white text-xl mb-2 hover:underline'>Resume</li>
                        <li className='text-white text-xl mb-6 hover:underline'>Contact Me</li>
                    </ul>
                </div>

            ):(
                <div></div>
            )}
        </div>
    </>
    );
}
export default nav