
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import FlipCard from './components/FlipCard';
import Rewards from './components/Rewards';
import { CAREER_SKILLS, ADVENTURE_MISSIONS } from './constants';
import { PathType, CardItem, UserProfile, CONCERNS_LIST, PASSIONS_LIST, DESTINATION_REGIONS, AVAILABILITY_OPTIONS } from './types';
import { DataSubmissionService } from './services/DataSubmissionService';

function App() {
    const [phase, setPhase] = useState<'landing' | 'builder' | 'rewards'>('landing');
    const [path, setPath] = useState<PathType>(null);
    const [selectedItems, setSelectedItems] = useState<CardItem[]>([]);
    const [showDrawer, setShowDrawer] = useState(false);

    // Form State
    const [userProfile, setUserProfile] = useState<UserProfile>({
        name: '',
        age: '',
        phone: '',
        email: '',
        degree: '',
        year: '',
        university: 'UTS', // Auto-set
        passion: '',
        destination: '',
        availability: '',
        contactConsent: false,
        feeAcknowledgment: false,
        concerns: []
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const cards = path === 'career' ? CAREER_SKILLS : ADVENTURE_MISSIONS;
    const primaryColor = path === 'career' ? '#037EF3' : '#F85A40';

    const handleSelect = (id: string) => {
        const item = cards.find(c => c.id === id);
        if (!item) return;

        if (selectedItems.find(i => i.id === id)) {
            setSelectedItems(prev => prev.filter(i => i.id !== id));
        } else {
            if (selectedItems.length < 3) {
                setSelectedItems(prev => [...prev, item]);
                if (selectedItems.length + 1 === 3) {
                    setTimeout(() => setShowDrawer(true), 500);
                }
            }
        }
    };

    const toggleConcern = (concern: string) => {
        setUserProfile(prev => ({
            ...prev,
            concerns: prev.concerns.includes(concern)
                ? prev.concerns.filter(c => c !== concern)
                : [...prev.concerns, concern]
        }));
    };

    // Validation Logic
    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // Name
        if (!userProfile.name.trim()) newErrors.name = 'Full name is required';

        // Age: Number between 16 and 35
        const ageNum = parseInt(userProfile.age);
        if (!userProfile.age) {
            newErrors.age = 'Required';
        } else if (isNaN(ageNum) || ageNum < 16 || ageNum > 35) {
            newErrors.age = '16-35 only';
        }

        // Email Regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!userProfile.email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(userProfile.email)) {
            newErrors.email = 'Invalid email format';
        }

        // Australian Phone Regex: 04XXXXXXXX or +614XXXXXXXX
        const cleanPhone = userProfile.phone.replace(/\s+/g, '');
        const phoneRegex = /^(\+61|0)4\d{8}$/;
        if (!userProfile.phone) {
            newErrors.phone = 'Phone is required';
        } else if (!phoneRegex.test(cleanPhone)) {
            newErrors.phone = 'Invalid AU number (e.g. 04...)';
        }

        // Degree & Year
        if (!userProfile.degree.trim()) newErrors.degree = 'Degree is required';
        if (!userProfile.year) newErrors.year = 'Required';

        // New Fields
        if (!userProfile.passion) newErrors.passion = 'Required';
        if (!userProfile.destination) newErrors.destination = 'Required';
        if (!userProfile.availability) newErrors.availability = 'Required';

        // Checkboxes - Optional now
        // if (!userProfile.contactConsent) newErrors.contactConsent = 'Required';
        // if (!userProfile.feeAcknowledgment) newErrors.feeAcknowledgment = 'Required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLaunch = () => {
        if (validateForm()) {
            // Trigger background submission
            DataSubmissionService.submitData(userProfile, selectedItems, path);

            setPhase('rewards');
            setShowDrawer(false);
        }
    };

    // ---------------- LANDING PHASE ----------------
    if (phase === 'landing') {
        return (
            <div className="relative w-full h-screen overflow-hidden flex flex-col md:flex-row font-lato bg-gray-900">
                {/* Navigation / Brand Header */}
                <nav className="absolute top-0 left-0 w-full z-40 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center pointer-events-none text-white mix-blend-overlay">
                    <div className="flex flex-col">
                        <span className="text-2xl md:text-3xl font-black tracking-widest uppercase leading-none">AIESEC</span>
                        <span className="text-xs font-bold tracking-[0.6em] opacity-80 pl-1 mt-1">EST. 1948</span>
                    </div>
                    <div className="hidden md:block">
                        <span className="text-xs font-bold tracking-widest border border-white/30 px-6 py-2 rounded-full backdrop-blur-sm uppercase">
                            ROI Visualizer v2.0
                        </span>
                    </div>
                </nav>

                {/* Blue Side - Career */}
                <div
                    className="relative flex-1 w-full md:h-full cursor-pointer group transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:flex-[1.4] z-10 border-b md:border-b-0 md:border-r border-white/5"
                    onMouseEnter={() => setPath('career')}
                    onClick={() => setPhase('builder')}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 bg-black">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-60 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-40" />
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-aiesec-blue/90 via-blue-900/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 p-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="overflow-hidden mb-6"
                        >
                            <span className="inline-block px-5 py-2 border border-white/20 rounded-full text-xs font-bold tracking-[0.3em] uppercase bg-black/20 backdrop-blur-md group-hover:bg-white group-hover:text-aiesec-blue transition-colors duration-300">
                                Global Talent
                            </span>
                        </motion.div>

                        {/* Resized Font */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tighter drop-shadow-2xl transition-transform duration-700 group-hover:-translate-y-2">
                            CAREER
                        </h1>

                        <div className="h-px w-0 bg-white group-hover:w-32 transition-all duration-500 mb-6 opacity-50"></div>

                        <p className="max-w-xs md:max-w-md text-sm md:text-lg font-medium opacity-60 leading-relaxed group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                            Accelerate your professional journey in a global environment.
                        </p>

                        <div className="mt-8 md:mt-12 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-8 group-hover:translate-y-0">
                            <button className="px-8 py-3 md:px-10 md:py-4 bg-white text-aiesec-blue font-black text-xs md:text-sm uppercase tracking-widest hover:bg-blue-50 transition-colors shadow-lg rounded-sm">
                                Build Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* Orange Side - Adventure */}
                <div
                    className="relative flex-1 w-full md:h-full cursor-pointer group transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:flex-[1.4] z-10 md:border-l border-white/5"
                    onMouseEnter={() => setPath('adventure')}
                    onClick={() => {
                        setPath('adventure');
                        setPhase('builder');
                    }}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 bg-black">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-60 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-40" />
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-aiesec-orange/90 via-red-900/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 p-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="overflow-hidden mb-6"
                        >
                            <span className="inline-block px-5 py-2 border border-white/20 rounded-full text-xs font-bold tracking-[0.3em] uppercase bg-black/20 backdrop-blur-md group-hover:bg-white group-hover:text-aiesec-orange transition-colors duration-300">
                                Global Volunteer
                            </span>
                        </motion.div>

                        {/* Resized Font */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tighter drop-shadow-2xl transition-transform duration-700 group-hover:-translate-y-2">
                            ADVENTURE
                        </h1>

                        <div className="h-px w-0 bg-white group-hover:w-32 transition-all duration-500 mb-6 opacity-50"></div>

                        <p className="max-w-xs md:max-w-md text-sm md:text-lg font-medium opacity-60 leading-relaxed group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                            Challenge yourself and contribute to a sustainable future.
                        </p>

                        <div className="mt-8 md:mt-12 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-8 group-hover:translate-y-0">
                            <button className="px-8 py-3 md:px-10 md:py-4 bg-white text-aiesec-orange font-black text-xs md:text-sm uppercase tracking-widest hover:bg-orange-50 transition-colors shadow-lg rounded-sm">
                                Start Mission
                            </button>
                        </div>
                    </div>
                </div>

                {/* Center Divider/CTA */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
                    <div className="relative">
                        <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-white to-transparent opacity-50 absolute -top-12 left-1/2 -translate-x-1/2"></div>
                        <div className="md:hidden w-24 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-50 absolute top-1/2 -left-12 -translate-y-1/2"></div>

                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="w-16 h-16 md:w-24 md:h-24 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-sm bg-black/10"
                        >
                            <div className="w-12 h-12 md:w-20 md:h-20 border border-white/10 rounded-full"></div>
                        </motion.div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] md:text-xs font-bold text-white uppercase tracking-widest whitespace-nowrap">
                            Or
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ---------------- BUILDER PHASE ----------------
    if (phase === 'builder') {
        return (
            <div className="min-h-screen w-full bg-gray-50 relative font-lato">
                {/* Header - Styled to match premium feel */}
                <header
                    className="sticky top-0 z-30 w-full px-6 py-5 flex justify-between items-center shadow-lg bg-white/95 backdrop-blur-md"
                    style={{ borderTop: `4px solid ${primaryColor}` }}
                >
                    <div className="flex items-center gap-5">
                        <button onClick={() => setPhase('landing')} className="group flex items-center gap-2 hover:opacity-70 transition-opacity">
                            <span className="font-black text-2xl tracking-tighter">AIESEC</span>
                        </button>
                        <div className="h-8 w-px bg-gray-300"></div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Current Phase</span>
                            <span className="font-bold text-base text-gray-900 uppercase tracking-tight">{path === 'career' ? 'Skill Builder' : 'Mission Log'}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex flex-col items-end mr-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Assets</span>
                            <span className="text-sm font-bold">{selectedItems.length} of 3 Selected</span>
                        </div>
                        <div className="w-14 h-14 rounded-full border-2 border-black flex items-center justify-center font-black text-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white transition-transform transform key={selectedItems.length} animate-bounce-short">
                            {selectedItems.length}
                        </div>
                    </div>
                </header>

                {/* Mesh Background */}
                <div className="fixed inset-0 z-0 opacity-10 pointer-events-none overflow-hidden">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-aiesec-blue rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-aiesec-orange rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                </div>

                {/* Grid */}
                <main className="relative z-10 max-w-[1600px] mx-auto p-6 md:p-12">
                    <div className="text-center mb-16">
                        <span className={`inline-block px-4 py-1.5 mb-5 text-xs font-bold tracking-[0.3em] uppercase text-white bg-black rounded-full`}>
                            Step 01
                        </span>
                        <h2 className="text-4xl md:text-7xl font-black text-gray-900 mb-6 uppercase tracking-tighter">
                            {path === 'career' ? 'Curate Your Edge' : 'Choose Your Mission'}
                        </h2>
                        <div className="h-1.5 w-24 mx-auto bg-gray-200 rounded-full mb-6"></div>
                        <p className="text-gray-500 font-bold text-base md:text-xl tracking-wide uppercase max-w-2xl mx-auto">Select 3 cards to unlock your personalized ROI and reveal your potential</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {cards.map((item, index) => (
                            <FlipCard
                                key={item.id}
                                item={item}
                                index={index}
                                isSelected={!!selectedItems.find(i => i.id === item.id)}
                                onSelect={handleSelect}
                                primaryColor={primaryColor}
                                isStackFull={selectedItems.length >= 3}
                            />
                        ))}
                    </div>
                </main>

                {/* Drawer for Profiling */}
                <AnimatePresence>
                    {showDrawer && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.6 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowDrawer(false)}
                                className="fixed inset-0 bg-black z-40"
                            />
                            <motion.div
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                exit={{ y: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[40px] shadow-[0_-20px_60px_rgba(0,0,0,0.3)] z-50 p-6 md:p-12 max-h-[90vh] overflow-y-auto"
                            >
                                <div className="max-w-4xl mx-auto">
                                    <div className="flex justify-between items-center mb-10 border-b-4 border-black pb-6">
                                        <div>
                                            <span className={`inline-block px-3 py-1 mb-2 text-xs font-bold tracking-[0.3em] uppercase text-white bg-black rounded`}>
                                                Step 02
                                            </span>
                                            <h3 className="text-4xl font-black text-gray-900 uppercase tracking-tight">One Last Step</h3>
                                        </div>
                                        <button onClick={() => setShowDrawer(false)} className="p-3 hover:bg-gray-100 rounded-full border-2 border-transparent hover:border-black transition-all">
                                            <X size={32} />
                                        </button>
                                    </div>

                                    <div className="space-y-8">
                                        {/* Row 1: Name & Age */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex justify-between">
                                                    <label className="text-sm font-bold uppercase text-gray-500 tracking-wider">Full Name *</label>
                                                    {errors.name && <span className="text-xs font-bold text-red-500 uppercase">{errors.name}</span>}
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Jane Doe"
                                                    className={`w-full p-5 bg-gray-50 border-2 rounded-xl outline-none font-bold text-lg transition-all placeholder:text-gray-300 ${errors.name ? 'border-red-500 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-black focus:bg-white'}`}
                                                    value={userProfile.name}
                                                    onChange={e => {
                                                        setUserProfile({ ...userProfile, name: e.target.value });
                                                        if (errors.name) setErrors({ ...errors, name: '' });
                                                    }}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex justify-between">
                                                    <label className="text-sm font-bold uppercase text-gray-500 tracking-wider">Age (16-35) *</label>
                                                    {errors.age && <span className="text-xs font-bold text-red-500 uppercase">{errors.age}</span>}
                                                </div>
                                                <input
                                                    type="number"
                                                    placeholder="e.g. 21"
                                                    className={`w-full p-5 bg-gray-50 border-2 rounded-xl outline-none font-bold text-lg transition-all placeholder:text-gray-300 ${errors.age ? 'border-red-500 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-black focus:bg-white'}`}
                                                    value={userProfile.age}
                                                    onChange={e => {
                                                        setUserProfile({ ...userProfile, age: e.target.value });
                                                        if (errors.age) setErrors({ ...errors, age: '' });
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Row 2: Contact Info */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex justify-between">
                                                    <label className="text-sm font-bold uppercase text-gray-500 tracking-wider">Email *</label>
                                                    {errors.email && <span className="text-xs font-bold text-red-500 uppercase">{errors.email}</span>}
                                                </div>
                                                <input
                                                    type="email"
                                                    placeholder="jane@university.edu"
                                                    className={`w-full p-5 bg-gray-50 border-2 rounded-xl outline-none font-bold text-lg transition-all placeholder:text-gray-300 ${errors.email ? 'border-red-500 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-black focus:bg-white'}`}
                                                    value={userProfile.email}
                                                    onChange={e => {
                                                        setUserProfile({ ...userProfile, email: e.target.value });
                                                        if (errors.email) setErrors({ ...errors, email: '' });
                                                    }}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex justify-between">
                                                    <label className="text-sm font-bold uppercase text-gray-500 tracking-wider">Mobile (AU) *</label>
                                                    {errors.phone && <span className="text-xs font-bold text-red-500 uppercase">{errors.phone}</span>}
                                                </div>
                                                <input
                                                    type="tel"
                                                    placeholder="04XXXXXXXX"
                                                    className={`w-full p-5 bg-gray-50 border-2 rounded-xl outline-none font-bold text-lg transition-all placeholder:text-gray-300 ${errors.phone ? 'border-red-500 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-black focus:bg-white'}`}
                                                    value={userProfile.phone}
                                                    onChange={e => {
                                                        setUserProfile({ ...userProfile, phone: e.target.value });
                                                        if (errors.phone) setErrors({ ...errors, phone: '' });
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Row 3: Education */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex justify-between">
                                                    <label className="text-sm font-bold uppercase text-gray-500 tracking-wider">Degree / Major *</label>
                                                    {errors.degree && <span className="text-xs font-bold text-red-500 uppercase">{errors.degree}</span>}
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Computer Science"
                                                    className={`w-full p-5 bg-gray-50 border-2 rounded-xl outline-none font-bold text-lg transition-all placeholder:text-gray-300 ${errors.degree ? 'border-red-500 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-black focus:bg-white'}`}
                                                    value={userProfile.degree}
                                                    onChange={e => {
                                                        setUserProfile({ ...userProfile, degree: e.target.value });
                                                        if (errors.degree) setErrors({ ...errors, degree: '' });
                                                    }}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex justify-between">
                                                    <label className="text-sm font-bold uppercase text-gray-500 tracking-wider">Year of Study *</label>
                                                    {errors.year && <span className="text-xs font-bold text-red-500 uppercase">{errors.year}</span>}
                                                </div>
                                                <div className="relative">
                                                    <select
                                                        className={`w-full p-5 bg-gray-50 border-2 rounded-xl outline-none font-bold text-lg transition-all appearance-none cursor-pointer ${errors.year ? 'border-red-500 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-black focus:bg-white'}`}
                                                        value={userProfile.year}
                                                        onChange={e => {
                                                            setUserProfile({ ...userProfile, year: e.target.value });
                                                            if (errors.year) setErrors({ ...errors, year: '' });
                                                        }}
                                                    >
                                                        <option value="" disabled>Select Year</option>
                                                        <option value="1">1st Year</option>
                                                        <option value="2">2nd Year</option>
                                                        <option value="3">3rd Year</option>
                                                        <option value="4">4th Year</option>
                                                        <option value="master">Master / PhD</option>
                                                    </select>
                                                    <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                                                        <ArrowRight size={20} className="transform rotate-90" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Row 4: University & Passion */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex justify-between">
                                                    <label className="text-sm font-bold uppercase text-gray-500 tracking-wider">University *</label>
                                                </div>
                                                <input
                                                    type="text"
                                                    disabled
                                                    className="w-full p-5 bg-gray-100 border-2 border-gray-200 rounded-xl outline-none font-bold text-lg text-gray-500 cursor-not-allowed"
                                                    value={userProfile.university}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex justify-between">
                                                    <label className="text-sm font-bold uppercase text-gray-500 tracking-wider">Passionate Issue *</label>
                                                    {errors.passion && <span className="text-xs font-bold text-red-500 uppercase">{errors.passion}</span>}
                                                </div>
                                                <div className="relative">
                                                    <select
                                                        className={`w-full p-5 bg-gray-50 border-2 rounded-xl outline-none font-bold text-lg transition-all appearance-none cursor-pointer ${errors.passion ? 'border-red-500 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-black focus:bg-white'}`}
                                                        value={userProfile.passion}
                                                        onChange={e => {
                                                            setUserProfile({ ...userProfile, passion: e.target.value });
                                                            if (errors.passion) setErrors({ ...errors, passion: '' });
                                                        }}
                                                    >
                                                        <option value="" disabled>Select Issue</option>
                                                        {PASSIONS_LIST.map(p => <option key={p} value={p}>{p}</option>)}
                                                    </select>
                                                    <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                                                        <ArrowRight size={20} className="transform rotate-90" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Row 5: Destination & Availability */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex justify-between">
                                                    <label className="text-sm font-bold uppercase text-gray-500 tracking-wider">Destination Preference *</label>
                                                    {errors.destination && <span className="text-xs font-bold text-red-500 uppercase">{errors.destination}</span>}
                                                </div>
                                                <div className="relative">
                                                    <select
                                                        className={`w-full p-5 bg-gray-50 border-2 rounded-xl outline-none font-bold text-lg transition-all appearance-none cursor-pointer ${errors.destination ? 'border-red-500 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-black focus:bg-white'}`}
                                                        value={userProfile.destination}
                                                        onChange={e => {
                                                            setUserProfile({ ...userProfile, destination: e.target.value });
                                                            if (errors.destination) setErrors({ ...errors, destination: '' });
                                                        }}
                                                    >
                                                        <option value="" disabled>Select Region/Country</option>
                                                        {Object.entries(DESTINATION_REGIONS).map(([region, countries]) => (
                                                            <optgroup key={region} label={region}>
                                                                {countries.map(c => <option key={c} value={c}>{c}</option>)}
                                                            </optgroup>
                                                        ))}
                                                    </select>
                                                    <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                                                        <ArrowRight size={20} className="transform rotate-90" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex justify-between">
                                                    <label className="text-sm font-bold uppercase text-gray-500 tracking-wider">Availability *</label>
                                                    {errors.availability && <span className="text-xs font-bold text-red-500 uppercase">{errors.availability}</span>}
                                                </div>
                                                <div className="relative">
                                                    <select
                                                        className={`w-full p-5 bg-gray-50 border-2 rounded-xl outline-none font-bold text-lg transition-all appearance-none cursor-pointer ${errors.availability ? 'border-red-500 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-black focus:bg-white'}`}
                                                        value={userProfile.availability}
                                                        onChange={e => {
                                                            setUserProfile({ ...userProfile, availability: e.target.value });
                                                            if (errors.availability) setErrors({ ...errors, availability: '' });
                                                        }}
                                                    >
                                                        <option value="" disabled>Select Availability</option>
                                                        {AVAILABILITY_OPTIONS.map(a => <option key={a} value={a}>{a}</option>)}
                                                    </select>
                                                    <div className="absolute right-6 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                                                        <ArrowRight size={20} className="transform rotate-90" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Consents */}
                                        <div className="space-y-4 pt-2">
                                            <label className="flex items-start gap-4 cursor-pointer group">
                                                <div className={`w-8 h-8 rounded border-2 flex items-center justify-center flex-none transition-all ${userProfile.contactConsent ? 'bg-black border-black text-white' : 'bg-white border-gray-300 group-hover:border-black'}`}>
                                                    {userProfile.contactConsent && <ArrowRight size={16} className="rotate-45" />}
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    className="hidden"
                                                    checked={userProfile.contactConsent}
                                                    onChange={e => {
                                                        setUserProfile({ ...userProfile, contactConsent: e.target.checked });
                                                        if (errors.contactConsent) setErrors({ ...errors, contactConsent: '' });
                                                    }}
                                                />
                                                <span className="text-sm md:text-base font-medium leading-tight text-gray-600">
                                                    I'm okay with being contacted in the future for more AIESEC opportunities
                                                </span>
                                            </label>

                                            <label className="flex items-start gap-4 cursor-pointer group">
                                                <div className={`w-8 h-8 rounded border-2 flex items-center justify-center flex-none transition-all ${userProfile.feeAcknowledgment ? 'bg-black border-black text-white' : 'bg-white border-gray-300 group-hover:border-black'}`}>
                                                    {userProfile.feeAcknowledgment && <ArrowRight size={16} className="rotate-45" />}
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    className="hidden"
                                                    checked={userProfile.feeAcknowledgment}
                                                    onChange={e => {
                                                        setUserProfile({ ...userProfile, feeAcknowledgment: e.target.checked });
                                                        if (errors.feeAcknowledgment) setErrors({ ...errors, feeAcknowledgment: '' });
                                                    }}
                                                />
                                                <span className="text-sm md:text-base font-medium leading-tight text-gray-600">
                                                    I understand that there is a base programme fee of 950AUD exclusive of flights and accommodations for the exchange.
                                                </span>
                                            </label>
                                        </div>

                                        <div>
                                            <p className="text-gray-800 mb-4 text-base font-bold uppercase tracking-wide">
                                                What's holding you back? <span className="text-gray-400 font-normal normal-case">(We customize the Reality Check based on this)</span>
                                            </p>
                                            <div className="flex flex-wrap gap-4">
                                                {CONCERNS_LIST.map(concern => (
                                                    <button
                                                        key={concern}
                                                        onClick={() => toggleConcern(concern)}
                                                        className={`px-8 py-4 rounded-full text-sm font-bold border-2 transition-all transform hover:scale-105 active:scale-95 ${userProfile.concerns.includes(concern)
                                                            ? `bg-[${primaryColor}] border-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`
                                                            : 'bg-white border-gray-200 text-gray-500 hover:border-black hover:text-black'
                                                            }`}
                                                    >
                                                        {concern}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-8 flex flex-col md:flex-row gap-6">
                                            <button
                                                onClick={handleLaunch}
                                                className={`flex-1 py-6 text-white text-xl font-black uppercase tracking-wider rounded-xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all`}
                                                style={{ backgroundColor: primaryColor }}
                                            >
                                                Launch EXPA Account
                                            </button>
                                            <button
                                                onClick={handleLaunch}
                                                className="flex-1 py-6 text-black bg-white border-2 border-black text-xl font-bold uppercase tracking-wider rounded-xl shadow-[6px_6px_0px_0px_#ccc] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#ccc] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all"
                                            >
                                                Grab Golden Ticket
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    // ---------------- REWARDS PHASE ----------------
    if (phase === 'rewards') {
        return <Rewards user={userProfile} selectedItems={selectedItems} path={path} />;
    }

    return null;
}

export default App;
