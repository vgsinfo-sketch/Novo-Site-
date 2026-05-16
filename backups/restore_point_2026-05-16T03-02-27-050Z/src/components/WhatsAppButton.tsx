import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/5521972304227"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/30 cursor-pointer"
    >
      <MessageCircle className="w-8 h-8 fill-white" />
    </motion.a>
  );
};
