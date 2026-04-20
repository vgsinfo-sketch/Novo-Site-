import { motion } from 'motion/react';
import { ArrowRight, QrCode, Cpu } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero = ({ onOpenContact }: HeroProps) => {
  return (
    <section className="relative min-h-screen pt-24 md:pt-32 pb-20 px-6 md:px-[60px] overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-10 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start"
        >
          <h1 className="text-soft-black max-w-2xl">
            Seus dados de saúde <br />
            <span className="text-gradient">sempre acessíveis.</span>
          </h1>
          
          <p className="text-base md:text-lg text-text-gray max-w-[440px] leading-relaxed">
            Tecnologia inteligente para emergências e cuidado contínuo. A sua identidade médica em um único toque.
          </p>
          
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
            <a href="#perfil" className="px-8 py-3.5 bg-brand-accent text-white rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-brand-accent/20 cursor-pointer text-sm flex items-center justify-center">
              Consultar ID
            </a>
            <a href="#planos" className="px-8 py-3.5 border-2 border-brand-primary text-brand-primary rounded-xl font-bold hover:bg-brand-primary hover:text-white transition-all cursor-pointer text-sm flex items-center justify-center">
              Ver Planos
            </a>
          </div>

          <div className="pt-4 flex flex-col items-center lg:items-start">
             <span className="text-[12px] uppercase tracking-[1px] text-text-gray font-semibold">Mais Popular</span>
             <div className="font-bold text-xl mt-1 text-soft-black">Plano Premium</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative perspective-1000 flex items-center justify-center min-h-[400px] md:h-[480px] w-full"
        >
          {/* Health Card with specific rotation from theme */}
          <div className="health-card relative z-20 w-[300px] h-[185px] md:w-[340px] md:h-[210px] gradient-brand rounded-[20px] p-5 md:p-6 text-white shadow-card overflow-hidden group hover:scale-[1.05] transition-transform duration-500" style={{ transform: 'perspective(1000px) rotateY(-15deg) rotateX(5deg)' }}>
            <div className="flex justify-between items-start mb-4 md:mb-6">
              <div className="w-[40px] md:w-[45px] h-[30px] md:h-[35px] bg-white/20 rounded-md" />
              <Cpu className="w-6 h-6 md:w-8 md:h-8 opacity-60" />
            </div>

            <div className="font-mono text-base md:text-[18px] tracking-[2px] mb-6 md:mb-8">•••• •••• •••• 8824</div>

            <div className="flex justify-between items-end">
               <div>
                  <div className="text-[8px] md:text-[10px] uppercase opacity-80 mb-0.5">Titular</div>
                  <div className="font-semibold text-sm md:text-base uppercase">Maria Silva</div>
               </div>
               <div className="w-[50px] md:w-[60px] h-[50px] md:h-[60px] bg-white rounded-lg p-1 md:p-1.5 grid grid-cols-3 gap-[2px]">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="bg-black rounded-[1px]" />
                  ))}
               </div>
            </div>
          </div>

          {/* Floating Badges from theme */}
          <div className="floating-badge glass absolute top-0 md:top-[60px] -right-2 md:right-[20px] px-4 md:px-6 py-3 md:py-4 rounded-[16px] md:rounded-[20px] shadow-soft flex items-center gap-2 md:gap-3 z-30 scale-90 md:scale-100">
            <div className="w-8 h-8 rounded-lg bg-brand-accent/10 text-brand-accent flex items-center justify-center font-bold">✓</div>
            <div>
              <div className="font-bold text-xs md:text-sm">NFC Integrado</div>
              <div className="text-text-gray text-[10px] md:text-[12px]">Acesso por aproximação</div>
            </div>
          </div>

          <div className="floating-badge glass absolute bottom-0 md:bottom-[60px] -left-2 md:left-0 px-4 md:px-6 py-3 md:py-4 rounded-[16px] md:rounded-[20px] shadow-soft flex items-center gap-2 md:gap-3 z-30 scale-90 md:scale-100">
            <div className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold">!</div>
            <div>
              <div className="font-bold text-xs md:text-sm">Emergência 24h</div>
              <div className="text-text-gray text-[10px] md:text-[12px]">Suporte imediato SAMU</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
