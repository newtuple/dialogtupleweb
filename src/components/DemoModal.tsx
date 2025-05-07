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

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   setSubmitStatus('idle');

  //   try {
  //     await emailjs.sendForm(
  //       'YOUR_SERVICE_ID',
  //       'YOUR_TEMPLATE_ID',
  //       formRef.current!,
  //       'YOUR_PUBLIC_KEY'
  //     );
  //     setSubmitStatus('success');
  //     setTimeout(() => {
  //       onClose();
  //       setSubmitStatus('idle');
  //     }, 2000);
  //   } catch (error) {
  //     setSubmitStatus('error');
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
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
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-400 hover:text-[#006666] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold mb-3 text-[#006666]">Request a Demo</h2>
        <p className="text-gray-600 mb-8 text-lg">Fill out the form below and we'll get back to you shortly.</p>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="text-gray-900 w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#006666] focus:border-[#006666] transition-colors"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Work Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="text-gray-900 w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#006666] focus:border-[#006666] transition-colors"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              required
              className="text-gray-900 w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#006666] focus:border-[#006666] transition-colors"
              placeholder="Your company name"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="text-gray-900 w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#006666] focus:border-[#006666] transition-colors"
              placeholder="Tell us about your needs..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-white text-lg transition-all duration-300 ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#006666] hover:bg-[#008080] hover:shadow-lg hover:scale-[1.02]'
            }`}
          >
            {isSubmitting ? 'Sending...' : 'Request Demo'}
          </button>

          {submitStatus === 'success' && (
            <p className="text-green-600 text-center font-semibold text-lg">
              Request sent successfully! We'll be in touch soon.
            </p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-600 text-center font-semibold text-lg">
              Something went wrong. Please try again or contact support.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}