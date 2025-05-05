import React from 'react';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import DemoModal from './DemoModal';

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
              <a href="#benefits" className="text-gray-600 hover:text-gray-900 transition-colors">Benefits</a>
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How It Works</a>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                Start Free Trial
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-4 py-4 space-y-4">
            <a href="#benefits" className="block text-gray-600 hover:text-gray-900 transition-colors">Benefits</a>
            <a href="#features" className="block text-gray-600 hover:text-gray-900 transition-colors">Features</a>
            <a href="#how-it-works" className="block text-gray-600 hover:text-gray-900 transition-colors">How It Works</a>
            <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors">
              Start Free Trial
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white text-gray-900 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className={`mb-8 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <img 
                src="/dialoglogo.png" 
                alt="Dialogtuple Logo" 
                className="h-16 w-auto object-contain animate-pulse" 
              />
            </div>
            <div className={`transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-xl text-gray-600 mb-8">
                by <a href="https://www.newtuple.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 transition-colors">Newtuple</a>
              </p>
            </div>
            <p className={`text-2xl md:text-3xl mb-8 max-w-4xl text-gray-700 font-light leading-relaxed transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Multi-Agent Chatbots. Enterprise-Ready. Customizable. Anywhere.
            </p>
            <p className={`text-xl mb-16 max-w-3xl text-gray-600 leading-relaxed transition-all duration-1000 delay-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              A cutting-edge accelerator blending traditional chatbot platforms with modern multi-agent capabilities, enabling intelligent, context-aware routing and interactions.
            </p>
            <div className={`flex flex-col sm:flex-row gap-6 transition-all duration-1000 delay-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <button className="px-10 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all duration-300 hover:scale-105 shadow-enterprise-lg hover:shadow-enterprise">
                Start Free Trial
              </button>
              <button 
                onClick={() => setIsDemoModalOpen(true)}
                className="px-10 py-4 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-300 hover:scale-105"
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