import { motion } from 'motion/react';

export const VideoSection = () => {
  return (
    <section id="sobre" className="py-24 px-6 md:px-[60px] bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex justify-between items-end">
           <div className="space-y-4 text-center md:text-left w-full">
              <h2 className="text-4xl font-bold text-soft-black">Ainda com dúvidas ?</h2>
              <p className="text-text-gray max-w-xl mx-auto md:mx-0">Assista ao vídeo abaixo e veja como o Info+Saúde pode transformar sua segurança médica.</p>
           </div>
        </div>

        <div className="relative max-w-5xl mx-auto">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="relative aspect-video w-full rounded-[32px] overflow-hidden shadow-card border border-black/5 bg-soft-gray"
           >
              <iframe
                src="https://www.youtube.com/embed/sR5JIG8MJlk"
                title="Ainda com dúvidas ? - Info+Saúde"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
           </motion.div>
        </div>
      </div>
    </section>
  );
};
