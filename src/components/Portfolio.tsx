import React, { useState, useMemo, useEffect } from 'react';
import { Project } from '../types';
import { ArrowUpRight, X, Share2, Ruler, Lightbulb, Download, Activity, Palette, ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectFilter from './ProjectFilter';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioProjects } from '../data/content';
import { handleImageError, getHighResUrl } from '../utils/imageUtils';
import { moreProjects, getProjectDetails } from '../utils/projectUtils';
import DeconstructionView from './DeconstructionView';
import { ParallaxFloat, ParallaxImage, DecryptedText } from './TextAnimations';

const CarouselImage: React.FC<{ src: string; alt: string; onClick: (e: React.MouseEvent) => void; onError: (e: any) => void }> = ({ src, alt, onClick, onError }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
             {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-neutral-300 border-t-design-black rounded-full animate-spin"></div>
                </div>
             )}
             <motion.img 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.95 }}
                transition={{ duration: 0.5 }}
                src={src} 
                alt={alt} 
                onClick={onClick}
                className="relative z-10 max-w-full max-h-full object-contain shadow-2xl rounded-2xl border border-white/10 cursor-zoom-in hover:scale-[1.02] transition-transform duration-300" 
                onLoad={() => setIsLoaded(true)}
                onError={onError}
            />
        </div>
    );
};

