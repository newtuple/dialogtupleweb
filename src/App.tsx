import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import WhoUses from './components/WhoUses';
import CTA from './components/CTA';
import Carousal from './components/Carousal';
import AgentsInfo from './components/AgentsInfo';
import Blogs from './components/Blogs';

// Main home page component
function HomePage() {
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

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<HomePage />} />
        
        {/* Blog routes */}
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<Blogs />} />
        
        {/* Catch all route - redirect to home */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;