import React, { useState } from "react";
import { BiChevronRight, BiHome } from "react-icons/bi";
import { Link } from "react-router-dom";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "Ways to Reach Customer Support?",
      answer:
        "Got questions? Reach out via the Contact Us page, send an email, or call the listed phone line. When the office is open, staff help sort big shipments, share delivery news, handle money matters, plus keep things moving smoothly.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Timing changes based on how much is ordered and where it's going. Usually, bulk shipments go out when planned, arriving by set dates so supplies stay steady and work keeps moving smoothly.",
    },
    {
      question: "How do I place a bulk order?",
      answer:
        "Now and then, retailers take a look at what’s in stock. They might need large amounts - those requests go through without using the word and. Price checks happen before anything moves forward. After approval comes packing, done by the crew who know the shelves best. Dispatch dates appear once boxes are sealed. Shipping follows only when every detail is set.",
    },
    {
      question: "What payment options are available?",
      answer:
        "Paying by bank transfer works, while UPI stands as another option. Approved digital methods come through just fine, whereas certain business arrangements may allow tailored payment setups when relevant. Security wraps every transaction, keeping wholesale activity clear and steady behind the scenes.",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <div className="relative w-full h-30 sm:h-48 md:h-56 lg:h-72 xl:h-96 overflow-hidden flex flex-col items-center justify-center border-b border-gray-100">
        <img
          src="/images/faq.webp"
          alt="FAQ"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* <div className="absolute inset-0 bg-black/20"></div> */}

        <div className="relative z-10 text-center px-4">
          <h1 className="text-xl md:text-4xl font-bold text-white">
            Frequently Asked Questions
          </h1>
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
