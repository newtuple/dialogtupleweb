import React from 'react';
import { Paintbrush, TestTube, Share2 } from 'lucide-react';

const steps = [
  {
    icon: <Paintbrush className="w-10 h-10" />,
    title: "Build Visually",
    description: "Use a simple, drag-and-drop interface to blend structured chatbot interactions with intelligent agent-based routing."
  },
  {
    icon: <TestTube className="w-10 h-10" />,
    title: "Test Rapidly",
    description: "Quickly iterate chatbot interactions using the built-in emulator to ensure high-quality user experiences."
  },
  {
    icon: <Share2 className="w-10 h-10" />,
    title: "Deploy Everywhere",
    description: "Easily deploy chatbots securely across multiple platforms like Slack, Teams, and web."
  }
];

export default function HowItWorks() {
  return (
    <div className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-24 text-gray-900">How Dialogtuple Works</h2>
        <div className="grid md:grid-cols-3 gap-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-primary-200 -z-10" />
              )}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 mb-8 shadow-enterprise">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}