import { Users, Server, HeadphonesIcon as HeadphoneIcon, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';

const users = [
  {
    icon: <Users className="w-14 h-14 text-[#8b5cf6]" />,
    title: "Product Teams",
    description: "Needing rapid, no-code, intelligent chatbot solutions."
  },
  {
    icon: <Server className="w-14 h-14 text-[#8b5cf6]" />,
    title: "IT & DevOps Teams",
    description: "Looking for seamless integration and easy cloud deployment."
  },
  {
    icon: <HeadphoneIcon className="w-14 h-14 text-[#8b5cf6]" />,
    title: "Customer Support Teams",
    description: "Automating complex interactions with intelligence and precision."
  },
  {
    icon: <BarChart className="w-14 h-14 text-[#8b5cf6]" />,
    title: "Data & Analytics Teams",
    description: "Driving smarter, contextually rich conversations."
  }
];

export default function WhoUses() {
  return (
    <div className="min-h-screen pb-10 bg-[#1a1b1e] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.h2 
          className="text-4xl font-bold text-center mb-24 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
        >
          Who Benefits from Dialogtuple?
        </motion.h2>

        <div className="space-y-8 max-w-5xl mx-auto">
          {users.map((user, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className={`flex items-center gap-8 p-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''} bg-[#2a2b2e]/40 rounded-xl border-b border-[#8b5cf6]/20`}
            >
              {/* Icon Container */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.5, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex-shrink-0 w-24 h-24 rounded-2xl flex items-center justify-center relative group bg-[#2a2b2e]/60"
              >
                {/* Icon glow effect */}
                <div className="absolute inset-0 bg-[#8b5cf6] rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="relative">
                  {user.icon}
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex-1"
              >
                <h3 className="text-3xl font-semibold mb-3 text-white">{user.title}</h3>
                <p className="text-white text-xl leading-relaxed opacity-80">{user.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}