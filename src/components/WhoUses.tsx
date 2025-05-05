import React from 'react';
import { Users, Server, HeadphonesIcon as HeadphoneIcon, BarChart } from 'lucide-react';

const users = [
  {
    icon: <Users className="w-8 h-8" />,
    title: "Product Teams",
    description: "Needing rapid, no-code, intelligent chatbot solutions."
  },
  {
    icon: <Server className="w-8 h-8" />,
    title: "IT & DevOps Teams",
    description: "Looking for seamless integration and easy cloud deployment."
  },
  {
    icon: <HeadphoneIcon className="w-8 h-8" />,
    title: "Customer Support Teams",
    description: "Automating complex interactions with intelligence and precision."
  },
  {
    icon: <BarChart className="w-8 h-8" />,
    title: "Data & Analytics Teams",
    description: "Driving smarter, contextually rich conversations."
  }
];

export default function WhoUses() {
  return (
    <div className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-24 text-gray-900">Who Benefits from Dialogtuple?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {users.map((user, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-enterprise hover:shadow-enterprise-lg transition-shadow">
              <div className="w-16 h-16 mx-auto bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-6">
                {user.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-gray-900">{user.title}</h3>
              <p className="text-gray-600 text-center text-lg leading-relaxed">{user.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}