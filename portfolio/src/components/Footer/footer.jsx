import { useState } from 'react';
import { motion } from 'framer-motion';
import { GrSelect } from "react-icons/gr";

const  footer = () =>{
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    return (
        <footer className="relative bg-gray-700 text-white overflow-hidden">

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-6 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl text-yellow-400 mt-10 font-sans font-semibold">
                        Contact Me
                    </h2>
                    
                </motion.div>

                <div  id="contact" className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Form - Left Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Form Container with Construction Theme */}
                        <div className="bg-gray-800 border-4 border-yellow-400 border-dashed p-8 rounded-lg relative">

                            <h3 className="text-2xl font-bold mb-6 text-center mt-4">
                                Drop Me a Line!
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-yellow-400">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                                        placeholder="Your awesome name..."
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-yellow-400">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                                        placeholder="your.email@example.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-yellow-400">
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows="5"
                                        className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors resize-none"
                                        placeholder="Tell me about your project ideas..."
                                        required
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full bg-yellow-400 text-black py-3 px-6 rounded-lg hover:bg-yellow-500 transition-colors relative overflow-hidden"
                                >
                                    <span className="relative z-10 font-mono text-xl">Send</span>
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Contact Info & Social - Right Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-8"
                    >
                        
                        {/* Contact Info */}
                        <div className="bg-gray-800 border-l-4 border-orange-400 p-6 rounded-lg">
                            <h3 className="text-xl font-bold mb-4 text-orange-400 flex items-center">
                                📞 Get In Touch
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">📧</span>
                                    <span>stefanos@example.com</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">📱</span>
                                    <span>+30 123 456 7890</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">📍</span>
                                    <span>Athens, Greece</span>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="bg-gray-800 border-l-4 border-blue-400 p-6 rounded-lg">
                            <h3 className="text-xl font-bold mb-4 text-blue-400 flex items-center">
                                🌐 Follow the Journey
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <SocialButton 
                                    icon="💼" 
                                    label="LinkedIn" 
                                    color="bg-blue-600 hover:bg-blue-700"
                                />
                                <SocialButton 
                                    icon="👨‍💻" 
                                    label="GitHub" 
                                    color="bg-gray-700 hover:bg-gray-600"
                                />
                                <SocialButton 
                                    icon="🐦" 
                                    label="Twitter" 
                                    color="bg-blue-500 hover:bg-blue-600"
                                />
                                <SocialButton 
                                    icon="📸" 
                                    label="Instagram" 
                                    color="bg-pink-600 hover:bg-pink-700"
                                />
                            </div>
                        </div>

                        {/* Fun Construction Note */}
                        <div className="bg-yellow-400 font-mono text-black p-4 rounded-lg ">
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl">📝</span>
                                <p className="flex text-sm sm:text-xl gap-4">
                                    To view my resume click here
                                    <a 
                                        href="/pdf/StefanosEnglezouCV.pdf"  
                                        target="_blank" 
                                        rel="noopener noreferrer"   
                                        className="text-white text-4xl"
                                    >
                                    <GrSelect className=''/>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-center mt-16 pt-8 border-t-2 border-gray-400 border-dashed"
                >
                    <p className="text-gray-400">
                        © 2025 Stefanos - Built with ⚡ and lots of ☕
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        🚧 This site is perpetually under construction (like all good portfolios should be) 🚧
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

// Social Button Component
const SocialButton = ({ icon, label, color }) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${color} text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2`}
    >
        <span className="text-lg">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
    </motion.button>
);

export default footer;