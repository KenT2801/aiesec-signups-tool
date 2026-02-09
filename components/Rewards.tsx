
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

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full mb-16">

                            {/* 1. Digital VIP Pass (Span 4) */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="md:col-span-4 bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col h-[580px] relative group"
                            >
                                <div className="bg-black text-white p-6 flex justify-between items-center">
                                    <span className="font-bold tracking-widest uppercase text-yellow-500 text-sm">Golden Ticket</span>
                                    <Star className="fill-yellow-500 text-yellow-500" />
                                </div>
                                <div className="p-8 flex flex-col items-center justify-center flex-grow text-center bg-gray-50 relative">
                                    {/* Pattern */}
                                    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                                    <h2 className="text-5xl font-black text-gray-900 mb-3 tracking-tighter">VIP ACCESS</h2>
                                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 mb-10">Reality Check Session</p>

                                    <div className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
                                        <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-3">
                                            <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Date</span>
                                            <span className="text-base font-bold text-gray-900">20 Feb 2026</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Location</span>
                                            <span className="text-base font-bold text-gray-900">UTS Building 2</span>
                                        </div>
                                    </div>

                                    <a
                                        href="https://www.instagram.com/studentleaders.uts?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative z-20 group/qr cursor-pointer flex flex-col items-center gap-3 active:scale-95 transition-all"
                                    >
                                        <div className="p-4 bg-white rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover/qr:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover/qr:translate-x-[2px] group-hover/qr:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all">
                                            <QrCode size={80} className="text-black" />
                                        </div>
                                        <span className="px-4 py-2 bg-gray-100 rounded-lg text-xs font-black uppercase tracking-widest text-gray-900 group-hover/qr:bg-black group-hover/qr:text-white transition-colors border border-black/5">
                                            Click to Follow
                                        </span>
                                    </a>
                                </div>
                                {/* Fixed Alignment here */}
                                <button className="w-full py-5 bg-yellow-400 text-black font-black uppercase tracking-widest hover:bg-yellow-300 transition-colors flex items-center justify-center gap-2 text-sm">
                                    Add to Wallet
                                </button>
                            </motion.div>

                            {/* 2. Personalized Card (Span 5) */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="md:col-span-5 bg-white rounded-3xl shadow-xl border-2 border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 h-[580px] flex flex-col relative"
                            >
                                {path === 'career' ? (
                                    <div className="h-full flex flex-col bg-white">
                                        {/* Banner - LinkedIn Style Professional Gradient - UPDATED */}
                                        <div className="h-36 relative overflow-hidden bg-gradient-to-r from-blue-700 to-indigo-800">
                                            {/* Abstract Geometric Overlay */}
                                            <div className="absolute inset-0 opacity-30" style={{
                                                backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)',
                                                backgroundSize: '20px 20px'
                                            }}></div>
                                            <div className="absolute right-6 top-6">
                                                <Linkedin className="text-white opacity-50" size={28} />
                                            </div>
                                        </div>

                                        <div className="px-8 flex-grow flex flex-col relative">
                                            {/* Avatar - Overlapping the banner */}
                                            <div className="-mt-16 mb-6 flex justify-between items-end">
                                                <div className="w-32 h-32 rounded-full border-[6px] border-white bg-slate-100 flex items-center justify-center text-5xl font-bold text-slate-400 shadow-md overflow-hidden relative">
                                                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                                </div>
                                            </div>

                                            <h2 className="text-3xl font-black text-gray-900 leading-tight mb-1">{user.name}</h2>
                                            <p className="text-gray-600 text-base mb-6 font-medium">{user.degree || 'University'} Student</p>

                                            <div className="border-t border-gray-100 pt-6 mt-2 flex-grow flex flex-col">
                                                <div className="flex gap-4 mb-6">
                                                    <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-200">
                                                        <Briefcase size={24} />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-lg text-gray-900">Experience Builder - Summer 2026</h3>
                                                        <p className="text-sm text-gray-500 mt-1 font-medium">Project Potential • AIESEC</p>
                                                    </div>
                                                </div>

                                                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 flex-grow">
                                                    {/* Updated Text */}
                                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Core Assets</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedItems.map((item) => (
                                                            <span key={item.id} className="bg-white text-gray-800 px-3 py-2 rounded-full text-xs font-bold shadow-sm border border-gray-200 flex items-center gap-1.5">
                                                                <Check size={14} className="text-blue-600" strokeWidth={4} /> {item.title}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col bg-gray-50 relative overflow-hidden">
                                        {/* Watermark */}
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none z-0">
                                            <Plane size={350} strokeWidth={0.5} />
                                        </div>

                                        {/* Boarding Pass Style */}
                                        <div className="bg-[#F85A40] p-8 text-white flex justify-between items-center relative overflow-hidden h-36 z-10">
                                            <div className="absolute inset-0 bg-black opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 11px)' }}></div>
                                            <div className="z-10 flex flex-col">
                                                <span className="font-lato font-black track-widest text-sm opacity-80 mb-1">FLIGHT NO.</span>
                                                <span className="font-black text-4xl tracking-widest">EXP-2026</span>
                                            </div>
                                            <Compass size={100} className="opacity-20 absolute -right-8 -bottom-8 animate-spin-slow" />
                                        </div>

                                        <div className="p-8 flex-grow flex flex-col relative z-10">
                                            <div className="flex justify-between mb-8 border-b-2 border-dashed border-gray-300 pb-6">
                                                <div>
                                                    <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-2">Passenger</p>
                                                    <p className="font-black text-2xl text-gray-800">{user.name}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-2">Dest.</p>
                                                    <p className="font-black text-2xl text-[#F85A40]">GLOBAL</p>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Mission Manifest</p>
                                                {selectedItems.map((item, idx) => (
                                                    <div key={idx} className="flex items-center gap-4 group">
                                                        <div className="w-10 h-10 rounded-full bg-white border-2 border-[#F85A40] text-[#F85A40] flex items-center justify-center font-black text-lg shadow-[2px_2px_0px_0px_#F85A40]">{idx + 1}</div>
                                                        <span className="font-bold text-gray-800 text-base">{item.title}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="absolute bottom-6 left-8 right-8 h-16 bg-gray-800 opacity-10 rounded-lg" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, #000 2px, #000 4px)' }}></div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>

                            {/* 3. Small Cards Column (Span 3) */}
                            <div className="md:col-span-3 flex flex-col gap-6">
                                {/* CV Template - UPDATED DESIGN */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-xl p-8 text-gray-800 flex flex-col justify-between flex-1 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 ring-1 ring-gray-100"
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
                                    <a
                                        href="https://docs.google.com/document/d/1l_p5YqYgkqLPo-trcStnj2Nl-sJBRm1abYrTCI6h6gI/edit?usp=sharing"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative z-10 mt-6 w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-200 uppercase tracking-wide"
                                    >
                                        Download Now <ExternalLink size={16} />
                                    </a>
                                </motion.div>

                                {/* Hidden Gem - Vibrant Gradient Design */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="relative rounded-3xl shadow-xl p-8 text-white flex flex-col justify-between flex-1 overflow-hidden group hover:-translate-y-1 transition-all duration-300"
                                >
                                    {/* Dynamic Background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 transition-transform duration-500 group-hover:scale-110"></div>
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                                    <div className="relative z-10">
                                        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-5 border border-white/30 group-hover:rotate-12 transition-transform">
                                            <Sparkles size={28} className="text-yellow-300" />
                                        </div>
                                        <h3 className="text-2xl font-black mb-3 uppercase tracking-wide">GV Booklet</h3>
                                        <p className="text-base text-white/90 leading-relaxed font-medium">
                                            Access the curated library of hidden local gems and student stories.
                                        </p>
                                    </div>
                                    <a
                                        href="https://www.canva.com/design/DAHAzXMe_qI/iVxk3TXtbWi-5bEjEoV8fQ/edit?utm_content=DAHAzXMe_qI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative z-10 mt-6 w-full py-4 bg-white/20 backdrop-blur-md text-white border border-white/40 rounded-xl font-bold text-sm hover:bg-white/30 transition-colors flex items-center justify-center gap-2 uppercase tracking-wide"
                                    >
                                        Unlock Library <ArrowRight size={16} />
                                    </a>
                                </motion.div>
                            </div>

                        </div>

                        <div className="text-center pb-12 pt-4 flex flex-col gap-6">
                            <a
                                href="https://aiesecaustralia.org/volunteer/#signup?&wpf777_381=UTS&utm_id=oweek26.1&utm_source=website"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`px-16 py-6 text-white text-xl font-black uppercase tracking-widest rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none transition-all flex items-center gap-4 mx-auto inline-flex`}
                                style={{ backgroundColor: primaryColor }}
                            >
                                Secure My Future: Express Interest <Award size={28} strokeWidth={3} />
                            </a>

                            <a
                                href="https://auth.aiesec.org/users/sign_in#login"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-12 py-5 text-black bg-white border-2 border-black text-sm font-black uppercase tracking-widest rounded-xl shadow-[4px_4px_0px_0px_#ccc] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#ccc] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center gap-3 mx-auto"
                            >
                                Want to browse promising projects? Launch EXPA <ExternalLink size={18} />
                            </a>

                            <p className="mt-4 text-gray-800 text-xs font-black tracking-[0.3em] uppercase opacity-60">Powered by AIESEC in Australia</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Rewards;
