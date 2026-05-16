import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  onOpenContact: () => void;
}

export const CTASection = ({ onOpenContact }: CTASectionProps) => {
  return (
    <section className="py-24 md:py-32 px-6 md:px-[60px]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="gradient-brand rounded-[32px] md:rounded-[40px] p-8 md:p-24 text-center text-white relative overflow-hidden shadow-2xl"
        >
          {/* Decorative glass circles */}
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 md:w-96 h-64 md:h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-64 md:w-96 h-64 md:h-96 bg-brand-accent/20 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6 md:space-y-8">
            <h2 className="text-3xl md:text-6xl font-bold leading-tight">Proteja quem você ama hoje.</h2>
            <p className="text-lg md:text-xl text-white/80">Junte-se a milhares de pessoas que já transformaram seu cuidado com a saúde.</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <button 
                 onClick={onOpenContact}
                 className="px-10 py-5 bg-white text-brand-primary rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl cursor-pointer"
               >
                  Começar agora
               </button>
               <a 
                 href="#perfil"
                 className="px-10 py-5 bg-transparent border-2 border-white/30 hover:border-white text-white rounded-full font-bold text-lg transition-all cursor-pointer inline-flex items-center justify-center"
               >
                  Consultar ID
               </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
