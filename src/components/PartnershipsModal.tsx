import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Building2, MapPin } from 'lucide-react';

interface PartnershipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const partners = [
  {
    name: "Consultório Dr Dilson Drumond",
    address: "R. Abílio José de Mattos, 862 - Porto da Pedra, São Gonçalo - RJ, 24436-225"
  },
  {
    name: "Clinica Itaipu",
    address: "Estr. Francisco da Cruz Nunes, 6748 - Itaipu, Niterói - RJ, 24340-000"
  },
  {
    name: "Hospital CHN",
    address: "Tv. Lasalle, 12 - Centro, Niterói - RJ, 24020-096"
  },
  {
    name: "Laboratório Cluecells",
    address: "Travessa Padre Marchet, 36 - Zé Garoto, São Gonçalo - RJ CEP: 24.440-24"
  },
  {
    name: "Laboratório Dallier",
    address: "Rua Sá Carvalho, 20 - Centro, São Gonçalo - RJ (CEP: 24440-710)"
  }
];

export const PartnershipsModal = ({ isOpen, onClose }: PartnershipsModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="relative h-32 gradient-brand flex items-end p-8">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                id="close-partnerships-modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-primary shadow-lg">
                  <Building2 className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-white">Nossos Convênios</h2>
              </div>
            </div>

            <div className="p-8">
              <p className="text-gray-600 mb-8 leading-relaxed">
                A <strong>Info+Saúde</strong> trabalha em conjunto com as melhores instituições de saúde da região para garantir que você tenha acesso a um atendimento de qualidade com todos os benefícios da nossa plataforma. Conheça nossos parceiros:
              </p>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {partners.map((partner, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-2xl border border-gray-100 hover:border-brand-primary/20 hover:bg-brand-primary/5 transition-all group"
                  >
                    <h3 className="font-bold text-soft-black mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-secondary group-hover:scale-125 transition-transform" />
                      {partner.name}
                    </h3>
                    <div className="flex items-start gap-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-brand-primary" />
                      <span>{partner.address}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={onClose}
                  className="w-full py-4 gradient-brand text-white font-bold rounded-2xl shadow-lg shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  id="understand-partnerships-btn"
                >
                  Entendido
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
