import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setSuccess(true);
    } catch (error) {
      console.error("Erro ao salvar contato:", error);
      alert("Erro ao enviar mensagem. Tente novamente.");
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
              <h2 className="text-3xl font-bold text-soft-black">Mensagem Enviada!</h2>
              <p className="text-text-gray">Seu contato foi recebido com sucesso. Nossa equipe retornará em breve.</p>
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
                  <h2 className="text-2xl font-bold text-soft-black">Vamos Conversar</h2>
                  <p className="text-text-gray text-sm">Fale com um consultor especialista.</p>
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
                  <label className="text-xs font-bold uppercase tracking-wider text-text-gray">Nome</label>
                  <input 
                    required
                    type="text"
                    className="w-full px-4 py-3 bg-soft-gray rounded-xl border-none outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
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
                  <label className="text-xs font-bold uppercase tracking-wider text-text-gray">Mensagem</label>
                  <textarea 
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-soft-gray rounded-xl border-none outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-medium resize-none"
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
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
                      Enviar Mensagem
                      <Send className="w-4 h-4" />
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
