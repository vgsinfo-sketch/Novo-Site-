import React, { useState } from 'react';
import { Smartphone, Instagram, Linkedin, Twitter, Lock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';

interface FooterProps {
  onOpenPartner: () => void;
}

export const Footer = ({ onOpenPartner }: FooterProps) => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin0102@') {
      window.open('https://info-saude-gamma.vercel.app/#/master-admin', '_blank');
      setIsAdminOpen(false);
      setUsername('');
      setPassword('');
      setError('');
    } else {
      setError('Credenciais incorretas');
    }
  };

  return (
    <footer className="bg-soft-black text-white py-20 px-6 md:px-[60px] relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 lg:col-span-2 space-y-6">
            <Logo variant="light" />
            <p className="text-gray-400 max-w-sm">Tecnologia avançada para gestão de saúde e segurança em emergências. Sua vida, seus dados, protegidos.</p>
            <div className="flex gap-4">
               {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                 <a key={i} href="#" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:bg-white hover:text-soft-black transition-all">
                    <Icon className="w-5 h-5" />
                 </a>
               ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold uppercase text-xs tracking-widest text-gray-500">Produto</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#solucoes" className="hover:text-white">Soluções</a></li>
              <li><a href="#planos" className="hover:text-white">Planos</a></li>
              <li><a href="#seguranca" className="hover:text-white">Segurança</a></li>
              <li><a href="#perfil" className="hover:text-white">Consultar ID</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold uppercase text-xs tracking-widest text-gray-500">Empresa</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#sobre" className="hover:text-white">Sobre nós</a></li>
              <li><a href="#" className="hover:text-white">Carreiras</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Imprensa</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold uppercase text-xs tracking-widest text-gray-500">Contato</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="tel:+5521972304227" className="hover:text-white">(21) 97230-4227</a></li>
              <li><a href="mailto:contato@infosaude.com" className="hover:text-white">contato@infosaude.com</a></li>
              <li>Rio de Janeiro, Brasil</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
           <p>© 2026 Info+Saúde Ltda. Todos os direitos reservados.</p>
           <div className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4">
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
              <button 
                onClick={onOpenPartner}
                className="text-gray-700 hover:text-brand-primary transition-colors cursor-pointer"
              >
                Seja um Parceiro
              </button>
              <a 
                href="#admin" 
                className="text-gray-700 hover:text-white transition-colors"
              >
                Portal Admin
              </a>
              <button 
                onClick={() => setIsAdminOpen(true)}
                className="text-gray-700 hover:text-white transition-colors cursor-pointer"
              >
                Área Administrativa
              </button>
           </div>
        </div>
      </div>

      {/* Admin Login Modal */}
      <AnimatePresence>
        {isAdminOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdminOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-sm rounded-[32px] overflow-hidden"
            >
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-soft-black">
                    <Lock className="w-5 h-5 text-brand-primary" />
                    <h3 className="font-bold text-xl">Acesso Restrito</h3>
                  </div>
                  <button 
                    onClick={() => setIsAdminOpen(false)}
                    className="p-2 hover:bg-soft-gray rounded-full text-text-gray"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-text-gray">Usuário</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-5 py-4 bg-soft-gray rounded-2xl border-none outline-none text-soft-black font-semibold"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-text-gray">Senha</label>
                    <input 
                      type="password" 
                      required
                      className="w-full px-5 py-4 bg-soft-gray rounded-2xl border-none outline-none text-soft-black font-semibold"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                  
                  {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}

                  <button className="w-full py-4 gradient-brand text-white rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all">
                    Acessar Master Admin
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};
