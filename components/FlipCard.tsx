
import React, { useState } from 'react';
import { CardItem } from '../types';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Star, Sparkles, Zap, Quote } from 'lucide-react';

interface FlipCardProps {
  item: CardItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
  primaryColor: string;
  index: number;
  isStackFull: boolean;
}

const FlipCard: React.FC<FlipCardProps> = ({ item, isSelected, onSelect, primaryColor, index, isStackFull }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  const handleCardClick = () => {
     if (!isFlipped) {
         setIsFlipped(true);
     }
  }

  // Determine icon based on index for variety
  const Icon = index % 3 === 0 ? Star : (index % 3 === 1 ? Sparkles : Zap);
  
  // Disable add button if stack is full and item is not already selected
  const isDisabled = !isSelected && isStackFull;

  return (
    <div 
        className="relative w-full h-[28rem] cursor-pointer perspective-1000 group font-lato"
        onClick={handleCardClick}
    >
      <motion.div
        className="w-full h-full relative transform-style-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <div className={`absolute w-full h-full backface-hidden rounded-2xl border-2 border-black overflow-hidden bg-white transition-all duration-300 ${isSelected ? 'ring-4 ring-offset-2' : ''} ${isFlipped ? 'pointer-events-none' : 'pointer-events-auto z-10'}`}
             style={{ 
                 boxShadow: isSelected ? `8px 8px 0px 0px ${primaryColor}` : '8px 8px 0px 0px rgba(0,0,0,1)',
                 borderColor: 'black',
                 ['--tw-ring-color' as any]: primaryColor
             }}
        >
            {/* Header decorative strip */}
            <div className="h-10 border-b-2 border-black flex justify-between items-center px-4 bg-gray-50">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 border border-black"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 border border-black"></div>
                </div>
                <span className="font-bold text-xs opacity-50">#{String(index + 1).padStart(2, '0')}</span>
            </div>

            {/* Image Area */}
            <div className="h-44 w-full border-b-2 border-black relative overflow-hidden group-hover:opacity-90 transition-opacity">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute top-3 left-3">
                     <span className={`inline-block px-3 py-1 text-xs font-black uppercase tracking-widest border border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white`} style={{ color: primaryColor }}>
                        {item.type}
                    </span>
                </div>
            </div>

            <div className="p-6 flex flex-col h-[calc(100%-2.5rem-11rem)] justify-between relative">
                {/* Content Area - Better Aligned */}
                <div className="flex-grow flex flex-col items-center justify-center gap-3">
                    <h3 className="text-3xl font-black text-gray-900 leading-none uppercase tracking-tight text-center">
                        {item.title}
                    </h3>
                    <div className="w-10 h-1 bg-gray-200 rounded-full my-1"></div>
                    <p className="text-base font-bold text-gray-600 leading-snug group-hover:text-black transition-colors text-center">
                        "{item.oneLineDefinition}"
                    </p>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 flex-none">
                    <div className="flex justify-between items-end">
                        <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-gray-400 group-hover:text-black transition-colors">
                            Click 4 ROI <ArrowRight size={12} />
                        </div>
                        {isSelected && (
                            <div className="bg-black text-white p-2 rounded-full shadow-[2px_2px_0px_0px_#ccc]">
                                <Check size={14} strokeWidth={4} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

        {/* Back */}
        <div 
            className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl border-2 border-black overflow-hidden flex flex-col justify-between ${isFlipped ? 'pointer-events-auto z-10' : 'pointer-events-none'}`}
            style={{ 
                backgroundColor: primaryColor,
                boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)',
            }}
        >
            <div className="h-full flex flex-col bg-white">
                {/* Back Header */}
                <div className="flex justify-between items-center p-4 border-b-2 border-black bg-gray-50 flex-none">
                    <span className="text-sm font-black uppercase tracking-widest text-black">Reality Check</span>
                     <button onClick={handleFlip} className="text-black hover:opacity-70 transition-opacity">
                         <div className="p-1.5 border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors"><ArrowRight size={14} className="rotate-180" /></div>
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="flex-grow p-6 flex flex-col gap-5 overflow-y-auto">
                    
                    {/* Professional Term Section */}
                    <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                            {item.type === 'skill' ? 'Professional Competency' : 'Core Experience'}
                        </div>
                        <div className="p-4 bg-gray-100 border border-gray-200 rounded-xl text-base font-bold text-gray-900 leading-snug shadow-sm">
                            {item.professionalName}
                        </div>
                    </div>

                    {/* Elaboration Section */}
                    <div className="flex-grow flex flex-col">
                        <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                            The Reality
                        </div>
                        <div className="relative flex-grow">
                             <Quote size={24} className="absolute -top-2 -left-2 text-gray-200" />
                             <p className="text-base font-medium text-gray-700 italic leading-relaxed pl-6 pt-1">
                                {item.experienceDetail}
                             </p>
                        </div>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 border-t-2 border-black bg-gray-50 flex-none">
                    <button
                        disabled={isDisabled}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!isDisabled) {
                                onSelect(item.id);
                            }
                        }}
                        className={`w-full py-4 px-6 rounded-xl font-black text-sm uppercase tracking-wider border-2 border-black transition-all flex items-center justify-center gap-3 ${
                            isDisabled
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none border-gray-400'
                            : isSelected 
                                ? 'bg-black text-white cursor-pointer hover:bg-gray-800' 
                                : 'bg-white text-black cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none'
                        }`}
                        style={{ backgroundColor: isSelected ? 'black' : undefined, color: isSelected ? 'white' : undefined }}
                    >
                        {isSelected 
                            ? 'Selected' 
                            : (isDisabled ? 'Stack Full' : <>Add to Stack <Icon size={16} /></>)
                        }
                    </button>
                </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FlipCard;
