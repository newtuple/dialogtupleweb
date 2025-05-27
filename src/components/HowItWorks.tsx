import { Paintbrush, TestTube, Share2 } from 'lucide-react';
import AnimatedCard from './AnimatedCard';

const steps = [
  {
    icon: <Paintbrush className="w-10 h-10 text-white" />,
    title: "Build Visually",
    description: "Use a simple, drag-and-drop interface to blend structured chatbot interactions with intelligent agent-based routing.",
    gif: "/gifs/workflow.gif"
  },
  {
    icon: <TestTube className="w-10 h-10 text-white" />,
    title: "Test Rapidly",
    description: "Quickly iterate chatbot interactions using the built-in emulator to ensure high-quality user experiences.",
    gif: "/gifs/test-rapidly.gif"
  },
  {
    icon: <Share2 className="w-10 h-10 text-white" />,
    title: "Deploy Everywhere",
    description: "Easily deploy chatbots securely across multiple platforms like Slack, Teams, and web.",
    gif: "/gifs/new-slack-1.gif"
  }
];

export default function HowItWorks() {
  return (
    <div id="how-it-works" className="py-32 min-h-screen bg-gradient-to-br from-slate-50 via-[#f0f7f7] to-white relative overflow-hidden scroll-mt-16">
      {/* AI-themed background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 right-0 w-full h-full bg-gradient-to-br from-[#00666610] to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 left-0 w-full h-full bg-gradient-to-br from-[#00666610] to-transparent rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h2 className="text-5xl font-bold text-center mb-24 bg-clip-text text-transparent bg-gradient-to-r from-[#006666] to-[#008080]">
          How Dialogtuple Works
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <AnimatedCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              index={index}
              containerClassName="bg-gradient-to-br from-[#006666] to-[#008080] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 group"
              iconWrapperClassName="w-20 h-20 mx-auto bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white/20 transition-all duration-300"
              titleClassName="text-2xl font-semibold mb-4 text-center text-white group-hover:scale-105 transition-transform duration-300"
              descriptionClassName="text-white/90 text-center text-lg leading-relaxed"
            />
          ))}
        </div>
      </div>
    </div>
  );
}