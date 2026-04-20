import { motion } from 'motion/react';

const testimonials = [
  {
    name: "Dr. Ricardo Santos",
    role: "Médico de Emergência",
    text: "O acesso imediato aos dados via QR Code salvou um tempo precioso em um atendimento crítico. Tecnologia essencial."
  },
  {
    name: "Ana Oliveira",
    role: "Usuária Premium",
    text: "Me sinto muito mais segura sabendo que qualquer pessoa que me socorrer saberá minhas alergias e medicamentos."
  },
  {
    name: "Carlos Ferreira",
    role: "Pai de Família",
    text: "Gerencio a saúde dos meus filhos em um só lugar. O plano família foi a melhor escolha que fizemos este ano."
  }
];

export const Testimonials = () => {
  return (
    <section className="py-24 px-6 md:px-[60px] bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-soft-black">O que dizem sobre nós</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
           {testimonials.map((t, idx) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ delay: idx * 0.2 }}
               viewport={{ once: true }}
               className="flex-1 p-8 rounded-2xl bg-soft-gray hover:bg-white hover:shadow-soft border border-transparent hover:border-black/5 transition-all duration-300 group"
             >
                <div className="mb-6">
                   <h4 className="font-bold text-soft-black text-lg">{t.name}</h4>
                   <p className="text-sm text-brand-primary font-medium">{t.role}</p>
                </div>
                <p className="text-text-gray italic leading-relaxed text-base">“{t.text}”</p>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};
