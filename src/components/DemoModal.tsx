import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { X } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
  
    const formData = new FormData(e.currentTarget);
  
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      message: formData.get('message'),
    };
  
    try {
      const res = await fetch('/.netlify/functions/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      const result = await res.json();
      console.log(result)
      if (result.success) {
        setSubmitStatus('success');
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 2500);
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1b1e] rounded-2xl p-8 max-w-md w-full mx-4 relative shadow-2xl border border-gray-800">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-white hover:text-[#8b5cf6] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold mb-3 text-white">Request a Demo</h2>
        <p className="text-white mb-8 text-lg">Fill out the form below and we'll get back to you shortly.</p>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="text-white w-full px-4 py-3 bg-[#2a2b2e] border-2 border-gray-700 rounded-xl focus:ring-2 focus:ring-[#8b5cf6] focus:border-[#8b5cf6] transition-colors placeholder-gray-400"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
              Work Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="text-white w-full px-4 py-3 bg-[#2a2b2e] border-2 border-gray-700 rounded-xl focus:ring-2 focus:ring-[#8b5cf6] focus:border-[#8b5cf6] transition-colors placeholder-gray-400"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-semibold text-white mb-2">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              required
              className="text-white w-full px-4 py-3 bg-[#2a2b2e] border-2 border-gray-700 rounded-xl focus:ring-2 focus:ring-[#8b5cf6] focus:border-[#8b5cf6] transition-colors placeholder-gray-400"
              placeholder="Your company name"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="text-white w-full px-4 py-3 bg-[#2a2b2e] border-2 border-gray-700 rounded-xl focus:ring-2 focus:ring-[#8b5cf6] focus:border-[#8b5cf6] transition-colors placeholder-gray-400"
              placeholder="Tell us about your needs..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-white text-lg transition-all duration-300 ${
              isSubmitting
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-[#8b5cf6] hover:bg-[#7c3aed] hover:shadow-lg hover:scale-[1.02]'
            }`}
          >
            {isSubmitting ? 'Sending...' : 'Request Demo'}
          </button>

          {submitStatus === 'success' && (
            <p className="text-green-400 text-center font-semibold text-lg">
              Request sent successfully! We'll be in touch soon.
            </p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-400 text-center font-semibold text-lg">
              Something went wrong. Please try again or contact support.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}