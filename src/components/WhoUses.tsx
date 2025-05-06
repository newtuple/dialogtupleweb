import React from 'react';
import { Users, Server, HeadphonesIcon as HeadphoneIcon, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <div className="py-32 min-h-screen bg-[#edf6f9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-24 text-gray-900">Who Benefits from Dialogtuple?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {users.map((user, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.1, delay: index * 0.1 }}
              className="text-center h-[400px] flex flex-col items-center"
            >
              <motion.div 
                initial={{ opacity: 1, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-enterprise border-2 border-[#006666]"
              >
                {user.icon}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.2 }}
                className="bg-white p-8 rounded-2xl border-2 border-[#006666] shadow-lg group-hover:shadow-xl transition-all duration-300 mt-8 h-full w-full flex flex-col"
              >
                <h3 className="text-2xl font-semibold mb-4 text-[#006666]">{user.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{user.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}