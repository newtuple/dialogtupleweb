import React from 'react';

export default function CTA() {
  return (
    // bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 
    <div className="bg-[#006666] p-32 y-32 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-8">Ready to Transform Your Enterprise Conversations?</h2>
        <p className="text-2xl mb-16 text-primary-100 max-w-4xl mx-auto leading-relaxed">
          Experience the seamless blend of classic chatbot reliability and advanced AI intelligence with Dialogtuple today.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button className="px-10 py-4 bg-white text-[#006666] rounded-full font-semibold hover:bg-primary-50 transition-colors text-lg shadow-enterprise-lg hover:shadow-enterprise">
            Start Free Trial
          </button>
          <button className="px-10 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-colors text-lg">
            Request Demo
          </button>
        </div>
      </div>
    </div>
  );
}