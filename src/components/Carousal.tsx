import React, { useEffect, useRef, useState } from 'react';

const videoList = [
  { src: '/videos/Sales_Assistant.mp4', label: 'Sales Assistant', description: 'Streamline your sales process with real-time AI assistance.' },
  { src: '/videos/Onboarding_assistant.mp4', label: 'Onboarding Assistant', description: 'Simplify employee onboarding using AI-driven workflows.' },
  { src: '/videos/Hiring_agents.mp4', label: 'Hiring Agents', description: 'Accelerate recruitment with smart hiring agents.' },
  { src: '/videos/Teams-Project_agent.mp4', label: 'Teams Project Agent', description: 'Manage your team projects effectively using AI collaboration tools.' },
  { src: '/videos/Teams-document_assistant.mp4', label: 'Teams Document Assistant', description: 'Easily navigate and manage documents with AI support.' },
];

interface CarousalProps {
  id?: string;
}

const Carousal: React.FC<CarousalProps> = ({ id }) => {
  const [current, setCurrent] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const prevSlide = () => setCurrent((prev) => (prev === 0 ? videoList.length - 1 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev === videoList.length - 1 ? 0 : prev + 1));
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 3; // 1.0 is normal, 2.0 is double speed
    }
  }, [current]); 

//   const data = [
//     {
//       title: 'Hiring Assistant',
//       subtitle: 'Rapid, Intelligent Screening and Scheduling',
//       description:
//         'Instantly identify top candidates from incoming resumes, automatically rank and shortlist them, and seamlessly schedule interviews directly onto your calendar. Save valuable time and find the right talent faster.',
//     },
//     {
//       title: 'Project Assistant',
//       subtitle: 'Proactive Management and Issue Resolution',
//       description:
//         'Continuously monitor project activities and promptly highlight potential risks or delays. Automatically create tickets, notify stakeholders, and track resolutions, ensuring your projects stay on track.',
//     },
//     {
//       title: 'Sales Assistant',
//       subtitle: 'Real-time Lead Qualification',
//       description:
//         'Immediately identify lead fit with your target audience. Instantly draft personalized actions, ensuring timely engagement when prospects are most interested.',
//     },
//     {
//       title: 'Executive Assistant',
//       subtitle: 'Strategic Administrative Support',
//       description:
//         'Streamline executive tasks by managing schedules, summarizing critical updates, coordinating meetings, and proactively handling daily administrative activities to maximize executive productivity.',
//     },
//     {
//       title: 'Onboarding Assistant',
//       subtitle: 'Instant Productivity from Day One',
//       description:
//         'Automate the entire onboarding process by provisioning new hires’ accounts, assigning onboarding buddies, and distributing personalized welcome materials, ensuring immediate productivity and smooth transitions.',
//     },
//     {
//       title: 'Marketing Assistant',
//       subtitle: 'Data-Driven Marketing Guidance',
//       description:
//         'Continuously analyze your marketing data, proactively identify trends, recommend optimization opportunities, and provide strategic insights to elevate your marketing performance and ROI.',
//     },
//   ];
  return (
    <div id={id} className="relative w-full min-h-screen bg-[#1a1b1e] overflow-hidden flex flex-col items-center justify-center p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)] pointer-events-none z-0" />
      <h1 className="text-3xl font-bold text-white mb-4 z-10">Assistant Showcase</h1>
      <div className="relative w-full max-w-4xl mx-auto py-12 flex flex-col items-center z-10">
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-lg bg-black border border-gray-700 flex items-center justify-center">
          <video
            key={videoList[current].src}
            src={videoList[current].src}
            ref={videoRef}
            controls
            autoPlay
            muted
            onEnded={nextSlide}
            className="w-full h-full object-contain bg-black rounded-2xl ring-1 ring-blue-500/30"
            style={{ maxHeight: '100%', maxWidth: '100%' }}
          />
        </div>
        <div className="flex gap-4 items-center mt-6 z-10">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Previous"
          >
            &#8592;
          </button>
          <div className="flex gap-3">
            {videoList.map((_, idx) => (
              <div
                key={idx}
                className={`w-6 h-6 rounded-full ${idx === current ? 'border-2 border-blue-500 animate-pulse bg-blue-600 shadow-md' : 'border border-gray-500'}`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Next"
          >
            &#8594;
          </button>
        </div>
        <div className="mt-4 text-gray-200 text-xl font-semibold tracking-wide z-10">
          {videoList[current].label}
        </div>
        <div className="mt-2 text-gray-400 text-center text-base max-w-xl">{videoList[current].description}</div>
      </div>
    </div>
  );
};

export default Carousal; 