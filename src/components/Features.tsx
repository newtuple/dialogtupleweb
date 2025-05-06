import React from 'react';
import { Shield, Cloud, Rocket, Puzzle as PuzzlePiece, Box, Repeat, Smartphone, BookOpen, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <PuzzlePiece className="w-10 h-10 text-white" />,
    title: "Multi-Agent Architecture",
    description: "Combine multiple specialized AI agents seamlessly for superior accuracy and intelligent routing."
  },
  {
    icon: <Box className="w-10 h-10 text-white" />,
    title: "Out-of-the-Box Integrations",
    description: "Easily integrate with your existing enterprise tools, platforms, and systems."
  },
  {
    icon: <Repeat className="w-10 h-10 text-white" />,
    title: "50+ Supported LLM Providers",
    description: "Access diverse models from OpenAI, Anthropic, Google, Meta, and more without vendor lock-in."
  },
  {
    icon: <Smartphone className="w-10 h-10 text-white" />,
    title: "Direct Multi-Platform Deployment",
    description: "Instantly deploy your chatbots to Slack, Microsoft Teams, web, and other popular channels."
  },
  {
    icon: <BookOpen className="w-10 h-10 text-white" />,
    title: "Model Context Protocol",
    description: "A standardized protocol enabling AI models to interact with external data sources and tools in a structured way, simplifying integrations while enhancing security and scalability."
  },
  {
    icon: <Zap className="w-10 h-10 text-white" />,
    title: "Real-Time Decision Orchestration",
    description: "Coordinate AI agent behaviors dynamically using contextual signals and user inputs for responsive, adaptive experiences."
  }
];

export default function Features() {
  return (
    <div id="features" className="py-32 bg-white relative overflow-hidden scroll-mt-16">
      {/* AI-themed background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-[#00666610] to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-[#00666610] to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h2 className="text-5xl font-bold text-center mb-24 bg-clip-text text-transparent bg-gradient-to-r from-[#006666] to-[#008080]">Core Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.1, delay: index * 0.1 }}
              className="text-center group"
            >
              <motion.div 
                initial={{ opacity: 1, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-20 h-20 mx-auto bg-gradient-to-br from-[#006666] to-[#008080] rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:shadow-xl transition-all duration-300"
              >
                {feature.icon}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.2 }}
                className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-[#00666620] shadow-lg group-hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-2xl font-semibold mb-4 text-[#006666] group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#006666] group-hover:to-[#008080] transition-all duration-300">{feature.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}