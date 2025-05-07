import { Puzzle as PuzzlePiece, Box, Repeat, Smartphone, BookOpen, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <PuzzlePiece className="w-10 h-10 text-[#006666]" />,
    title: "Multi-Agent Architecture",
    description: "Combine multiple specialized AI agents seamlessly for superior accuracy and intelligent routing."
  },
  {
    icon: <Box className="w-10 h-10 text-[#006666]" />,
    title: "Out-of-the-Box Integrations",
    description: "Easily integrate with your existing enterprise tools, platforms, and systems."
  },
  {
    icon: <Repeat className="w-10 h-10 text-[#006666]" />,
    title: "50+ Supported LLM Providers",
    description: "Access diverse models from OpenAI, Anthropic, Google, Meta, and more without vendor lock-in."
  },
  {
    icon: <Smartphone className="w-10 h-10 text-[#006666]" />,
    title: "Direct Multi-Platform Deployment",
    description: "Instantly deploy your chatbots to Slack, Microsoft Teams, web, and other popular channels."
  },
  {
    icon: <BookOpen className="w-10 h-10 text-[#006666]" />,
    title: "Model Context Protocol",
    description: "A standardized protocol enabling AI models to interact with external data sources and tools in a structured way, simplifying integrations while enhancing security and scalability."
  },
  {
    icon: <Zap className="w-10 h-10 text-[#006666]" />,
    title: "Real-Time Decision Orchestration",
    description: "Coordinate AI agent behaviors dynamically using contextual signals and user inputs for responsive, adaptive experiences."
  }
];

export default function Features() {
  return (
    <div id="features" className="py-32  bg-[#edf6f9] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-24 text-gray-900">Core Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.1, delay: index * 0.1 }}
              className="text-center h-[400px] flex flex-col items-center"
            >
              <motion.div 
                initial={{ opacity: 1, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-enterprise border-2 border-[#006666]"
              >
                {feature.icon}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.2 }}
                className="bg-white p-8 rounded-2xl border-2 border-[#006666] shadow-lg group-hover:shadow-xl transition-all duration-300 mt-8 h-full w-full flex flex-col"
              >
                <h3 className="text-2xl font-semibold mb-4 text-[#006666]">{feature.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}