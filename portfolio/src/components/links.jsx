import { motion } from 'framer-motion';
import { FiDownload, FiMail, FiMapPin } from "react-icons/fi";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer id="contact" className="relative bg-gray-700 text-white overflow-hidden">
            <div className="relative z-10 container mx-auto px-6 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-4"
                >
                    <h2 id="links" className="font-mono text-3xl text-white font-semibold mb-10">Links</h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex items-center justify-center gap-2 text-gray-300 text-sm mb-10"
                >
                    <FiMapPin className="text-white"/>
                    <span className = "text-white">
                        Based in Nicosia, Cyprus
                        & Zurich, Switzerland
                    </span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4"
                >
                    <LinkButton
                        href="./pdf/Stefanos_Englezou_CV.pdf"
                        icon={<FiDownload />}
                        label="Download CV"
                        external
                    />
                    <LinkButton
                        href="https://www.linkedin.com/in/stefanos-englezou-a47a24225"
                        icon={<FaLinkedin />}
                        label="LinkedIn"
                        external
                    />
                    <LinkButton
                        href="https://github.com/seggle01"
                        icon={<FaGithub />}
                        label="GitHub"
                        external
                    />
                    <LinkButton
                        href="mailto:egglezoustefanos@gmail.com"
                        icon={<FiMail />}
                        label="egglezoustefanos@gmail.com"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mt-10 p-5 border-t border-gray-600"
                >
                    <p className="text-gray-400 text-sm">
                        © 2026 Stefanos Englezou - Built with love and coffee...
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

const LinkButton = ({ href, icon, label, external }) => (
    <motion.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2 bg-gray-800/60 border border-gray-600 hover:border-gray-300 hover:bg-gray-800 text-gray-100 py-2.5 px-5 rounded-md text-sm font-medium transition-colors"
    >
        <span className="text-base">{icon}</span>
        <span>{label}</span>
    </motion.a>
);

export default Footer;
