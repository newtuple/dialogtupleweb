import React from 'react';
import { Shield, Cloud, Rocket } from 'lucide-react';
import AnimatedCard from './AnimatedCard';

const benefits = [
  {
    icon: <Shield className="w-10 h-10 text-[#006666]" />,
    title: "Enterprise-Grade Security & Compliance",
    description: "Built-in security controls, audit trails, and compliance features that meet the most stringent enterprise requirements."
  },
  {
    icon: <Cloud className="w-10 h-10 text-[#006666]" />,
    title: "Self-Deployable on Your Infrastructure",
    description: "Deploy and maintain complete control over your data with flexible deployment options across Azure, AWS, Google Cloud, or private infrastructure."
  },
  {
    icon: <Rocket className="w-10 h-10 text-[#006666]" />,
    title: "Production-Ready Scalability",
    description: "Battle-tested architecture that scales from pilot projects to enterprise-wide deployments handling millions of interactions."
  }
];

export default function Benefits() {
  return (
    <div id="benefits" className="py-32 bg-gradient-to-br from-slate-50 via-[#f0f7f7] to-white relative overflow-hidden scroll-mt-16">
      {/* AI-themed background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#00666610] to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-br from-[#00666610] to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h2 className="text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#006666] to-[#008080]">
          Enterprise-Ready Multi-Agent Platform
        </h2>
        <p className="text-xl text-gray-600 text-center mb-24 max-w-3xl mx-auto">
          Built for organizations that demand security, scalability, and complete control over their AI infrastructure
        </p>
        <div className="grid md:grid-cols-3 gap-12">
          {benefits.map((benefit, index) => (
            <AnimatedCard
              key={index}
              icon={<div className="bg-white p-3 rounded-xl">{benefit.icon}</div>}
              title={benefit.title}
              description={benefit.description}
              index={index}
              containerClassName="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl border border-[#00666620] transition-all duration-500"
              iconWrapperClassName="w-20 h-20 mx-auto bg-gradient-to-br from-[#006666] to-[#008080] rounded-2xl flex items-center justify-center mb-8"
              titleClassName="text-2xl font-semibold mb-4 text-center text-[#006666]"
              descriptionClassName="text-gray-600 text-center text-lg leading-relaxed"
            />
          ))}
        </div>
      </div>
    </div>
  );
}