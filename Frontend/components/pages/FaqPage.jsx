import React, { useState } from 'react';
import { ChevronRight, Home } from 'lucide-react';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "How to contact with Customer Service?",
      answer: "You can contact our support team via the 'Help' section in the app, email us at support@example.com, or call our toll-free number available 24/7."
    },
    {
      question: "App installation failed, how to update system information?",
      answer: "Ensure your device meets the minimum OS requirements. Clear your app store cache and restart your device. If the problem persists, check for system updates in your device settings."
    },
    {
      question: "Website response taking time, how to improve?",
      answer: "Try clearing your browser cookies and cache. Using a modern browser like Chrome or Firefox often improves speed. Check your internet connection or try disabling VPNs."
    },
    {
      question: "How do I create an account?",
      answer: "Click the 'Sign Up' button on the top right of the home page. Enter your email, create a password, and verify your account via the link sent to your inbox."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <div 
        className="relative h-64 flex flex-col items-center justify-center text-center bg-cover bg-center px-4"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=2000&auto=format&fit=crop')`, // Background with fresh veggies
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backgroundBlendMode: 'overlay'
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          Frequently Ask Question
        </h1>
        
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Home size={16} className="text-gray-400" />
          <span className="hover:text-emerald-600 cursor-pointer">Home</span>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="font-semibold text-gray-900 underline decoration-emerald-500 underline-offset-4">Faq</span>
        </nav>
      </div>

      {/* FAQ List Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
              >
                <span className={`text-lg font-semibold transition-colors ${openIndex === index ? 'text-emerald-600' : 'text-gray-800'}`}>
                  {item.question}
                </span>
                <ChevronRight 
                  className={`text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-90 text-emerald-600' : 'group-hover:translate-x-1'}`} 
                  size={20} 
                />
              </button>
              
              {/* Accordion Content */}
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-600 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;