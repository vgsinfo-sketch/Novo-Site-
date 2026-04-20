import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, QrCode, UserPlus, ClipboardCheck, CheckCircle, ArrowRight, Play, X, PlusCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const activationSteps = [
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "1. Receba seu cartão em casa",
    description: "Após escolher o seu plano, você receberá seu cartão Info+Saúde no endereço informado."
  },
  {
    icon: <QrCode className="w-6 h-6" />,
    title: "2. Acesse o site ou utilize o QR Code",
    description: "Use o QR Code que veio junto com o seu cartão ou acesse o site indicado."
  },
  {
    icon: <UserPlus className="w-6 h-6" />,
    title: "3. Informe seus dados iniciais",
    description: "Digite o seu CPF e o número de identificação (ID) do cartão."
  },
  {
    icon: <ClipboardCheck className="w-6 h-6" />,
    title: "4. Complete seu cadastro",
    description: "Acesse seus dados e finalize o preenchimento das informações."
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "5. Pronto! Cartão ativado",
    description: "Seu Info+Saúde já está ativo e pronto para uso."
  }
];

export const ActivationSteps = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="py-24 px-6 md:px-[60px] bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-soft-black">Como ativar seu cartão <span className="text-gradient">Info+Saúde</span></h2>
          <p className="text-text-gray max-w-2xl mx-auto">Siga o passo a passo simples para habilitar sua identidade médica e começar a usar todos os benefícios.</p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-gray-100 -z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 relative z-10">
            {activationSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center space-y-6 group"
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl gradient-brand flex items-center justify-center text-white shadow-lg shadow-brand-primary/20 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    {step.icon}
                  </div>
                  {index < activationSteps.length - 1 && (
                    <div className="hidden md:block lg:hidden absolute top-10 -right-8 text-gray-200">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-bold text-lg text-soft-black leading-tight px-2">
                    {step.title.split('. ')[1]}
                  </h3>
                  <div className="w-8 h-1 bg-brand-accent/30 mx-auto rounded-full group-hover:w-16 transition-all duration-500" />
                  <p className="text-[14px] text-text-gray leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 glass rounded-[32px] border border-black/5 flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
              <PlusCircle className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <p className="font-bold text-xl text-soft-black">Dúvidas sobre a ativação?</p>
              <p className="text-text-gray leading-relaxed max-w-md">
                Assista ao nosso vídeo tutorial passo a passo para tirar todas as suas dúvidas.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <button 
              onClick={() => setShowVideo(true)}
              className="flex-1 lg:flex-none px-12 py-4 bg-brand-accent text-white rounded-2xl font-bold hover:scale-105 transition-transform text-sm cursor-pointer shadow-lg shadow-brand-accent/20 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              Ver Tutorial
            </button>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Tutorial de Ativação Info+Saúde"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
