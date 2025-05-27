import React from 'react';
import { motion } from 'framer-motion';

export default function CTA() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  return (
    <div className="bg-gradient-to-br from-[#006666] via-[#007777] to-[#008888] py-32 relative overflow-hidden">
      {/* AI-themed background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute -top-1/2 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 right-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-5xl font-bold mb-8 text-white"
        >
          Ready to Transform Your Enterprise Conversations?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.2 }}
          className="text-2xl mb-16 text-white/90 max-w-4xl mx-auto leading-relaxed"
        >
          Experience the seamless blend of classic chatbot reliability and advanced AI intelligence with Dialogtuple today.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <button className="px-10 py-4 bg-white text-[#006666] rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-lg">
            Start Free Trial
          </button>
          <button className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105 text-lg group relative overflow-hidden">
            <span className="relative z-10">Request Demo</span>
            <div className="absolute inset-0 bg-white/10 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0"></div>
          </button>
        </motion.div>
      </div>
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}