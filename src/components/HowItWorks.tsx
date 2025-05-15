import { Paintbrush, TestTube, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: <Paintbrush className="w-10 h-10 text-[#8b5cf6]" />,
    title: "Build Visually",
    description: "Use a simple, drag-and-drop interface to blend structured chatbot interactions with intelligent agent-based routing.",
    gif: "/gifs/workflow.gif"
  },
  {
    icon: <TestTube className="w-10 h-10 text-[#8b5cf6]" />,
    title: "Test Rapidly",
    description: "Quickly iterate chatbot interactions using the built-in emulator to ensure high-quality user experiences.",
    gif: "/gifs/test-rapidly.gif"
  },
  {
    icon: <Share2 className="w-10 h-10 text-[#8b5cf6]" />,
    title: "Deploy Everywhere",
    description: "Easily deploy chatbots securely across multiple platforms like Slack, Teams, and web.",
    gif: "/gifs/new-slack-1.gif"
  }
];

export default function HowItWorks() {
  return (
    <div id="how-it-works" className="py-20 min-h-screen bg-[#1a1b1e] scroll-mt-16 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.h2 
          className="text-4xl font-bold text-center mb-24 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
        >
          How Dialogtuple Works
        </motion.h2>
        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className={`flex items-center gap-16 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
            >
              {/* Content Side */}
              <motion.div 
                className="flex-1 p-8"
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="w-20 h-20 bg-[#2a2b2e]/60 rounded-2xl flex items-center justify-center mb-8 group">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {step.icon}
                  </motion.div>
                </div>
                <h3 className="text-3xl font-semibold mb-6 text-white">{step.title}</h3>
                <p className="text-gray-300 text-xl leading-relaxed">{step.description}</p>
              </motion.div>

              {/* GIF Side */}
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="relative aspect-video rounded-xl overflow-hidden bg-[#2a2b2e]/60 group">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6]/20 via-transparent to-[#8b5cf6]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <img 
                    src={step.gif} 
                    alt={`${step.title} demonstration`}
                    className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}