import React, { useEffect, useRef } from 'react';
import { Shield, Cloud, Rocket } from 'lucide-react';

const benefits = [
  {
    icon: <Shield className="w-10 h-10" />,
    title: "Enterprise-Grade Security & Compliance",
    description: "Built-in security controls, audit trails, and compliance features that meet the most stringent enterprise requirements."
  },
  {
    icon: <Cloud className="w-10 h-10" />,
    title: "Self-Deployable on Your Infrastructure",
    description: "Deploy and maintain complete control over your data with flexible deployment options across Azure, AWS, Google Cloud, or private infrastructure."
  },
  {
    icon: <Rocket className="w-10 h-10" />,
    title: "Production-Ready Scalability",
    description: "Battle-tested architecture that scales from pilot projects to enterprise-wide deployments handling millions of interactions."
  }
];

export default function Benefits() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.benefit-card');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div id="benefits" className="py-32 bg-gray-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-900">Enterprise-Ready Multi-Agent Platform</h2>
        <p className="text-xl text-gray-600 text-center mb-24 max-w-3xl mx-auto">
          Built for organizations that demand security, scalability, and complete control over their AI infrastructure
        </p>
        <div className="grid md:grid-cols-3 gap-12">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="benefit-card opacity-0 bg-white p-8 rounded-xl shadow-enterprise hover:shadow-enterprise-lg transition-all duration-500 hover:scale-105"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="w-20 h-20 mx-auto bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 mb-8">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-center text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600 text-center text-lg leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}