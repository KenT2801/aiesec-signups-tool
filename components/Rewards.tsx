
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfile, CardItem, PathType } from '../types';
import { Award, QrCode, Star, Briefcase, Compass, ExternalLink, Check, Plane, Linkedin, ArrowRight, Sparkles, FileText, Stamp } from 'lucide-react';

interface RewardsProps {
    user: UserProfile;
    selectedItems: CardItem[];
    path: PathType;
}

const Rewards: React.FC<RewardsProps> = ({ user, selectedItems, path }) => {
    const [stage, setStage] = useState<'closed' | 'opening' | 'revealed'>('closed');

    const primaryColor = path === 'career' ? '#037EF3' : '#F85A40';

    // Background gradients
    const bgGradient = path === 'career'
        ? 'bg-gradient-to-br from-blue-50 via-white to-blue-100'
        : 'bg-gradient-to-br from-orange-50 via-white to-red-100';

    useEffect(() => {
        // Automated Sequence
        const openTimer = setTimeout(() => {
            setStage('opening');
        }, 1000); // Wait 1s before opening

        const revealTimer = setTimeout(() => {
            setStage('revealed');
        }, 3800); // 1s wait + 2.8s animation/read time

        return () => {
            clearTimeout(openTimer);
            clearTimeout(revealTimer);
        };
    }, []);


    return (
        <div className={`min-h-screen w-full flex flex-col items-center justify-center relative font-lato overflow-x-hidden ${bgGradient}`}>

            {/* Engaging Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ backgroundColor: primaryColor }}></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" style={{ backgroundColor: path === 'career' ? '#4F46E5' : '#FBBF24' }}></div>
            </div>

            <AnimatePresence mode="wait">
                {(stage === 'closed' || stage === 'opening') && (
                    <motion.div
                        className="flex items-center justify-center z-50 perspective-1000 w-full h-screen fixed inset-0 bg-white/95 backdrop-blur-sm"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative">

                            {/* Envelope Container */}
                            <motion.div
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 200, opacity: 0, transition: { duration: 0.5 } }}
                                className="relative w-[320px] md:w-[500px] h-[220px] md:h-[340px]"
                            >
                                {/* Back of Envelope */}
                                <div className="absolute inset-0 bg-[#f0f0f0] rounded-lg shadow-2xl border border-gray-200"></div>

                                {/* Ticket / Letter (Inside) */}
                                <motion.div
                                    className="absolute left-4 right-4 bg-white h-[95%] rounded-lg shadow-sm border border-gray-100 flex flex-col items-center justify-start pt-8 z-10"
                                    initial={{ y: 0 }}
                                    animate={{
                                        y: stage === 'opening' ? -150 : 0,
                                        scale: stage === 'opening' ? 1.05 : 1
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 40, // Softer spring
                                        damping: 20,   // More drag for smoothness
                                        delay: 0.2
                                    }}
                                >
                                    {/* Ticket Content */}
                                    <div className="w-full flex flex-col items-center p-4">
                                        <div className="w-full border-b-2 border-dashed border-gray-200 pb-4 mb-4 flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-black" style={{ backgroundColor: primaryColor }}>A</div>
                                                <span className="font-bold text-gray-400 text-xs tracking-widest uppercase">Official ROI</span>
                                            </div>
                                            <span className="font-lato font-bold text-xs text-gray-300 tracking-widest">NO. 2026-001</span>
                                        </div>
                                        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight text-center mb-2">Priority Access</h2>
                                        <p className="text-sm font-bold text-gray-500 text-center">Issued to {user.name}</p>
                                    </div>
                                </motion.div>

                                {/* Front Pockets (Using Clip Path for clean geometry) */}
                                <div className="absolute inset-0 z-20 pointer-events-none drop-shadow-xl">
                                    {/* Left Flap */}
                                    <div
                                        className="absolute bottom-0 left-0 w-full h-full bg-[#e6e6e6]"
                                        style={{ clipPath: 'polygon(0 0, 50% 50%, 0 100%)' }}
                                    ></div>
                                    {/* Right Flap */}
                                    <div
                                        className="absolute bottom-0 right-0 w-full h-full bg-[#e0e0e0]"
                                        style={{ clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)' }}
                                    ></div>
                                    {/* Bottom Flap */}
                                    <div
                                        className="absolute bottom-0 left-0 w-full h-full bg-[#f5f5f5]"
                                        style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)' }}
                                    ></div>
                                </div>

                                {/* Top Flap (The Opener) */}
                                <motion.div
                                    className="absolute top-0 left-0 w-full h-full z-30 origin-top"
                                    initial={{ rotateX: 0 }}
                                    animate={{ rotateX: stage === 'opening' ? 180 : 0 }}
                                    transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    {/* Front Face of Flap */}
                                    <div
                                        className="absolute inset-0 backface-hidden bg-[#fafafa] drop-shadow-md"
                                        style={{ clipPath: 'polygon(0 0, 50% 50%, 100% 0)' }}
                                    >
                                        {/* Wax Seal */}
                                        <motion.div
                                            className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full shadow-lg flex items-center justify-center border-4 border-[#C8102E]/20 z-50"
                                            style={{ backgroundColor: '#C8102E' }}
                                        >
                                            <div className="absolute inset-0 rounded-full border border-white/20 opacity-50"></div>
                                            <span className="text-white font-lato font-black text-xl italic opacity-90">A</span>
                                        </motion.div>
                                    </div>

                                    {/* Back Face of Flap (Visible when open) */}
                                    <div
                                        className="absolute inset-0 backface-hidden rotate-y-180 bg-[#f0f0f0]"
                                        style={{ clipPath: 'polygon(0 0, 50% 50%, 100% 0)' }}
                                    ></div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                {stage === 'revealed' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        className="w-full max-w-[1600px] px-6 md:px-12 py-10 flex flex-col min-h-screen justify-center z-10"
                    >
                        <div className="text-center mb-16">
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="inline-block px-5 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
                                    Asset Collection Generated
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight drop-shadow-sm">
                                    You're Ready, <span style={{ color: primaryColor }} className="underline decoration-4 underline-offset-4">{user.name}</span>.
                                </h1>
                                <p className="text-xl md:text-2xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
                                    We've packed your digital bag. Here are 4 tools to launch your future.
                                </p>
                            </motion.div>
                        </div>

                        <div className="max-w-5xl mx-auto w-full mb-16">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-16">
                                {/* CV Template - UPDATED DESIGN */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-xl p-8 text-gray-800 flex flex-col justify-between h-full min-h-[320px] relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 ring-1 ring-gray-100"
                                >
                                    {/* Subtle blue gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50 z-0"></div>

                                    <div className="relative z-10">
                                        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-5 border border-blue-100 shadow-sm group-hover:scale-110 transition-transform">
                                            <FileText size={28} className="text-blue-600" />
                                        </div>
                                        <h3 className="text-2xl font-black mb-3 uppercase tracking-wide text-gray-900">CV Upgrade</h3>
                                        <p className="text-base text-gray-600 leading-relaxed font-medium">
                                            Transform your list of skills into impact statements. Use our premium Canva template.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => window.open('https://docs.google.com/document/d/1l_p5YqYgkqLPo-trcStnj2Nl-sJBRm1abYrTCI6h6gI/edit?usp=sharing', '_blank', 'noopener,noreferrer')}
                                        className="relative z-50 mt-6 w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-200 uppercase tracking-wide cursor-pointer"
                                    >
                                        Download Now <ExternalLink size={16} />
                                    </button>
                                </motion.div>

                                {/* Hidden Gem - Vibrant Gradient Design */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="relative rounded-3xl shadow-xl p-8 text-white flex flex-col justify-between h-full min-h-[320px] overflow-hidden group hover:-translate-y-1 transition-all duration-300"
                                >
                                    {/* Dynamic Background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 transition-transform duration-500 group-hover:scale-110"></div>
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                                    <div className="relative z-10 flex-grow">
                                        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-5 border border-white/30 group-hover:rotate-12 transition-transform">
                                            <Sparkles size={28} className="text-yellow-300" />
                                        </div>
                                        <h3 className="text-2xl font-black mb-3 uppercase tracking-wide">GV Booklet</h3>
                                        <p className="text-base text-white/90 leading-relaxed font-medium mb-4">
                                            Access the curated library of hidden local gems and student stories.
                                        </p>
                                        <div className="mt-4 p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
                                            <p className="text-xs font-bold uppercase tracking-wider text-yellow-300 mb-1">Need answers quickly?</p>
                                            <p className="text-sm font-medium text-white/90">
                                                Use our AI NotebookLLM to instantly answer any questions about the booklet content!
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="relative z-50 mt-6 space-y-3">
                                        <button
                                            onClick={() => window.open('https://docs.google.com/presentation/d/1j39sAlEdjlinoVE4hpsmyHdAxOHX9fcG/edit?slide=id.g36c791e321c_3_9#slide=id.g36c791e321c_3_9', '_blank', 'noopener,noreferrer')}
                                            className="w-full py-4 bg-white/20 backdrop-blur-md text-white border border-white/40 rounded-xl font-bold text-sm hover:bg-white/30 transition-colors flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer shadow-lg shadow-black/10"
                                        >
                                            Read Booklet <ArrowRight size={16} />
                                        </button>
                                        <button
                                            onClick={() => window.open('https://notebooklm.google.com/notebook/7fdc6f45-36cf-43a1-98a2-0041526cfd06', '_blank', 'noopener,noreferrer')}
                                            className="w-full py-3 bg-white text-indigo-700 rounded-xl font-black text-sm hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer shadow-xl shadow-white/20"
                                        >
                                            Ask AI Assistant <Sparkles size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            </div>

                            {/* QR Code Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-col items-center justify-center mb-16"
                            >
                                <a
                                    href="https://www.instagram.com/studentleaders.uts?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col items-center gap-4 cursor-pointer"
                                >
                                    <div className="p-4 bg-white rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] active:scale-95 transition-all">
                                        <QrCode size={120} className="text-black" />
                                    </div>
                                    <span className="font-black text-xl text-gray-900 tracking-wide uppercase group-hover:text-blue-600 transition-colors">
                                        Follow for more
                                    </span>
                                </a>
                            </motion.div>

                            <div className="text-center pb-12 pt-4 flex flex-col gap-6">
                                <a
                                    href="https://auth.aiesec.org/users/sign_in#login"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`px-16 py-6 text-white text-xl font-black uppercase tracking-widest rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all flex items-center justify-center gap-4 mx-auto inline-flex`}
                                    style={{ backgroundColor: primaryColor }}
                                >
                                    Launch EXPA <Award size={28} strokeWidth={3} />
                                </a>

                                <p className="mt-4 text-gray-800 text-xs font-black tracking-[0.3em] uppercase opacity-60">Powered by AIESEC in Australia</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Rewards;
