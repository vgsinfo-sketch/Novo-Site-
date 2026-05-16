import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Loader2, Search } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { cn } from '@/src/lib/utils';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
}

export const CheckoutModal = ({ isOpen, onClose, planName }: CheckoutModalProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    cpf: '',
    zipCode: '',
    address: '',
    neighborhood: '',
    city: '',
    complement: '',
    paymentMethod: 'pix' as 'pix' | 'debito' | 'credito'
  });

  const handleCepSearch = async () => {
    const cep = formData.zipCode.replace(/\D/g, '');
    if (cep.length !== 8) return;

    try {
      setLoading(true);
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      if (!data.erro) {
        setFormData(prev => ({
          ...prev,
          address: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'orders'), {
        ...formData,
        planName,
        createdAt: serverTimestamp()
      });
      setSuccess(true);
    } catch (error) {
      console.error("Erro ao salvar pedido:", error);
      alert("Erro ao processar sua solicitação. Tente novamente.");
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
          className="relative bg-white w-full max-w-xl rounded-[32px] overflow-hidden shadow-2xl"
        >
          {success ? (
            <div className="p-12 text-center space-y-6">
              <div className="w-20 h-20 bg-brand-accent/10 text-brand-accent rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold text-soft-black">Pedido Recebido!</h2>
              <p className="text-text-gray">Seu cadastro para o <strong>{planName}</strong> foi processado com sucesso. Entraremos em contato em breve.</p>
              <button 
                onClick={onClose}
                className="w-full py-4 bg-brand-primary text-white rounded-2xl font-bold hover:scale-[1.02] transition-transform"
              >
                Fechar
              </button>
            </div>
          ) : (
            <>
              <div className="p-6 md:p-8 border-b border-black/5 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-soft-black">Contratar {planName}</h2>
                  <p className="text-text-gray text-sm">Preencha seus dados para finalizar a adesão.</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-soft-gray rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-gray">Nome Completo</label>
                    <input 
                      required
                      type="text"
                      className="w-full px-4 py-3 bg-soft-gray rounded-xl border-none outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
                      value={formData.fullName}
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-gray">Telefone</label>
                    <input 
                      required
                      type="tel"
                      className="w-full px-4 py-3 bg-soft-gray rounded-xl border-none outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-text-gray">CPF</label>
                  <input 
                    required
                    type="text"
                    className="w-full px-4 py-3 bg-soft-gray rounded-xl border-none outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
                    value={formData.cpf}
                    onChange={e => setFormData({...formData, cpf: e.target.value})}
                    placeholder="000.000.000-00"
                  />
                </div>

                {/* Address */}
                <div className="space-y-4 pt-4 border-t border-black/5">
                  <h3 className="font-bold text-soft-black">Endereço de Cobrança</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1 space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-text-gray">CEP</label>
                      <div className="relative">
                        <input 
                          required
                          type="text"
                          className="w-full px-4 py-3 bg-soft-gray rounded-xl border-none outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
                          value={formData.zipCode}
                          onChange={e => setFormData({...formData, zipCode: e.target.value})}
                          onBlur={handleCepSearch}
                          placeholder="00000-000"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-text-gray">Logradouro / Endereço</label>
                      <input 
                        required
                        type="text"
                        className="w-full px-4 py-3 bg-soft-gray rounded-xl border-none outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
                        value={formData.address}
                        onChange={e => setFormData({...formData, address: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-text-gray">Bairro</label>
                      <input 
                        required
                        type="text"
                        className="w-full px-4 py-3 bg-soft-gray rounded-xl border-none outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
                        value={formData.neighborhood}
                        onChange={e => setFormData({...formData, neighborhood: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-text-gray">Cidade</label>
                      <input 
                        required
                        type="text"
                        className="w-full px-4 py-3 bg-soft-gray rounded-xl border-none outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
                        value={formData.city}
                        onChange={e => setFormData({...formData, city: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-text-gray">Complemento</label>
                    <input 
                      type="text"
                      className="w-full px-4 py-3 bg-soft-gray rounded-xl border-none outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
                      value={formData.complement}
                      onChange={e => setFormData({...formData, complement: e.target.value})}
                      placeholder="Apto, Bloco, Referência..."
                    />
                  </div>
                </div>

                {/* Payment */}
                <div className="space-y-4 pt-4 border-t border-black/5">
                  <h3 className="font-bold text-soft-black">Método de Pagamento</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {['pix', 'debito', 'credito'].map(method => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setFormData({...formData, paymentMethod: method as any})}
                        className={cn(
                          "py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all border-2",
                          formData.paymentMethod === method 
                            ? "border-brand-primary bg-brand-primary/5 text-brand-primary" 
                            : "border-transparent bg-soft-gray text-text-gray hover:bg-gray-200"
                        )}
                      >
                        {method === 'pix' ? 'PIX' : method === 'debito' ? 'Débito' : 'Crédito'}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 gradient-brand text-white rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Confirmar Contratação"
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
