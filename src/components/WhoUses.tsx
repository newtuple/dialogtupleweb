import { Users, Server, HeadphonesIcon as HeadphoneIcon, BarChart } from 'lucide-react';
import AnimatedCard from './AnimatedCard';

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