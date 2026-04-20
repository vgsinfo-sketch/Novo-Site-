import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Handshake, Loader2, CheckCircle2 } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerModal = ({ isOpen, onClose }: PartnerModalProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    partnerType: 'vendedor',
    observations: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'partners'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setSuccess(true);
    } catch (error) {
      console.error("Erro ao salvar parceiro:", error);
      alert("Erro ao enviar solicitação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-soft-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl"
        >
          {success ? (
            <div className="p-12 text-center space-y-6">
              <div className="w-20 h-20 bg-brand-accent/10 text-brand-accent rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold text-soft-black">Solicitação Recebida!</h2>
              <p className="text-text-gray">Obrigado por seu interesse em ser nosso parceiro. Analisaremos sua proposta e entraremos em contato em breve.</p>
              <button 
                onClick={onClose}
                className="w-full py-4 bg-brand-primary text-white rounded-2xl font-bold hover:scale-[1.02] transition-transform"
              >
                Voltar ao Site
              </button>
            </div>
          ) : (
            <>
              <div className="p-6 md:p-8 border-b border-black/5 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-soft-black">Seja um Parceiro</h2>
                  <p className="text-text-gray text-sm">Cresça junto com a Info+Saúde.</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-soft-gray rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-gray">Nome Completo</label>
                  <input 
                    required
                    type="text"
                    className="w-full px-4 py-3 bg-soft-gray rounded-xl border-none outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium"
                    value={formData.fullName}
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-gray">Email</label>
                    <input 
                      required
                      type="email"
                      className="w-full px-4 py-3 bg-soft-gray rounded-xl border-none outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-gray">Telefone</label>
                    <input 
                      required
                      type="tel"
                      className="w-full px-4 py-3 bg-soft-gray rounded-xl border-none outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-gray">Tipo de Parceria</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {[
                      { id: 'vendedor', label: 'Vendedor' },
                      { id: 'distribuidor', label: 'Distribuidor' },
                      { id: 'ponto_de_venda', label: 'Ponto de Venda' }
                    ].map(type => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setFormData({...formData, partnerType: type.id})}
                        className={`py-3 px-2 rounded-xl text-xs font-bold transition-all border-2 ${
                          formData.partnerType === type.id 
                          ? 'border-brand-primary bg-brand-primary/5 text-brand-primary' 
                          : 'border-transparent bg-soft-gray text-text-gray hover:bg-gray-200'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-gray">Observações</label>
                  <textarea 
                    rows={4}
                    placeholder="Conte-nos um pouco sobre seu interesse..."
                    className="w-full px-4 py-3 bg-soft-gray rounded-xl border-none outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium resize-none"
                    value={formData.observations}
                    onChange={e => setFormData({...formData, observations: e.target.value})}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-soft-black text-white rounded-2xl font-bold text-lg hover:bg-brand-primary hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Solicitar Parceria
                      <Handshake className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