const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDeconstructing, setIsDeconstructing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewHighRes, setViewHighRes] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (selectedProject) {
      setCurrentImageIndex(0);
    }
  }, [selectedProject]);

  const projectImages = useMemo(() => {
    if (!selectedProject) return [];
    return selectedProject.images && selectedProject.images.length > 0 
      ? selectedProject.images 
      : [selectedProject.image];
  }, [selectedProject]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  useEffect(() => {
    document.body.style.overflow = selectedProject || viewHighRes ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject, viewHighRes]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (viewHighRes) setViewHighRes(null);
        else if (isDeconstructing) setIsDeconstructing(false);
        else if (selectedProject) setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedProject, isDeconstructing, viewHighRes]);

  const allProjects = useMemo(() => {
    return showAll ? [...portfolioProjects, ...moreProjects] : portfolioProjects;
  }, [showAll]);

  const filteredProjects = useMemo(() => {
    return activeFilter === 'All' 
      ? allProjects 
      : allProjects.filter(p => p.category === activeFilter);
  }, [activeFilter, allProjects]);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
        setShowAll(true);
        setLoading(false);
    }, 400); 
  };

  const handleCloseArchive = () => {
    setShowAll(false);
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- Website Code: Project Details Memoization ---
  const details = useMemo(() => 
    selectedProject ? getProjectDetails(selectedProject) : { measurement: '', concept: '', media: '' },
    [selectedProject]
  );

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-design-black relative text-white transition-colors duration-500">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 relative">
        
        {/* --- Website Code: Header Section --- */}
        <div className="flex flex-col xl:flex-row justify-between items-end mb-16 gap-8 px-2 border-b border-white/10 pb-12 sticky top-20 z-40 bg-design-black/90 backdrop-blur-sm py-4 transition-all duration-300">
          <ParallaxFloat offset={15}>
            <div>
               <span className="block text-xs font-mono uppercase tracking-widest mb-4 text-design-green">
                 <DecryptedText text="The Archive" speed={30} revealDelay={200} />
               </span>
               <h2 className="text-6xl md:text-7xl lg:text-9xl font-display font-medium text-white uppercase tracking-tighter leading-[0.75]">
                  SIMPSON <br/><span className="italic font-serif font-light opacity-30">Archive</span>
               </h2>
            </div>
          </ParallaxFloat>
          <ProjectFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>

        {/* --- Website Code: Project Grid --- */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 gap-6 w-full mx-auto px-2">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div 
                layout
                key={project.id}
                onClick={() => setSelectedProject(project)}
                role="button"
                tabIndex={0}
                className="break-inside-avoid mb-6 group cursor-zoom-in relative focus:outline-none"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                transition={{ 
                  duration: 0.4,
                  ease: "easeOut"
                }}
              >
                <div className="relative rounded-[2rem] overflow-hidden bg-white border border-design-black/5 group-focus:ring-2 group-focus:ring-design-green" style={{ aspectRatio: 'auto' }}>
                    <ParallaxImage 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
                        loading="lazy"
                        onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex justify-end">
                            <span className="bg-design-green text-black px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white transition-all transform -translate-y-2 group-hover:translate-y-0">
                                Examine
                            </span>
                        </div>
                        <div className="flex justify-between items-center transform translate-y-2 group-hover:translate-y-0">
                             <div className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30">
                                 <ArrowUpRight size={18} />
                             </div>
                             <div className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30">
                                 <Share2 size={16} />
                             </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4 px-2">
                   <h3 className="text-base font-bold text-white mb-1 uppercase tracking-tight">{project.title}</h3>
                   <div className="flex items-center justify-between opacity-50">
                      <p className="text-[10px] font-mono uppercase tracking-widest">{project.category}</p>
                      <span className="text-[10px] font-mono">{project.year}</span>
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* --- Website Code: Load More Button --- */}
        <div className="mt-32 flex justify-center">
            <ParallaxFloat offset={-20}>
              <button 
                  onClick={showAll ? handleCloseArchive : handleLoadMore}
                  disabled={loading}
                  className="group relative px-12 py-5 bg-transparent border-2 border-white/20 overflow-hidden rounded-full transition-all hover:border-white focus:outline-none focus:ring-2 focus:ring-design-blue"
              >
                  <span className="relative z-10 text-xs font-bold uppercase tracking-widest text-white group-hover:text-design-black transition-colors">
                      {loading ? "Warming Up..." : showAll ? "Close Complete Archive" : "Load Complete Archive"}
                  </span>
                  <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>
            </ParallaxFloat>
        </div>
      </div>

      {/* --- Website Code: Project Modal --- */}
      <AnimatePresence>
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/80 backdrop-blur-xl" 
            onClick={() => {
              setSelectedProject(null);
              setIsDeconstructing(false);
            }}
          />
          
          <motion.div 
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 180, mass: 0.8 }}
            className="relative bg-white w-full max-w-[1920px] h-full md:h-[92vh] shadow-2xl flex flex-col overflow-hidden md:rounded-[3rem] border border-neutral-200 text-design-black"
          >
            {/* --- Website Code: Deconstruction View (Process) --- */}
            <AnimatePresence>
              {isDeconstructing && (
                <DeconstructionView 
                  project={selectedProject} 
                  onClose={() => setIsDeconstructing(false)} 
                />
              )}
            </AnimatePresence>

            {!isDeconstructing && (
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-[130] w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-design-black text-white rounded-full hover:rotate-90 transition-transform duration-500 shadow-xl focus:outline-none focus:ring-2 focus:ring-design-blue"
              >
                <X size={16} className="md:w-5 md:h-5" />
              </button>
            )}

            <div className="flex flex-col lg:flex-row h-full overflow-hidden">
              {/* --- Website Code: Modal Left Panel (Carousel) --- */}
              <motion.div 
                 initial={{ opacity: 0, x: -50 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.2, duration: 0.8, ease: "circOut" }}
                 className="w-full lg:w-[60%] h-[40vh] md:h-[50vh] lg:h-full shrink-0 bg-neutral-100 relative group overflow-hidden flex items-center justify-center p-6 md:p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-neutral-200"
              >
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                       style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                  </div>

                  <div className="relative w-full h-full flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentImageIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="relative w-full h-full flex items-center justify-center"
                            >
                                <CarouselImage 
                                    src={projectImages[currentImageIndex]} 
                                    alt={`${selectedProject.title} - View ${currentImageIndex + 1}`} 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setViewHighRes(getHighResUrl(projectImages[currentImageIndex]));
                                    }}
                                    onError={handleImageError}
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* --- Website Code: Carousel Navigation --- */}
                        {projectImages.length > 1 && (
                            <>
                                <button 
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-design-black hover:bg-design-black hover:text-white transition-all shadow-lg z-30 focus:outline-none focus:ring-2 focus:ring-design-blue opacity-100 md:opacity-0 md:group-hover:opacity-100"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button 
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-design-black hover:bg-design-black hover:text-white transition-all shadow-lg z-30 focus:outline-none focus:ring-2 focus:ring-design-blue opacity-100 md:opacity-0 md:group-hover:opacity-100"
                                    aria-label="Next image"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </>
                        )}

                        {/* --- Website Code: Carousel Dots --- */}
                        {projectImages.length > 1 && (
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2 bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                {projectImages.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentImageIndex(idx);
                                        }}
                                        className={`h-2 rounded-full transition-all duration-300 ${
                                            idx === currentImageIndex ? 'bg-design-black w-6' : 'bg-design-black/40 w-2 hover:bg-design-black/60'
                                        }`}
                                    />
                                ))}
                            </div>
                        )}

                        {/* --- Website Code: Carousel Thumbnails --- */}
                        {projectImages.length > 1 && (
                            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex gap-2 bg-white/30 backdrop-blur-md p-2 rounded-xl opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 overflow-x-auto max-w-[90%]">
                                {projectImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentImageIndex(idx);
                                        }}
                                        className={`relative w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                                            idx === currentImageIndex ? 'border-design-blue scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                                        }`}
                                    >
                                        <img 
                                            src={img} 
                                            alt={`Thumbnail ${idx + 1}`} 
                                            className="w-full h-full object-cover"
                                            onError={handleImageError}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* --- Website Code: Dimensions Overlay --- */}
                        <motion.div 
                            initial={{ opacity: 0, height: "0%" }}
                            animate={{ opacity: 1, height: "80%" }}
                            transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 w-10 flex flex-row items-center justify-end z-20 pointer-events-none hidden sm:flex"
                        >
                            <div className="h-full flex flex-col items-end relative">
                              <div className="w-3 h-px bg-design-black/50"></div>
                              <div className="h-full w-px bg-design-black/50"></div>
                              <div className="w-3 h-px bg-design-black/50"></div>
                            </div>
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 -rotate-90 bg-white text-design-black border border-neutral-200 px-3 py-1 shadow-sm rounded-sm whitespace-nowrap">
                              <span className="text-[10px] font-mono font-bold uppercase tracking-widest">
                                  Height: {details.measurement.split('x')[1] || 'Auto'}
                              </span>
                            </div>
                        </motion.div>
                    </div>
              </motion.div>

              {/* --- Website Code: Modal Right Panel (Content) --- */}
              <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: "circOut" }}
                  className="w-full lg:w-[40%] flex-1 lg:h-full bg-white p-6 md:p-8 lg:p-10 flex flex-col overflow-y-auto"
              >
                  <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                  >
                      <div className="flex items-center justify-between mb-6 md:mb-8">
                          <div className="flex items-center gap-4">
                              <span className="px-4 py-1.5 bg-design-blue text-black text-[10px] font-bold uppercase tracking-widest rounded-full">{selectedProject.category}</span>
                              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Edition {selectedProject.year}</span>
                          </div>

                          {projectImages.length > 1 && (
                              <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mr-2 hidden sm:inline-block">Gallery</span>
                                  <button 
                                      onClick={prevImage}
                                      className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-200 hover:bg-neutral-100 transition-colors text-design-black"
                                      aria-label="Previous image"
                                  >
                                      <ChevronLeft size={16} />
                                  </button>
                                  <span className="text-[10px] font-mono text-gray-400 w-12 text-center">
                                      {currentImageIndex + 1} / {projectImages.length}
                                  </span>
                                  <button 
                                      onClick={nextImage}
                                      className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-200 hover:bg-neutral-100 transition-colors text-design-black"
                                      aria-label="Next image"
                                  >
                                      <ChevronRight size={16} />
                                  </button>
                              </div>
                          )}
                      </div>

                      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium text-design-black leading-[0.9] mb-6 md:mb-8 uppercase tracking-tighter break-words">
                          {selectedProject.title}
                      </h2>
                      
                      {/* --- Website Code: Project Description --- */}
                      <div className="mb-12 space-y-10">
                          <p className="text-gray-900 font-medium text-xl md:text-2xl leading-relaxed">
                              {selectedProject.description}
                          </p>
                          
                          {selectedProject.extendedDescription && (
                              <div className="text-gray-600 font-light text-base md:text-lg leading-relaxed">
                                   <p>{selectedProject.extendedDescription}</p>
                              </div>
                          )}

                          <div className="grid grid-cols-1 gap-8">
                              {selectedProject.challenge && (
                                  <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100">
                                      <h4 className="text-xs font-mono uppercase tracking-widest text-design-black mb-4 flex items-center gap-2 font-bold">
                                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                                          The Challenge
                                      </h4>
                                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                          {selectedProject.challenge}
                                      </p>
                                  </div>
                              )}

                              {selectedProject.solution && (
                                  <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100">
                                      <h4 className="text-xs font-mono uppercase tracking-widest text-design-black mb-4 flex items-center gap-2 font-bold">
                                          <span className="w-1.5 h-1.5 bg-design-green rounded-full"></span>
                                          The Solution
                                      </h4>
                                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                          {selectedProject.solution}
                                      </p>
                                  </div>
                              )}
                          </div>

                          {selectedProject.technologies && (
                              <div className="pt-6 border-t border-neutral-100">
                                   <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-4">
                                      Technologies & Tools
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                      {selectedProject.technologies.map((tech, i) => (
                                          <span key={i} className="px-3 py-1.5 bg-neutral-100 text-neutral-600 text-[10px] uppercase tracking-wider font-bold rounded-md border border-neutral-200">
                                              {tech}
                                          </span>
                                      ))}
                                  </div>
                              </div>
                          )}
                      </div>

                      <div className="flex flex-wrap gap-4 mb-12">
                        {selectedProject.downloadUrl && (
                          <a 
                            href={selectedProject.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-6 py-3 bg-design-black text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:opacity-80 transition-all focus:outline-none focus:ring-2 focus:ring-design-blue"
                          >
                            <Download size={14} />
                            Download Assets
                          </a>
                        )}
                        <button 
                          onClick={() => setIsDeconstructing(true)}
                          className="inline-flex items-center gap-3 px-6 py-3 bg-design-blue text-black rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-flat focus:outline-none focus:ring-2 focus:ring-black"
                        >
                          <Activity size={14} />
                          View Process
                        </button>
                      </div>
                  </motion.div>

                  {/* --- Website Code: Project Stats --- */}
                  <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.5 }}
                     className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-12 mt-auto"
                  >
                          <div className="p-4 border border-neutral-100 rounded-3xl flex flex-col items-center justify-center text-center hover:bg-neutral-50 transition-colors duration-300">
                              <Ruler className="mb-3 text-design-blue" size={24} />
                              <span className="text-[10px] font-mono uppercase text-gray-400 mb-1">Scale</span>
                              <span className="font-bold text-xs md:text-sm uppercase text-design-black">{details.measurement}</span>
                          </div>
                          <div className="p-4 border border-neutral-100 rounded-3xl flex flex-col items-center justify-center text-center hover:bg-neutral-50 transition-colors duration-300">
                              <Lightbulb className="mb-3 text-design-blue" size={24} />
                              <span className="text-[10px] font-mono uppercase text-gray-400 mb-1">Logic</span>
                              <span className="font-bold text-xs md:text-sm uppercase text-design-black">{details.concept}</span>
                          </div>
                          <div className="p-4 border border-neutral-100 rounded-3xl flex flex-col items-center justify-center text-center hover:bg-neutral-50 transition-colors duration-300">
                              <Palette className="mb-3 text-design-blue" size={24} />
                              <span className="text-[10px] font-mono uppercase text-gray-400 mb-1">Media</span>
                              <span className="font-bold text-xs md:text-sm uppercase text-design-black">{details.media}</span>
                          </div>
                  </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
      </AnimatePresence>

      {/* --- Website Code: High Res Image Viewer --- */}
      <AnimatePresence>
        {viewHighRes && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
                onClick={() => setViewHighRes(null)}
            >
                <button 
                    onClick={() => setViewHighRes(null)}
                    className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all z-50 focus:outline-none focus:ring-2 focus:ring-white"
                >
                    <X size={24} />
                </button>

                <motion.img
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    src={viewHighRes}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                    onClick={(e) => e.stopPropagation()} 
                    onError={handleImageError}
                />
            </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;