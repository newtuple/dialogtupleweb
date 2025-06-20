import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import WhoUses from './components/WhoUses';
import CTA from './components/CTA';
import Carousal from './components/Carousal';
import AgentsInfo from './components/AgentsInfo';
import Blogs from './components/Blogs';

function App() {
  const currentPath = window.location.pathname;
  
  if (currentPath === '/blogs') {
    return <Blogs />;
  }
  
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Benefits />
      <Features />
      <AgentsInfo/>
      <HowItWorks />
      <WhoUses />
      <Carousal/>
      <CTA />
    </div>
  );
}

export default App;