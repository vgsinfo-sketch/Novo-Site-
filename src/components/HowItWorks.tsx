import { motion } from 'motion/react';
import { UserPlus, Layers, Zap, ShieldCheck } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const steps = [
  {
    icon: <UserPlus className="w-5 h-5" />,
    title: "Cadastro Simples",
    description: "Crie sua conta e preencha seus dados de saúde básicos em minutos.",
    color: "bg-blue-500/10 text-blue-600"
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: "Integração Total",
    description: "Conecte seus dispositivos e centralize seus exames e prescrições.",
    color: "bg-purple-500/10 text-purple-600"
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Acesso em Emergência",
    description: "Em caso de necessidade, socorristas acessam seus dados via QR/NFC.",
    color: "bg-amber-500/10 text-amber-600"
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Segurança 100%",
    description: "Criptografia de ponta a ponta para proteger cada byte dos seus dados.",
    color: "bg-emerald-500/10 text-emerald-600"
  }
];

export const HowItWorks = () => {
  return (
    <section id="solucoes" className="py-24 px-6 md:px-[60px] bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-soft-black">Por que escolher o <span className="text-gradient">Info+Saúde</span>?</h2>
          <p className="text-text-gray max-w-xl mx-auto text-lg leading-relaxed">
            Combinamos tecnologia de ponta com um design intuitivo para garantir que sua saúde esteja sempre protegida.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col gap-6 p-8 rounded-[32px] bg-soft-gray/30 border border-black/[0.03] hover:bg-white hover:shadow-soft hover:scale-[1.02] transition-all duration-500 group"
            >
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500",
                step.color
              )}>
                {step.icon}
              </div>
              
              <div className="space-y-3">
                <h3 className="font-bold text-xl text-soft-black">
                  {step.title}
                </h3>
                <p className="text-[15px] text-text-gray leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
