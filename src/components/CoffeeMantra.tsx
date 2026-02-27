import React, { useState } from 'react';
import { Coffee } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CoffeeMantra: React.FC = () => {
  const [isFilled, setIsFilled] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  
  // Coin flip sound
  const playSound = () => {
    const audio = new Audio('https://cdn.pixabay.com/audio/2022/03/24/audio_78c3127b9f.mp3');
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Audio play failed", e));
  };

  const handleCoffeeClick = () => {
    if (isFilled || isFlipping) return;
    
    playSound();
    setIsFlipping(true);
    setTimeout(() => {
      setIsFlipping(false);
      setIsFilled(true);
    }, 1000); // Increased to match new flip duration
  };

  const handleSip = () => {
    setIsFilled(false);
  };

  return (
    <section className="py-24 md:py-32 bg-design-blue border-t-2 border-b-2 border-design-black dark:border-white transition-colors duration-300 overflow-hidden relative">
      
      {/* Coffee Fluid Overlay */}
      <AnimatePresence>
        {isFilled && (
          <motion.div
            initial={{ y: "120%" }}
            animate={{ y: "0%" }}
            exit={{ y: "120%" }}
            transition={{ duration: 2.5, ease: [0.76, 0, 0.24, 1] }} // Slowed down from 1.2 to 2.5
            className="absolute inset-0 z-30 bg-[#3C2A21] flex items-center justify-center"
          >
             {/* Liquid Wave Top Decoration */}
             <div className="absolute -top-12 left-0 w-full h-12 overflow-hidden">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-full fill-[#3C2A21]">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                </svg>
             </div>

             <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 1.0 }}
                onClick={handleSip}
                className="px-8 py-4 bg-white text-[#3C2A21] font-display font-bold text-2xl uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-transform shadow-xl cursor-pointer"
             >
                Take a Sip
             </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(#000 2px, transparent 2px)',
          backgroundSize: '30px 30px'
      }}></div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center relative z-10">
        
        {/* Animated Steaming Coffee Icon */}
        <div className="relative mb-12 cursor-pointer group perspective-1000" onClick={handleCoffeeClick}>
          <motion.div 
            animate={isFlipping ? { 
              rotateX: 1080, // 3 full rotations
              y: [0, -250, 0], // Jump up and down
            } : { 
              rotateX: 0,
              y: 0
            }}
            transition={{ 
              duration: 1.2,
              rotateX: { ease: "linear", duration: 1.2 },
              y: { ease: ["easeOut", "easeIn"], times: [0, 0.5, 1], duration: 1.2 }
            }}
            className="relative z-10"
          >
              {/* Steam Particles */}
              {!isFilled && (
                  <>
                      <motion.div
                          animate={{ y: [-4, -12, -20], opacity: [0, 0.6, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                          className="absolute -top-8 left-2 w-1.5 h-4 bg-design-black dark:bg-black rounded-full"
                      />
                      <motion.div
                          animate={{ y: [-4, -16, -24], opacity: [0, 0.8, 0] }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
                          className="absolute -top-10 left-1/2 -translate-x-1/2 w-1.5 h-6 bg-design-black dark:bg-black rounded-full"
                      />
                      <motion.div
                          animate={{ y: [-4, -12, -20], opacity: [0, 0.6, 0] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
                          className="absolute -top-6 right-2 w-1.5 h-4 bg-design-black dark:bg-black rounded-full"
                      />
                  </>
              )}
              
              <div className="relative z-10 p-8 border-4 border-design-black dark:border-black bg-white dark:bg-white rounded-full shadow-flat dark:shadow-flat group-hover:scale-105 transition-transform">
                  <Coffee size={64} className="text-design-black dark:text-black" strokeWidth={2.5} />
              </div>
          </motion.div>
          
          {/* Shadow that scales when coin goes up */}
          <motion.div
            animate={isFlipping ? {
              scale: [1, 0.5, 1],
              opacity: [0.5, 0.2, 0.5]
            } : {
              scale: 1,
              opacity: 0.5
            }}
            transition={{
              duration: 1.2,
              ease: ["easeOut", "easeIn"], times: [0, 0.5, 1]
            }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/20 blur-sm rounded-full z-0"
          />
        </div>

        {/* The Quote - Mask Reveal Animation - Clamped Sizes */}
        <div className="mb-12 px-4 relative">
             <motion.h2 
               className="text-[10vw] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold uppercase leading-tight md:leading-[0.9] text-design-black dark:text-black tracking-tighter"
             >
                <div className="overflow-hidden">
                    <motion.div
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        "Better <span className="text-outline-dark">Coffee</span>
                    </motion.div>
                </div>
                <div className="overflow-hidden">
                    <motion.div
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Than Not <span className="text-outline-dark">Coffee</span>"
                    </motion.div>
                </div>
            </motion.h2>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="inline-block bg-design-black dark:bg-black text-design-blue px-6 py-2 text-xs font-mono font-bold uppercase tracking-widest border-2 border-transparent"
        >
            Studio Fuel &bull; Est. 2025
        </motion.div>

      </div>
    </section>
  );
};

export default CoffeeMantra;