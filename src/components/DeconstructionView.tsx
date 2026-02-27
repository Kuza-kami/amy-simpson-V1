import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { X, Scissors, Layers, Fingerprint, Activity } from 'lucide-react';
import { Project } from '../types';
import { handleImageError } from '../utils/imageUtils';
import { DecryptedText, TypingText, ProgressiveImage } from './TextAnimations';

type DeconstructionStep = {
  title: string;
  icon: React.ReactNode;
  desc: string;
  image?: string;
};

interface ProcessStepProps {
  step: DeconstructionStep;
  index: number;
  scrollYProgress: any;
  projectId: number;
  onImageClick: (src: string | null) => void;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ step, index, scrollYProgress, projectId, onImageClick }) => {
  return (
    <motion.div 
      className={`flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} relative z-10`} 
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex-1 space-y-4 text-center md:text-left w-full">
        <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 mx-auto md:mx-0 text-design-blue backdrop-blur-sm">
          {step.icon}
        </div>
        <div>
          <h4 className="text-xl md:text-3xl font-display font-bold uppercase tracking-tight">{step.title}</h4>
          <p className="text-sm md:text-lg text-gray-400 mt-3 leading-relaxed max-w-md mx-auto md:mx-0">{step.desc}</p>
        </div>
      </div>

      <div className="flex-1 w-full">
        {step.image ? (
          <motion.div 
            className="relative aspect-video md:aspect-[4/3] rounded-xl overflow-hidden border border-white/10 cursor-zoom-in group shadow-2xl"
            whileHover={{ scale: 1.02 }}
            onClick={() => onImageClick(step.image || null)}
          >
             <ProgressiveImage 
               src={step.image} 
               alt={step.title} 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
               onError={handleImageError}
             />
             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-lg">Expand</span>
             </div>
          </motion.div>
        ) : (
          <div className="aspect-video md:aspect-[4/3] rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
             <span className="text-gray-500 font-mono text-xs uppercase">Visual data unavailable</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

interface DeconstructionViewProps {
  onClose: () => void;
  project: Project;
}

const DeconstructionView: React.FC<DeconstructionViewProps> = ({ onClose, project }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });
  const [fullScreenImg, setFullScreenImg] = useState<string | null>(null);

  // Use project images if available, otherwise fallback to placeholders
  const projectImages = project.images || [project.image];
  
  const steps = [
    { 
      title: "Simpson Sketch", 
      icon: <Scissors size={24} />, 
      desc: "Initial translation of gymnastic floor routine movements into 2D structural planes.",
      image: projectImages[0] || "https://picsum.photos/800/600?grayscale"
    },
    { 
      title: "Material Tension", 
      icon: <Layers size={24} />, 
      desc: "Selecting high-performance technical fabrics that maintain form under extreme physical stress.",
      image: projectImages[1] || "https://picsum.photos/800/601?grayscale"
    },
    { 
      title: "S-Curve Draping", 
      icon: <Fingerprint size={24} />, 
      desc: "Adjusting the grainline to follow the natural torque of a twisting torso.",
      image: projectImages[2] || "https://picsum.photos/seed/scurve/800/600"
    },
    { 
      title: "Final Landing", 
      icon: <Activity size={24} />, 
      desc: "The intersection of aesthetic perfection and unhindered athletic mobility.",
      image: projectImages[3] || project.image
    }
  ];

  return (
    <>
    <motion.div 
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute inset-0 z-[110] bg-design-black text-white flex flex-col overflow-hidden"
    >
      <div className="p-4 md:p-8 flex justify-between items-center border-b border-white/10 shrink-0 bg-design-black z-30">
        <div>
          <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] md:tracking-[0.4em] text-design-blue mb-1 block">
            <DecryptedText text="Analytical View" speed={50} revealDelay={500} />
          </span>
          <h3 className="text-xl md:text-4xl font-display font-bold uppercase tracking-tighter">Process Deconstruction</h3>
        </div>
        <button 
          onClick={onClose}
          className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg border border-white/20 hover:bg-white hover:text-black transition-all focus:outline-none focus:ring-2 focus:ring-design-blue"
        >
          <X size={20} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-20 relative scroll-smooth">
        <div className="max-w-6xl mx-auto relative">
          {/* Mobile Line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10 md:hidden z-0"></div>

          {/* Desktop Curved Line */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[200px] pointer-events-none hidden md:block z-0">
            <svg viewBox="0 0 100 800" preserveAspectRatio="none" className="w-full h-full fill-none overflow-visible">
              <path 
                d="M 50,0 Q 70,100 50,200 Q 30,300 50,400 Q 70,500 50,600 Q 30,700 50,800" 
                stroke="white" 
                strokeWidth="1" 
                strokeDasharray="4 4" 
                className="opacity-10"
              />
              <motion.path 
                d="M 50,0 Q 70,100 50,200 Q 30,300 50,400 Q 70,500 50,600 Q 30,700 50,800" 
                stroke="#A2D2FF" 
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                style={{ pathLength }}
              />
            </svg>
          </div>

          <div className="space-y-24 md:space-y-64 relative z-10 pb-40 pt-12 md:pt-0">
            {steps.map((step, idx) => (
               <ProcessStep 
                  key={idx} 
                  step={step} 
                  index={idx} 
                  scrollYProgress={scrollYProgress} 
                  projectId={project.id} 
                  onImageClick={setFullScreenImg}
               />
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-4 md:p-8 border-t border-white/10 shrink-0 text-center bg-design-black z-30">
        <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-gray-500">
          <TypingText text="Simpson Structural Analysis © 2025" speed={50} delay={1} />
        </p>
      </div>
    </motion.div>
    
    <AnimatePresence>
      {fullScreenImg && (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            onClick={() => setFullScreenImg(null)}
        >
             <button 
                onClick={() => setFullScreenImg(null)}
                className="absolute top-6 right-6 w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all z-50 focus:outline-none focus:ring-2 focus:ring-white"
             >
                <X size={24} />
             </button>

             <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={fullScreenImg}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()} 
                onError={handleImageError}
             />
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

export default DeconstructionView;
