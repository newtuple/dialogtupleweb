import { Puzzle as PuzzlePiece, Box, Repeat, Smartphone, BookOpen, Zap } from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';

const features = [
  {
    icon: <PuzzlePiece className="w-10 h-10 text-[#8b5cf6]" />,
    title: "Multi-Agent Architecture",
    description: "Combine multiple specialized AI agents seamlessly for superior accuracy and intelligent routing."
  },
  {
    icon: <Box className="w-10 h-10 text-[#8b5cf6]" />,
    title: "Out-of-the-Box Integrations",
    description: "Easily integrate with your existing enterprise tools, platforms, and systems."
  },
  {
    icon: <Repeat className="w-10 h-10 text-[#8b5cf6]" />,
    title: "50+ Supported LLM Providers",
    description: "Access diverse models from OpenAI, Anthropic, Google, Meta, and more without vendor lock-in."
  },
  {
    icon: <Smartphone className="w-10 h-10 text-[#8b5cf6]" />,
    title: "Direct Multi-Platform Deployment",
    description: "Instantly deploy your chatbots to Slack, Microsoft Teams, web, and other popular channels."
  },
  {
    icon: <BookOpen className="w-10 h-10 text-[#8b5cf6]" />,
    title: "Model Context Protocol",
    description: "A standardized protocol enabling AI models to interact with external data sources and tools in a structured way, simplifying integrations while enhancing security and scalability."
  },
  {
    icon: <Zap className="w-10 h-10 text-[#8b5cf6]" />,
    title: "Real-Time Decision Orchestration",
    description: "Coordinate AI agent behaviors dynamically using contextual signals and user inputs for responsive, adaptive experiences."
  }
];

export default function Features() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 0.2 }
  };

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (index: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: index * 0.2,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    })
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div id="features" className="pt-10 pb-20 bg-[#1a1b1e] scroll-mt-16 relative overflow-hidden" ref={sectionRef}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.h2 
          className="text-4xl font-bold text-center mb-20 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Core Features
        </motion.h2>
        
        <motion.div 
          className="relative w-[600px] h-[600px] mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Center Circle with pulsing effect */}
          <motion.div 
            className="absolute z-50 left-[220px] top-[220px] w-40 h-40 rounded-full bg-black border-2 border-[#8b5cf6] shadow-[0_0_30px_rgba(139,92,246,0.3)] flex items-center justify-center overflow-hidden"
            animate={isInView ? { 
              scale: [1, 1.05, 1],
              opacity: 1,
            } : { scale: 0, opacity: 0 }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/2.png" 
                alt="Logo" 
                className="w-22 h-22 object-contain"
                style={{ filter: 'brightness(1.2) contrast(1.1)' }}
              />
            </div>
          </motion.div>

          {/* Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {features.map((_, index) => {
              const angle = (index * (360 / features.length)) * (Math.PI / 180);
              const radius = 200;
              const centerX = 300;
              const centerY = 300;
              const endX = Math.cos(angle) * radius + centerX;
              const endY = Math.sin(angle) * radius + centerY;

              return (
                <motion.line
                  key={`line-${index}`}
                  x1={centerX}
                  y1={centerY}
                  x2={endX}
                  y2={endY}
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  variants={lineVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              );
            })}
          </svg>

          {/* Feature Icons */}
          {features.map((feature, index) => {
            const angle = (index * (360 / features.length)) * (Math.PI / 180);
            const radius = 200;
            const left = Math.cos(angle) * radius + 300 - 50;
            const top = Math.sin(angle) * radius + 300 - 50;

            const getDisplayTitle = (title: string) => {
              switch(title) {
                case "Multi-Agent Architecture":
                  return "Multi-Agent\nArchitecture";
                case "Out-of-the-Box Integrations":
                  return "Out-of-the-Box\nIntegrations";
                case "50+ Supported LLM Providers":
                  return "50+ LLM\nProviders";
                case "Direct Multi-Platform Deployment":
                  return "Multi-Platform\nDeployment";
                case "Model Context Protocol":
                  return "Model Context\nProtocol";
                case "Real-Time Decision Orchestration":
                  return "Real-Time\nOrchestration";
                default:
                  return title;
              }
            };

            return (
              <motion.div 
                key={index} 
                className="absolute" 
                style={{ left, top }}
                variants={iconVariants}
                custom={index}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <motion.div
                  className="relative"
                  onMouseEnter={() => setActiveFeature(index)}
                  onMouseLeave={() => setActiveFeature(null)}
                >
                  <motion.div 
                    className="w-[110px] h-[110px] bg-[#1e1f23] rounded-2xl flex flex-col items-center justify-center shadow-lg border border-[#8b5cf6]/30 cursor-pointer transition-all duration-300 relative group hover:bg-[#2a2b2e]"
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-[#8b5cf6] rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    
                    <motion.div
                      className="flex flex-col items-center gap-4 px-2"
                    >
                      <div className="w-10 h-10 flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <div className="text-[14px] text-white/90 font-medium text-center leading-tight whitespace-pre">
                        {getDisplayTitle(feature.title)}
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Feature Card */}
                  <AnimatePresence>
                    {activeFeature === index && (
                      <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={`absolute z-10 bg-[#2a2b2e] p-6 rounded-2xl border border-[#8b5cf6]/30 shadow-lg w-80 transition-all duration-300 hover:bg-[#32333a] ${
                          index < 3 ? 'top-full' : 'bottom-full'
                        } ${
                          index === 0 || index === 5 ? 'left-0' :
                          index === 2 || index === 3 ? 'right-0' : 'left-1/2 -translate-x-1/2'
                        } mt-4 mb-4`}
                      >
                        <div className="relative">
                          {/* Card glow effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6]/5 via-transparent to-[#8b5cf6]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <h3 className="text-xl font-semibold mb-3 text-white relative">{feature.title}</h3>
                          <p className="text-white text-sm leading-relaxed relative">{feature.description}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}