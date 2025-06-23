import { Shield, Cloud, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const benefits = [
  {
    icon: <Shield className="w-10 h-10 text-[#8b5cf6]" />,
    title: "Enterprise-Grade Security & Compliance",
    description: "Built-in security controls, audit trails, and compliance features that meet the most stringent enterprise requirements."
  },
  {
    icon: <Cloud className="w-10 h-10 text-[#8b5cf6]" />,
    title: "Self-Deployable on Your Infrastructure",
    description: "Deploy and maintain complete control over your data with flexible deployment options across Azure, AWS, Google Cloud, or private infrastructure."
  },
  {
    icon: <Rocket className="w-10 h-10 text-[#8b5cf6]" />,
    title: "Production-Ready Scalability",
    description: "Battle-tested architecture that scales from pilot projects to enterprise-wide deployments handling millions of interactions."
  }
];

export default function Benefits() {
  return (
    <div id="benefits" className="pb-10 bg-[#1a1b1e] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-6 text-white">Enterprise-Ready Multi-Agent Platform</h2>
        <p className="text-xl text-center mb-16 max-w-3xl text-white font-semibold leading-relaxed mx-auto">
          Built for organizations that demand security, scalability, and complete control over their AI infrastructure
        </p>
        <div className="grid md:grid-cols-3 gap-12">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.1, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="benefit-card bg-[#2a2b2e] p-8 rounded-xl shadow-lg hover:shadow-[#8b5cf6]/25 transition-all duration-500"
            >
              <motion.div 
                initial={{ opacity: 1, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.2 }}
                className="w-20 h-20 mx-auto bg-[#1a1b1e] rounded-2xl flex items-center justify-center mb-8"
              >
                {benefit.icon}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.2 }}
              >
                <h3 className="text-2xl font-semibold mb-4 text-center text-white">{benefit.title}</h3>
                <p className="text-white text-center text-lg leading-relaxed">{benefit.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}