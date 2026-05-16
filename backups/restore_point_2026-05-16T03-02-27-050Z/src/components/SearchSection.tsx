import { useState } from 'react';
import { motion } from 'motion/react';
import { Search as SearchIcon, ArrowRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const SearchSection = () => {
  const [id, setId] = useState('');

  const handleSearch = () => {
    if (id.trim()) {
      window.open(`https://appinfosaude.com.br/#/public-profile/${id.trim()}`, '_blank');
    }
  };

  return (
    <section id="perfil" className="py-24 px-6 md:px-[60px] bg-soft-gray relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="bg-white rounded-[24px] p-6 md:p-12 shadow-soft flex flex-col md:flex-row items-center gap-10 relative z-10 border border-black/5"
        >
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h2 className="text-[36px] font-bold text-soft-black">Acesse seu Perfil</h2>
            <p className="text-text-gray text-lg leading-relaxed">
              Digite seu ID único para visualizar seus dados médicos completos e histórico.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/5 text-brand-primary rounded-full text-sm font-medium border border-brand-primary/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                </span>
                Visitante? Use o ID de demonstração: <strong className="ml-1 cursor-pointer hover:underline" onClick={() => setId('TEST123')}>TEST123</strong>
              </span>
            </div>
          </div>
          
          <div className="search-box bg-white p-2 rounded-2xl flex items-center shadow-soft border border-black/5 w-full md:w-[480px]">
             <input
               type="text"
               value={id}
               onChange={(e) => setId(e.target.value)}
               placeholder="Digite seu ID de saúde..."
               className="flex-1 px-5 py-3 border-none outline-none text-base text-soft-black placeholder-gray-400"
               onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
             />
             <button
               onClick={handleSearch}
               disabled={!id.trim()}
               className={cn(
                 "px-7 py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-2",
                 id.trim() 
                  ? "gradient-brand text-white shadow-lg shadow-brand-primary/20 hover:scale-[1.02] cursor-pointer" 
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
               )}
             >
               Acessar Perfil
               <ArrowRight className="w-4 h-4" />
             </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative background element */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[80px]" />
    </section>
  );
};
