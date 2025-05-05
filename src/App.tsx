import React from 'react';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import WhoUses from './components/WhoUses';
import CTA from './components/CTA';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Benefits />
      <Features />
      <HowItWorks />
      <WhoUses />
      <CTA />
    </div>
  );
}

export default App;