import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Logo } from './Logo';

interface NavbarProps {
  onOpenPartner: () => void;
}

export const Navbar = ({ onOpenPartner }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-[60px] h-[80px] flex items-center justify-between",
      scrolled ? "bg-white/80 backdrop-blur-md shadow-soft" : "bg-transparent"
    )}>
      <Logo />

      <div className="hidden md:flex items-center gap-8 font-medium text-sm text-text-gray">
        {[
          { label: 'Soluções', href: '#solucoes' },
          { label: 'Planos', href: '#planos' },
          { label: 'Segurança', href: '#seguranca' },
          { label: 'Sobre', href: '#sobre' }
        ].map((item) => (
          <a key={item.label} href={item.href} className="hover:text-soft-black transition-colors">
            {item.label}
          </a>
        ))}
        <button 
          onClick={onOpenPartner}
          className="hover:text-brand-primary transition-colors font-bold text-soft-black cursor-pointer"
        >
          Parceiros
        </button>
        <a 
          href="https://info-saude-gamma.vercel.app/#/login" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-brand-primary transition-colors font-bold text-soft-black"
        >
          Área do Cliente
        </a>
        <a href="#perfil" className="px-6 py-2.5 border-[1.5px] border-soft-black text-soft-black rounded-full text-sm font-semibold hover:bg-soft-black hover:text-white transition-all cursor-pointer text-center">
          Consultar ID
        </a>
      </div>

        <button 
          className="md:hidden text-soft-black cursor-pointer"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[60] p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
               <Logo />
               <button 
                 onClick={() => setMobileMenuOpen(false)}
                 className="p-2 bg-soft-gray rounded-full cursor-pointer"
               >
                 <X className="w-6 h-6" />
               </button>
            </div>

            <div className="flex flex-col gap-6">
               {[
                 { label: 'Soluções', href: '#solucoes' },
                 { label: 'Planos', href: '#planos' },
                 { label: 'Segurança', href: '#seguranca' },
                 { label: 'Sobre', href: '#sobre' }
               ].map((item, i) => (
                 <a 
                   key={item.label} 
                   href={item.href} 
                   className="text-3xl font-bold text-soft-black"
                   onClick={() => setMobileMenuOpen(false)}
                 >
                   {item.label}
                 </a>
               ))}
               <button 
                 onClick={() => { onOpenPartner(); setMobileMenuOpen(false); }}
                 className="text-3xl font-bold text-brand-primary text-left cursor-pointer"
               >
                 Parceiros
               </button>
            </div>

            <div className="mt-auto space-y-4">
               <a 
                 href="https://info-saude-gamma.vercel.app/#/login" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="w-full py-5 border-2 border-brand-primary text-brand-primary rounded-2xl font-bold text-xl cursor-pointer flex items-center justify-center bg-white"
               >
                 Área do Cliente
               </a>
               <a 
                 href="#perfil" 
                 onClick={() => setMobileMenuOpen(false)}
                 className="w-full py-5 bg-brand-primary text-white rounded-2xl font-bold text-xl cursor-pointer flex items-center justify-center"
               >
                 Acessar Perfil ID
               </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
