import { motion } from "framer-motion";

const AgentsInfo = () => {
  const data = [
    {
      title: "Hiring Assistant",
      subtitle: "Rapid, Intelligent Screening and Scheduling",
      description:
        "Instantly identify top candidates from incoming resumes, automatically rank and shortlist them, and seamlessly schedule interviews directly onto your calendar. Save valuable time and find the right talent faster.",
    },
    {
      title: "Project Assistant",
      subtitle: "Proactive Management and Issue Resolution",
      description:
        "Continuously monitor project activities and promptly highlight potential risks or delays. Automatically create tickets, notify stakeholders, and track resolutions, ensuring your projects stay on track.",
    },
    {
      title: "Sales Assistant",
      subtitle: "Real-time Lead Qualification",
      description:
        "Immediately identify lead fit with your target audience. Instantly draft personalized actions, ensuring timely engagement when prospects are most interested.",
    },
    {
      title: "Executive Assistant",
      subtitle: "Strategic Administrative Support",
      description:
        "Streamline executive tasks by managing schedules, summarizing critical updates, coordinating meetings, and proactively handling daily administrative activities to maximize executive productivity.",
    },
    {
      title: "Onboarding Assistant",
      subtitle: "Instant Productivity from Day One",
      description:
        "Automate the entire onboarding process by provisioning new hires' accounts, assigning onboarding buddies, and distributing personalized welcome materials, ensuring immediate productivity and smooth transitions.",
    },
    {
      title: "Marketing Assistant",
      subtitle: "Data-Driven Marketing Guidance",
      description:
        "Continuously analyze your marketing data, proactively identify trends, recommend optimization opportunities, and provide strategic insights to elevate your marketing performance and ROI.",
    },
  ];
  return (
    <div id="benefits" className="pb-10 bg-[#1a1b1e] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-2 text-white">
          What can these agents do for your team?
        </h2>
        <h3 className="text-2xl text-center mb-6 text-white">
          AI Assistants for Every Business Function
        </h3>
        <p className="text-xl text-center mb-16 max-w-3xl text-gray-300 font-semibold leading-relaxed mx-auto">
          Empower your teams with intelligent agents tailored for hiring,
          onboarding, sales, marketing, and beyond—each designed to boost
          productivity and automate your workflows.
        </p>
      </div>
      <div className="w-full px-12 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 z-10">
        {data.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.1, delay: idx * 0.1 }}
            className="bg-[#2a2b2e] p-8 rounded-xl shadow-lg hover:shadow-[#8b5cf6]/25 transition-all duration-500 flex flex-col items-start"
          >
            <div className="flex flex-row items-center justify-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#1a1b1e] ">
                <span className="text-2xl text-[#8b5cf6] font-bold animate-pulse">
                  {item.title[0]}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white ml-4 justify-center align-middle">
                {item.title}
              </h3>
            </div>

            <div className="text-sm text-[#8b5cf6] font-medium mb-2">
              {item.subtitle}
            </div>
            <p className="text-white text-base leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AgentsInfo;
