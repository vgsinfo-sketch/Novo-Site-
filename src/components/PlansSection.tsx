import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const plans = [
  {
    name: "Plano Legal",
    price: "R$ 49,99",
    period: "/ano",
    setup: null,
    features: ["Perfil Básico", "QR Code de Emergência", "Acesso via App", "Validade de 1 ano"],
    isPopular: false
  },
  {
    name: "Plano Premium Individual",
    price: "R$ 39,90",
    period: "/mês",
    setup: "R$ 49,99 adesão",
    features: [
      "MORTE ACIDENTAL — R$ 10.000,00",
      "ASSISTÊNCIA PSICOLÓGICA, SOCIAL E NUTRICIONAL (NR01)",
      "CESTA BÁSICA EM MORTE — R$ 4.800,00 (12x R$ 400)",
      "TELECONSULTA — ORIENTAÇÃO MÉDICA",
      "ASSISTÊNCIA FUNERAL TITULAR — R$ 7.000,00",
      "REDE DE ATENDIMENTO QUALIFICADA E HUMANIZADA"
    ],
    isPopular: true
  },
  {
    name: "Plano Família",
    price: "R$ 79,99",
    period: "/mês",
    setup: "R$ 99,99 adesão",
    features: [
      "Atende até 3 membros da família",
      "MORTE ACIDENTAL — R$ 10.000,00",
      "ASSISTÊNCIA PSICOLÓGICA, SOCIAL E NUTRICIONAL",
      "CESTA BÁSICA EM MORTE — R$ 4.800,00",
      "TELECONSULTA — ORIENTAÇÃO MÉDICA",
      "ASSISTÊNCIA FUNERAL TITULAR — R$ 7.000,00",
      "CURSO ONLINE MENSAL de qualificação profissional"
    ],
    isPopular: false
  }
];

interface PlansSectionProps {
  onOpenCheckout: (planName: string) => void;
}

export const PlansSection = ({ onOpenCheckout }: PlansSectionProps) => {
  return (
    <section id="planos" className="py-24 px-6 md:px-[60px] bg-soft-gray">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-soft-black">Escolha seu Plano</h2>
          <p className="text-text-gray">Flexibilidade para você e sua família com benefícios exclusivos.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 min-h-[600px]">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className={cn(
                "relative p-8 md:p-10 rounded-[40px] transition-all duration-300 flex flex-col h-full",
                plan.isPopular 
                  ? "gradient-brand text-white shadow-2xl scale-105 z-10" 
                  : "bg-white text-soft-black border border-black/[0.03] hover:shadow-soft"
              )}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-brand-primary px-5 py-1.5 rounded-full text-[10px] font-black tracking-[2px] uppercase shadow-lg">
                  Mais Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className={cn("text-xs font-medium", plan.isPopular ? "text-white/70" : "text-text-gray")}>{plan.period}</span>
                  </div>
                  {plan.setup && (
                    <div className={cn("text-[13px] font-semibold", plan.isPopular ? "text-white/80" : "text-brand-primary")}>
                      + {plan.setup}
                    </div>
                  )}
                  {plan.name.includes("Premium") && (
                    <div className={cn("text-[10px] mt-1 font-bold tracking-tight uppercase", plan.isPopular ? "text-white/60" : "text-text-gray")}>
                      CNPJ 056400380001/42<br />
                      Registro: INPI 850260197908
                    </div>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <div className="mt-1">
                      <Check className={cn("w-4 h-4 shrink-0", plan.isPopular ? "text-white" : "text-brand-accent")} />
                    </div>
                    <span className={cn("text-[13px] font-medium leading-tight", plan.isPopular ? "text-white/90" : "text-text-gray")}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => onOpenCheckout(plan.name)}
                className={cn(
                "w-full py-4 rounded-2xl font-bold transition-all hover:scale-[1.03] cursor-pointer text-sm shadow-lg",
                plan.isPopular 
                  ? "bg-white text-brand-primary shadow-white/10" 
                  : "bg-soft-black text-white hover:bg-brand-primary"
              )}>
                Contratar Agora
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
