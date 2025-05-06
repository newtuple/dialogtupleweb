import React from 'react';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import DemoModal from './DemoModal';

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
      <nav className="fixed w-full bg-white shadow-enterprise z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img 
                src="/dialoglogo.png" 
                alt="Dialogtuple Logo" 
                className="h-8 w-auto object-contain" 
              />
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-6 px-6 py-2 rounded-lg border-2 border-[#006666] bg-white/500 backdrop-blur-sm ">
                {navLinks.map((link) => (
                  <a
                    key={link.hash}
                    href={link.hash}
                    className={`text-gray-600 font-semibold hover:text-[#006666] transition-all duration-200 hover:scale-105 ${
                      isActive(link.hash) ? 'text-[#006666] font-bold border-b-2 border-[#006666]' : ''
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <button className="px-4 py-2 bg-[#006666] text-white rounded-lg font-semibold hover:bg-[#008080] active:bg-[#006666] transition-all duration-200 hover:scale-105 hover:shadow-lg">
                Start Free Trial
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-text-secondary hover:text-text-hover active:text-text-active transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.hash}
                href={link.hash}
                className={`block text-gray-600 hover:text-[#006666] transition-all duration-200 hover:translate-x-2 ${
                  isActive(link.hash) ? 'text-[#006666] font-bold border-b-2 border-[#006666]' : ''
                }`}
              >
                {link.label}
              </a>
            ))}
            <button className="w-full px-4 py-2 bg-[#006666] text-white rounded-lg font-semibold hover:bg-[#008080] active:bg-primary-800 transition-all duration-200 hover:scale-105 hover:shadow-lg">
              Start Free Trial
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {/* bg-[#FFFCF7] */}
      <div className=" min-h-screen bg-white text-gray-900 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className={`mb-8 transition-all duration-1000 ease-out ${isVisible ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <img 
                src="/dialoglogo.png" 
                alt="Dialogtuple Logo" 
                className="h-16 w-auto object-contain" 
              />
            </div>
            <div className={`transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-xl text-gray-600 mb-8">
                by <a href="https://www.newtuple.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition-colors">Newtuple</a>
              </p>
            </div>
            <p className={`text-2xl md:text-3xl mb-8 max-w-4xl text-text-primary font-bold leading-relaxed transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Multi-Agent Chatbots. Enterprise-Ready. Customizable. Anywhere.
            </p>
            <p className={`text-xl mb-16 max-w-3xl text-text-secondary font-semibold leading-relaxed transition-all duration-1000 delay-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              A cutting-edge accelerator blending traditional chatbot platforms with modern multi-agent capabilities, enabling intelligent, context-aware routing and interactions.
            </p>
            <div className={`flex flex-col sm:flex-row gap-6 transition-all duration-1000 delay-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <button className="px-10 py-4  bg-[#006666] text-white rounded-lg font-semibold hover:bg-[#008080] transition-all duration-300 hover:scale-105 shadow-enterprise-lg hover:shadow-enterprise">
                Start Free Trial
              </button>
              <button 
                onClick={() => setIsDemoModalOpen(true)}
                className="px-10 py-4 border-2 border-[#008080] text-[#008080] rounded-lg font-semibold hover:bg-white transition-all duration-300 hover:scale-105"
              >
                Request Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </>
  );
}