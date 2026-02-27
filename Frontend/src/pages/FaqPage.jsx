import React, { useState } from "react";
import { BiChevronRight, BiHome } from "react-icons/bi";
import { Link } from "react-router-dom";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "How to contact with Customer Service?",
      answer:
        "You can contact our support team via the 'Help' section in the app, email us at support@example.com, or call our toll-free number available 24/7.",
    },
    {
      question: "App installation failed, how to update system information?",
      answer:
        "Ensure your device meets the minimum OS requirements. Clear your app store cache and restart your device. If the problem persists, check for system updates in your device settings.",
    },
    {
      question: "Website response taking time, how to improve?",
      answer:
        "Try clearing your browser cookies and cache. Using a modern browser like Chrome or Firefox often improves speed. Check your internet connection or try disabling VPNs.",
    },
    {
      question: "How do I create an account?",
      answer:
        "Click the 'Sign Up' button on the top right of the home page. Enter your email, create a password, and verify your account via the link sent to your inbox.",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-15">
      <div className="relative w-full h-44 md:h-56 overflow-hidden flex flex-col items-center justify-center border-b border-gray-100">
        <img
          src="/images/faq.webp"
          alt="Privacy Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Frequently Asked Questions
          </h1>
          {/* <div className="flex items-center justify-center text-sm text-gray-500">
            <Link to={"/"} className="hover:text-brand-green">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-white font-medium">FAQ</span>
          </div> */}
        </div>
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
                <span
                  className={`text-lg font-semibold transition-colors ${openIndex === index ? "text-brand-green" : "text-gray-800"}`}
                >
                  {item.question}
                </span>
                <BiChevronRight
                  className={`text-gray-400 transition-transform duration-300 ${openIndex === index ? "rotate-90 text-brand-green" : "group-hover:translate-x-1"}`}
                  size={20}
                />
              </button>

              {/* Accordion Content */}
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-40 pb-6 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-600 leading-relaxed">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
