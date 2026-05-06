import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle } from 'lucide-react';

export const FloatingAssistant = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [showYoutube, setShowYoutube] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleOpen = () => {
    if (!isMinimized) {
      // If closing, reset state
      setShowYoutube(false);
    }
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <div className="relative pointer-events-auto">
            {/* Main Video Bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                width: isMinimized ? 80 : 320,
                height: isMinimized ? 80 : 540,
              }}
              className="relative overflow-hidden rounded-[32px] shadow-2xl bg-white border border-black/5 flex flex-col items-center justify-center cursor-pointer group transition-all duration-500"
              onClick={toggleOpen}
            >
              {isMinimized ? (
                <div className="w-full h-full relative group bg-brand-primary/5">
                  <video
                    src="/input_file_0.mp4"
                    loop
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover scale-150"
                    style={{ mixBlendMode: 'multiply' }}
                    onError={(e) => {
                      (e.target as HTMLVideoElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-brand-primary drop-shadow-md animate-pulse" />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-white flex flex-col">
                  {/* Header in expanded mode */}
                  <div className="p-4 border-b border-black/5 flex items-center justify-between bg-white/80 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                       <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center text-white">
                          <MessageCircle className="w-4 h-4" />
                       </div>
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-text-gray">Assistente</p>
                          <p className="text-xs font-bold text-soft-black">Info+Saúde</p>
                       </div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }}
                      className="p-2 hover:bg-soft-gray rounded-xl transition-colors"
                    >
                      <X className="w-4 h-4 text-soft-black" />
                    </button>
                  </div>

                  <div className="flex-1 relative bg-black flex items-center justify-center">
                    {!showYoutube ? (
                      <div className="w-full h-full relative">
                        <iframe
                          src="https://www.youtube.com/embed/5eYmDcpHnNU?autoplay=1&rel=0&modestbranding=1"
                          title="YouTube video player 1"
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setShowYoutube(true); }}
                          className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full transition-all flex items-center gap-1"
                        >
                          Próximo Vídeo
                        </button>
                      </div>
                    ) : (
                      <iframe
                        src="https://www.youtube.com/embed/ItFMhgATfn4?autoplay=1&rel=0&modestbranding=1"
                        title="YouTube video player 2"
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    )}
                  </div>

                  <div className="p-4 bg-white">
                     <p className="text-[11px] text-text-gray font-medium leading-relaxed">
                        {!showYoutube ? 'Oi! Assista nossa introdução rápida.' : 'Veja como transformamos sua segurança médica.'}
                     </p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Tooltip when minimized */}
            {isMinimized && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-xl shadow-lg border border-black/5 whitespace-nowrap hidden md:block"
              >
                <p className="text-xs font-bold text-soft-black">Oi! Tem um minuto?</p>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
