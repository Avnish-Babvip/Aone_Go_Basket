import React, { useEffect, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getFaq } from "../features/actions/cms";

const FAQPage = () => {
  const dispatch = useDispatch();
  const { faqData, cmsLoading } = useSelector((state) => state.cms);

  const [openIndex, setOpenIndex] = useState(null);
  const faq = (Array.isArray(faqData?.faq_items) && faqData?.faq_items) || [];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    dispatch(getFaq());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      {/* ================= BANNER ================= */}
      <div className="relative w-full h-30 sm:h-48 md:h-56 lg:h-72 xl:h-96 overflow-hidden flex items-center justify-center border-b border-gray-100">
        {cmsLoading ? (
          <div className="w-full h-full bg-gray-200 animate-pulse" />
        ) : (
          <>
            <img
              src={`${import.meta.env.VITE_REACT_APP_IMAGE_URL_2}/${faqData?.banner_bg_image}`}
              alt="FAQ"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-10 text-center px-4">
              <h1 className="text-xl md:text-4xl font-bold text-white">
                {faqData?.banner_title}
              </h1>
            </div>
          </>
        )}
      </div>

      {/* ================= FAQ SECTION ================= */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {cmsLoading ? (
          <FullFaqSkeleton />
        ) : (
          <div className="space-y-4">
            {faq.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-6 text-left group"
                >
                  <span
                    className={`text-lg font-semibold ${
                      openIndex === index ? "text-brand-green" : "text-gray-800"
                    }`}
                  >
                    {item.question}
                  </span>

                  <BiChevronRight
                    className={`transition-transform ${
                      openIndex === index
                        ? "rotate-90 text-brand-green"
                        : "text-gray-400"
                    }`}
                    size={20}
                  />
                </button>

                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    openIndex === index
                      ? "max-h-40 pb-6 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQPage;

const FullFaqSkeleton = () => {
  return (
    <div className="space-y-4">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white border border-gray-100 rounded-lg shadow-sm p-6 animate-pulse"
        >
          <div className="flex justify-between items-center">
            {/* Question */}
            <div className="h-5 w-3/4 bg-gray-200 rounded"></div>

            {/* Arrow */}
            <div className="h-5 w-5 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
