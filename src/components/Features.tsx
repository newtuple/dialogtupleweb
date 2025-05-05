import React, { useEffect } from 'react';
import { Shield, Cloud, Rocket, Puzzle as PuzzlePiece, Box, Repeat, Smartphone, BookOpen } from 'lucide-react';

const features = [
  {
    icon: <PuzzlePiece className="w-8 h-8" />,
    title: "Multi-Agent Architecture",
    description: "Combine multiple specialized AI agents seamlessly for superior accuracy and intelligent routing."
  },
  {
    icon: <Box className="w-8 h-8" />,
    title: "Out-of-the-Box Integrations",
    description: "Easily integrate with your existing enterprise tools, platforms, and systems."
  },
  {
    icon: <Repeat className="w-8 h-8" />,
    title: "50+ Supported LLM Providers",
    description: "Access diverse models from OpenAI, Anthropic, Google, Meta, and more without vendor lock-in."
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Direct Multi-Platform Deployment",
    description: "Instantly deploy your chatbots to Slack, Microsoft Teams, web, and other popular channels."
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Model Context Protocol",
    description: "A standardized protocol enabling AI models to interact with external data sources and tools in a structured way, simplifying integrations while enhancing security and scalability."
  }
];

export default function Features() {
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

    const elements = document.querySelectorAll('.feature-card');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div id="features" className="py-32 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-24 text-gray-900">Core Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card opacity-0 p-8 rounded-xl bg-gray-50 hover:bg-white hover:shadow-enterprise transition-all duration-500 hover:scale-105"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}