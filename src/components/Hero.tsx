import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import DemoModal from './DemoModal';

// Particle background component
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-[#8b5cf6] rounded-full opacity-20 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  );
};

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');

  useEffect(() => {
    setIsVisible(true);

    // Update active hash on load and hash change
    const updateHash = () => setActiveHash(window.location.hash);
    window.addEventListener('hashchange', updateHash);
    updateHash();

    // Cleanup
    return () => window.removeEventListener('hashchange', updateHash);
  }, []);

  const isActive = (hash: string) => activeHash === hash;

  const navLinks = [
    { hash: '#benefits', label: 'Benefits' },
    { hash: '#features', label: 'Features' },
    { hash: '#how-it-works', label: 'How It Works' }
  ];

  return (
    <>
      {/* Navigation */}
      <nav className="fixed w-full bg-[#0f1012]/90 backdrop-blur-md border-b border-[#2a2b2e] z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <img 
                src="/2.png" 
                alt="Dialogtuple Logo" 
                className="h-8 w-auto object-contain" 
              />
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-8 px-8 py-2">
                {navLinks.map((link) => (
                  <a
                    key={link.hash}
                    href={link.hash}
                    className={`text-gray-300 font-semibold hover:text-[#8b5cf6] transition-all duration-200 hover:scale-105 ${
                      isActive(link.hash) ? 'text-[#8b5cf6] font-bold border-b-2 border-[#8b5cf6]' : ''
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <button onClick={() => setIsDemoModalOpen(true)} className="px-6 py-2.5 bg-[#8b5cf6] text-white rounded-full font-semibold hover:bg-[#7c3aed] active:bg-[#6d28d9] transition-all duration-200 hover:scale-105 hover:shadow-lg">
                Start Free Trial
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-300 hover:text-[#8b5cf6] active:text-[#8b5cf6] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-6 py-6 space-y-6 bg-[#0f1012]/95 backdrop-blur-md border-t border-[#2a2b2e]">
            {navLinks.map((link) => (
              <a
                key={link.hash}
                href={link.hash}
                className={`block text-gray-300 hover:text-[#8b5cf6] transition-all duration-200 hover:translate-x-2 ${
                  isActive(link.hash) ? 'text-[#8b5cf6] font-bold' : ''
                }`}
              >
                {link.label}
              </a>
            ))}
            <button onClick={() => setIsDemoModalOpen(true)} className="w-full px-6 py-2.5 bg-[#8b5cf6] text-white rounded-full font-semibold hover:bg-[#7c3aed] active:bg-[#6d28d9] transition-all duration-200 hover:scale-105 hover:shadow-lg">
              Start Free Trial
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen bg-[#1a1b1e] text-white pt-32 pb-16 overflow-hidden">
        <ParticleBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className={`mb-8 transition-all duration-1000 ease-out ${isVisible ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <img 
                src="/2.png" 
                alt="Dialogtuple Logo" 
                className="h-16 w-auto object-contain animate-pulse" 
                width={100}
                height={100}
              />
            </div>
            <div className={`transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-xl text-gray-400 mb-8 tracking-wide">
                by <a href="https://www.newtuple.com" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-[#8b5cf6] transition-all duration-300 hover:underline decoration-2 underline-offset-4">Newtuple</a>
              </p>
            </div>
            <p className={`text-3xl md:text-4xl lg:text-5xl mb-8 max-w-4xl text-white font-bold leading-tight tracking-tight transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Multi-Agent Chatbots. Enterprise-Ready. Customizable. <span className="bg-gradient-to-r from-[#8b5cf6] via-[#6366f1] to-[#3b82f6] text-transparent bg-clip-text">Anywhere</span>
            </p>
            <p className={`text-xl md:text-2xl mb-16 max-w-3xl text-gray-300 font-medium leading-relaxed tracking-wide transition-all duration-1000 delay-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              A cutting-edge accelerator blending traditional chatbot platforms with modern multi-agent capabilities, enabling intelligent, context-aware routing and interactions.
            </p>

            <div className={`w-full max-w-6xl mx-auto mb-16 transition-all duration-1000 delay-800 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div 
                className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#2a2b2e] p-8 shadow-lg group"
              >
                {/* Glow effect container */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6]/20 via-[#6366f1]/20 to-[#3b82f6]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.15),transparent_70%)]" />
                
                {/* Animated border */}
                <div className="absolute inset-0 border-2 border-[#8b5cf6]/30 rounded-xl">
                  <div className="absolute inset-0 border-t-2 border-[#8b5cf6] rounded-t-xl animate-border-flow" />
                </div>

                <img 
                  src="/gifs/workflow.gif" 
                  alt="Dialogtuple Workflow" 
                  className="w-full h-full object-cover rounded-lg shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>

            <div className={`flex flex-col sm:flex-row gap-6 transition-all duration-1000 delay-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <button onClick={() => setIsDemoModalOpen(true)} className="font-semibold text-lg px-10 py-4 bg-[#8b5cf6] text-white rounded-full hover:bg-[#7c3aed] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[#8b5cf6]/25">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </div>

      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </>
  );
}