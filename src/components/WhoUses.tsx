import React from 'react';
import { Users, Server, HeadphonesIcon as HeadphoneIcon, BarChart } from 'lucide-react';
import AnimatedCard from './AnimatedCard';

const users = [
  {
    icon: <Users className="w-10 h-10 text-[#006666]" />,
    title: "Product Teams",
    description: "Needing rapid, no-code, intelligent chatbot solutions."
  },
  {
    icon: <Server className="w-10 h-10 text-[#006666]" />,
    title: "IT & DevOps Teams",
    description: "Looking for seamless integration and easy cloud deployment."
  },
  {
    icon: <HeadphoneIcon className="w-10 h-10 text-[#006666]" />,
    title: "Customer Support Teams",
    description: "Automating complex interactions with intelligence and precision."
  },
  {
    icon: <BarChart className="w-10 h-10 text-[#006666]" />,
    title: "Data & Analytics Teams",
    description: "Driving smarter, contextually rich conversations."
  }
];

export default function WhoUses() {
  return (
    <div className="py-32 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-24 text-gray-900">Who Benefits from Dialogtuple?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {users.map((user, index) => (
            <AnimatedCard
              key={index}
              icon={user.icon}
              title={user.title}
              description={user.description}
              index={index}
              containerClassName="text-center"
              iconWrapperClassName="w-20 h-20 mx-auto bg-white rounded-2xl flex items-center justify-center mb-8 shadow-enterprise border-2 border-[#006666]"
              titleClassName="text-2xl font-semibold mb-4 text-[#006666]"
              descriptionClassName="text-gray-600 text-lg leading-relaxed"
              whileHover={{ scale: 1.1, rotate: 5 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}