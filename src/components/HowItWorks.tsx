import { Paintbrush, TestTube, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: <Paintbrush className="w-10 h-10 text-[#006666]" />,
    title: "Build Visually",
    description: "Use a simple, drag-and-drop interface to blend structured chatbot interactions with intelligent agent-based routing."
  },
  {
    icon: <TestTube className="w-10 h-10 text-[#006666]" />,
    title: "Test Rapidly",
    description: "Quickly iterate chatbot interactions using the built-in emulator to ensure high-quality user experiences."
  },
  {
    icon: <Share2 className="w-10 h-10 text-[#006666]" />,
    title: "Deploy Everywhere",
    description: "Easily deploy chatbots securely across multiple platforms like Slack, Teams, and web."
  }
];

export default function HowItWorks() {
  return (
    <div id="how-it-works" className="py-32 min-h-screen bg-[#FFFCF7] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-24 text-gray-900">How Dialogtuple Works</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.1, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-[#006666] p-8 rounded-xl shadow-enterprise hover:shadow-enterprise-lg transition-all duration-500"
            >
              <motion.div 
                initial={{ opacity: 1, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.2 }}
                className="w-20 h-20 mx-auto bg-white rounded-2xl flex items-center justify-center mb-8"
              >
                {step.icon}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.2 }}
              >
                <h3 className="text-2xl font-semibold mb-4 text-center text-white">{step.title}</h3>
                <p className="text-white text-center text-lg leading-relaxed">{step.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}