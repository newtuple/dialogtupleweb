import DemoModal from "./DemoModal";
import { useState } from "react";
export default function CTA() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  return (
    <div className="bg-[#2a2b2e] p-32 y-32 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-8">Ready to Transform Your Enterprise Conversations?</h2>
        <p className="text-2xl mb-16 text-white max-w-4xl mx-auto leading-relaxed">
          Experience the seamless blend of classic chatbot reliability and advanced AI intelligence with Dialogtuple today.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button 
            onClick={() => setIsDemoModalOpen(true)}
            className="px-10 py-4 bg-[#8b5cf6] text-white rounded-full font-semibold hover:bg-[#7c3aed] transition-colors text-lg shadow-lg hover:shadow-[#8b5cf6]/25"
          >
            Start Free Trial
          </button>
        </div>
      </div>
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}