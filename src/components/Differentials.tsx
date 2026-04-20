import { motion } from 'motion/react';
import { ShieldCheck, QrCode, Zap, Lock } from 'lucide-react';

const items = [
  { icon: <Zap className="text-brand-accent h-6 w-6" />, text: "Acesso imediato" },
  { icon: <QrCode className="text-brand-primary h-6 w-6" />, text: "QR Code inteligente" },
  { icon: <Smartphone className="text-brand-primary h-6 w-6" />, text: "NFC integrado" },
  { icon: <Lock className="text-brand-accent h-6 w-6" />, text: "Segurança total" }
];

import { Smartphone } from 'lucide-react';

export const Differentials = () => {
  return (
    <section id="seguranca" className="py-24 px-6 md:px-[60px] relative overflow-hidden bg-brand-primary/5">
       <div className="absolute top-0 left-0 w-full h-full bg-[url('https://picsum.photos/seed/medical/1920/1080?blur=10')] bg-cover bg-center opacity-10" />
       
       <div className="max-w-7xl mx-auto relative z-10">
         <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-soft-black mb-4">Diferenciais Info Saúde</h2>
            <p className="text-text-gray">Tecnologia de ponta para sua segurança médica.</p>
         </div>

         <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass p-8 rounded-2xl flex flex-col items-center text-center gap-4 hover:bg-white/90 transition-all duration-500 shadow-soft"
              >
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-soft">
                   {item.icon}
                </div>
                <span className="font-bold text-soft-black text-lg">{item.text}</span>
              </motion.div>
            ))}
         </div>
       </div>
    </section>
  );
};
