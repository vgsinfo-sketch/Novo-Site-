import React, { useState } from 'react';
import { Smartphone, Instagram, Linkedin, Twitter, Lock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';

interface FooterProps {
  onOpenPartner: () => void;
}

export const Footer = ({ onOpenPartner }: FooterProps) => {
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
                href="https://appinfosaude.com.br/#/admin-login" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-white transition-colors cursor-pointer"
              >
                Portal Admin
              </a>
              <a 
                href="https://appinfosaude.com.br/#/admin-login" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-white transition-colors cursor-pointer"
              >
                Área Administrativa
              </a>
           </div>
        </div>
      </div>

    </footer>
  );
};
