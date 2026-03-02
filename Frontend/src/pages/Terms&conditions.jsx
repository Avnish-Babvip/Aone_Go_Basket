import React from "react";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  const sections = [
    {
      id: "personal-info",
      title: "Order Acceptance",
      content: (
        <div className="space-y-4">
          <p>
            Most big orders through Aone Go Basket depend on what's actually in
            stock - nothing moves without a green light. Our team checks each
            request first, then signs off before anything gets packed. Only
            after that does processing begin.
          </p>
        </div>
      ),
    },
    {
      id: "snap",
      title: "Pricing & Payment",
      content: (
        <div className="space-y-4">
          <p>
            Because orders are large, prices shift with supply trends. Before
            items ship, payment needs to go through official channels or be
            settled according to company agreements - unless something else was
            set earlier.
          </p>
        </div>
      ),
    },
    {
      id: "other-info",
      title: "Dispatch & Delivery",
      content: (
        <div className="space-y-4">
          <p>
            Packed fresh each morning, the warehouse crew prepares every order
            with care. Once ready, a trusted rider takes it out for delivery.
            Timing shifts based on where you are, how big the order is, or what
            day it lands in the system.
          </p>
        </div>
      ),
    },
    {
      id: "links",
      title: "Risk & Responsibility",
      content: (
        <div className="space-y-4">
          <p>
            After delivery happens, whoever gets the items - store staff or an
            approved person - takes charge. The moment they confirm receipt,
            control shifts their way.
          </p>
        </div>
      ),
    },
    {
      id: "security",
      title: "Limitation of Liability",
      content: (
        <div className="space-y-4">
          <p>
            Aone Go Basket isn’t responsible when things take longer because of
            problems they can’t manage - shipping hiccups, for instance, or
            items running out. When outside forces interfere, accountability
            doesn’t apply. Unpredictable events shift outcomes, yet blame stays
            elsewhere. Delays happen. They just do. Not every snag comes from
            within.
          </p>
        </div>
      ),
    },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Adjusted offset for mobile (smaller) and desktop
      const offset = window.innerWidth < 768 ? 160 : 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white mt-20 text-gray-700">
      {/* HEADER */}
      <div className="relative w-full h-16 sm:h-24 md:h-32 lg:h-50 xl:h-56 overflow-hidden flex flex-col items-center justify-center border-b border-gray-100">
        <img
          src="/images/terms-conditions.webp"
          alt="Privacy Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-10 text-center">
          <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
            Terms & Conditions
          </h1>
          {/* <div className="flex items-center justify-center text-sm text-gray-500">
            <Link to={"/"} className="hover:text-brand-green">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Privacy</span>
          </div> */}
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-10 md:py-16 flex flex-col md:flex-row gap-8 md:gap-12">
        {/* RESPONSIVE TABS / SIDEBAR */}
        <aside className="w-full md:w-1/4">
          <nav className="sticky top-0 md:top-28 z-20 bg-white border-b md:border-b-0 md:border-l border-gray-200">
            {/* Horizontal Scroll on Mobile, Vertical List on Desktop */}
            <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible no-scrollbar whitespace-nowrap md:whitespace-normal py-2 md:py-0">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="px-5 py-3 text-xs md:text-sm font-semibold text-gray-600 hover:text-brand-green hover:bg-lime-50 border-b-2 md:border-b-0 md:border-l-2 border-transparent hover:border-brand-green transition-all flex-shrink-0"
                >
                  {section.title}
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* CONTENT */}
        <main className="w-full md:w-3/4 space-y-16 md:space-y-20">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-36 md:scroll-mt-32"
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">
                {section.title}
              </h2>
              <div className="text-sm md:text-base leading-relaxed text-gray-600">
                {section.content}
              </div>
            </section>
          ))}

          {/* FOOTER */}
          <div className="mt-20 pt-12 border-t border-gray-100 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Be Safe, Be Secure
            </h3>
            <p className="text-sm text-gray-600 max-w-3xl mx-auto mb-8">
              Aone Go Basket strives to have a secure, transparent, and
              professionally controlled wholesale grocery distribution channel
              backed by responsible technology and credible working procedures.
            </p>
            <p className="text-base md:text-lg font-semibold">
              Media contacts:{" "}
              <a
                href="mailto:info@aonegobasket.com"
                className="text-brand-green hover:underline"
              >
                info@aonegobasket.com
              </a>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TermsAndConditions;
