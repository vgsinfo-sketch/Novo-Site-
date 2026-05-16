import { Plus, Activity } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export const Logo = ({ className, variant = 'dark' }: LogoProps) => {
  return (
    <a href="#" className={cn("flex items-center gap-2 group cursor-pointer", className)}>
      <div className="relative w-9 h-9 gradient-brand rounded-xl rounded-br-sm flex items-center justify-center overflow-hidden shadow-glow-green/20">
        <Plus className="absolute top-1 left-1.5 w-3.5 h-3.5 text-white/90" />
        <Activity className="w-5 h-5 text-white mt-1 ml-0.5" strokeWidth={2.5} />
      </div>
      <div className="flex items-baseline text-[24px] font-bold tracking-tight">
        <span className={cn(variant === 'dark' ? "text-soft-black" : "text-white")}>info</span>
        <span className="text-brand-accent">+saúde</span>
      </div>
    </a>
  );
};
