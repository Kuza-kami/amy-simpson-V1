import React, { useState } from 'react';
import { Quote, User, X, Mail, Phone, MessageCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParallaxFloat } from './TextAnimations';

const testimonials = [
  {
    id: 1,
    text: "Amy brings a rare sensitivity to materials. Her designs aren't just clothes; they are architectural softness.",
    author: "Elena Rossi",
    role: "Creative Director, Aura",
    avatar: "ER"
  },
  {
    id: 2,
    text: "Working with Amy was a revelation. She understood our brand's core immediately and translated it into a visual language that speaks volumes.",
    author: "Marcus Chen",
    role: "Founder, Zenith",
    avatar: "MC"
  },
  {
    id: 3,
    text: "The attention to detail is unparalleled. From the initial sketch to the final stitch, every step is deliberate and artistic.",
    author: "Sarah Jenkins",
    role: "Fashion Editor, Vogue",
    avatar: "SJ"
  },
  {
    id: 4,
    text: "She doesn't just design; she solves problems with elegance. A true multidisciplinary talent.",
    author: "David Thorne",
    role: "Product Lead, Stripe",
    avatar: "DT"
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedContact, setSelectedContact] = useState<typeof testimonials[0] | null>(null);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 lg:py-32 bg-white dark:bg-[#0a0a0a] border-t border-neutral-100 dark:border-neutral-800 transition-colors duration-500 relative overflow-hidden">
       {/* Decorative Background */}
       <div className="absolute top-0 right-0 w-1/3 h-full bg-neutral-50 dark:bg-[#0f0f0f] -skew-x-12 z-0"></div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 relative z-10">
          <ParallaxFloat offset={25}>
            <div className="text-center mb-12 md:mb-20">
               <Quote size={36} className="mx-auto mb-4 md:mb-8 text-design-blue opacity-80" />
               <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display uppercase text-design-black dark:text-white tracking-tight">
                  Voices of <br/><span className="text-transparent text-outline dark:text-outline-white">Collaboration</span>
               </h2>
            </div>
          </ParallaxFloat>

          <div className="relative">
             {/* Carousel Window */}
             <div className="overflow-hidden py-2 md:py-4">
                <motion.div 
                    className="flex"
                    animate={{ x: `-${currentIndex * 100}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    {testimonials.map((t) => (
                        <motion.div 
                            key={t.id} 
                            className="w-full flex-shrink-0 px-2 sm:px-4 md:px-12 lg:px-20"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div 
                                onClick={() => setSelectedContact(t)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setSelectedContact(t);
                                  }
                                }}
                                role="button"
                                tabIndex={0}
                                className="mx-auto max-w-4xl bg-white dark:bg-[#111] p-4 sm:p-6 md:p-8 lg:p-16 rounded-[1.5rem] md:rounded-[2rem] border-2 border-design-black dark:border-white shadow-[8px_8px_0px_0px_rgba(37,99,235,1)] md:shadow-[12px_12px_0px_0px_rgba(37,99,235,1)] hover:shadow-[4px_4px_0px_0px_rgba(37,99,235,1)] md:hover:shadow-[8px_8px_0px_0px_rgba(37,99,235,1)] hover:translate-y-1 hover:translate-x-1 transition-all cursor-pointer group focus:outline-none focus:ring-4 focus:ring-design-blue/20"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <p className="text-base sm:text-lg md:text-xl lg:text-3xl font-serif italic text-design-black dark:text-white mb-4 md:mb-8 lg:mb-10 leading-relaxed">
                                        "{t.text}"
                                    </p>
                                    
                                    <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
                                        <div className="w-12 md:w-14 lg:w-16 h-12 md:h-14 lg:h-16 rounded-full bg-design-yellow border-2 border-design-black flex items-center justify-center font-display font-bold text-base md:text-lg lg:text-xl text-design-black group-hover:scale-110 transition-transform">
                                            {t.avatar}
                                        </div>
                                        <div className="text-center sm:text-left">
                                            <div className="text-base md:text-lg font-bold uppercase tracking-wider text-design-black dark:text-white">{t.author}</div>
                                            <div className="text-[11px] md:text-sm font-mono text-gray-500 uppercase">{t.role}</div>
                                        </div>
                                    </div>

                                    <div className="mt-4 md:mt-6 lg:mt-8 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
                                        <span className="text-[10px] md:text-xs font-mono uppercase bg-design-black dark:bg-white text-white dark:text-black px-3 md:px-4 py-1.5 md:py-2 rounded-full">View Contact</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
             </div>

             {/* Navigation Buttons */}
             <div className="flex justify-center gap-3 md:gap-6 mt-8 md:mt-12">
                <button 
                    onClick={prevTestimonial}
                    className="w-10 md:w-12 lg:w-14 h-10 md:h-12 lg:h-14 rounded-full border-2 border-design-black dark:border-white bg-transparent hover:bg-design-black hover:text-white dark:hover:bg-white dark:hover:text-black flex items-center justify-center transition-all group focus:outline-none focus:ring-2 focus:ring-design-blue"
                    aria-label="Previous testimonial"
                >
                    <ArrowLeft size={18} className="md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-1.5 md:gap-2">
                    {testimonials.map((_, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            aria-label={`Go to testimonial ${idx + 1}`}
                            className={`w-2 md:w-3 h-2 md:h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-design-blue ${idx === currentIndex ? 'bg-design-blue w-6 md:w-8' : 'bg-gray-300 dark:bg-gray-700 hover:bg-design-blue/50'}`}
                        />
                    ))}
                </div>
                <button 
                    onClick={nextTestimonial}
                    className="w-10 md:w-12 lg:w-14 h-10 md:h-12 lg:h-14 rounded-full border-2 border-design-black dark:border-white bg-transparent hover:bg-design-black hover:text-white dark:hover:bg-white dark:hover:text-black flex items-center justify-center transition-all group focus:outline-none focus:ring-2 focus:ring-design-blue"
                    aria-label="Next testimonial"
                >
                    <ArrowRight size={18} className="md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                </button>
             </div>

          </div>
       </div>

       {/* Contact Modal */}
       <AnimatePresence>
       {selectedContact && (
         <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white dark:bg-[#1a1a1a] w-full max-w-md rounded-3xl p-8 relative shadow-2xl border-2 border-design-black dark:border-white"
            >
                <button 
                  onClick={() => setSelectedContact(null)}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-design-black dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-design-blue rounded-full"
                  aria-label="Close contact modal"
                >
                  <X size={24} />
                </button>

                <div className="text-center mb-8">
                   <div className="w-20 h-20 rounded-full bg-design-yellow mx-auto flex items-center justify-center font-display font-bold text-3xl text-design-black border-2 border-design-black mb-4">
                       {selectedContact.avatar}
                   </div>
                   <h3 className="text-2xl font-display uppercase text-design-black dark:text-white">{selectedContact.author}</h3>
                   <p className="text-sm font-mono text-gray-500 uppercase">{selectedContact.role}</p>
                </div>

                <div className="space-y-4">
                   <a href={`mailto:contact@${selectedContact.author.replace(' ', '').toLowerCase()}.com`} className="flex items-center gap-4 p-4 bg-neutral-100 dark:bg-[#222] rounded-xl hover:bg-design-accent hover:text-white transition-colors group focus:outline-none focus:ring-2 focus:ring-design-blue">
                      <Mail size={20} className="text-gray-500 group-hover:text-white" />
                      <span className="font-bold text-sm">Email {selectedContact.author.split(' ')[0]}</span>
                   </a>
                   <button className="w-full flex items-center gap-4 p-4 bg-neutral-100 dark:bg-[#222] rounded-xl hover:bg-design-accent hover:text-white transition-colors group cursor-pointer focus:outline-none focus:ring-2 focus:ring-design-blue">
                      <Phone size={20} className="text-gray-500 group-hover:text-white" />
                      <span className="font-bold text-sm">Schedule Call</span>
                   </button>
                   <button className="w-full flex items-center gap-4 p-4 bg-neutral-100 dark:bg-[#222] rounded-xl hover:bg-design-accent hover:text-white transition-colors group cursor-pointer focus:outline-none focus:ring-2 focus:ring-design-blue">
                      <MessageCircle size={20} className="text-gray-500 group-hover:text-white" />
                      <span className="font-bold text-sm">Direct Message</span>
                   </button>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700 text-center">
                    <p className="text-xs text-gray-400">
                        Available for collaboration via direct inquiry.
                    </p>
                </div>
            </motion.div>
         </div>
       )}
       </AnimatePresence>
    </section>
  );
};

export default Testimonials;