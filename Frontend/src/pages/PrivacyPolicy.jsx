import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  const sections = [
    {
      id: "personal-info",
      title: "Personal Information",
      content: (
        <div className="space-y-4">
          <p>
            Aone Go Basket is a brand of Aone Go Basket Private Ltd. We honor
            the privacy of our retail services and gather the business and
            contact data to fulfill the bulk orders and dispatch operations,
            enhance the services, and provide wholesale coordination.
          </p>
          <p>
            In case you are working in an area where certain data protection
            laws are applicable, the rights and compliance requirements will be
            followed depending on applicable regulations.
          </p>
        </div>
      ),
    },
    {
      id: "snap",
      title: "Customer Advisory",
      content: (
        <div className="space-y-4">
          <p>
            This Privacy Policy should be read and comprehended by retail
            partners prior to making bulk orders and using our platform. The
            ongoing use of our services implies that we have accepted the terms
            and the working conditions in this policy.
          </p>
        </div>
      ),
    },
    {
      id: "other-info",
      title: "Other Information",
      content: (
        <div className="space-y-4">
          <p>
            To provide operational efficiency, we can automatically gather a
            small amount of technical data about them, which includes device
            information, type of browser, IP address, and history of interaction
            with our platform, and use it to analyze internally and improve our
            work.
          </p>
          <p className="font-semibold text-gray-900 bg-gray-50 p-3 border-l-4 border-brand-green">
            Some technical data, such as device IP, where necessary, can be
            provided to authorized service providers with the purpose of
            logistics coordination, security watch, and performance of
            operations.
          </p>
        </div>
      ),
    },
    {
      id: "links",
      title: "Links",
      content: (
        <div className="space-y-4">
          <p>
            Our site might include links to other third-party sites or partner
            websites that are capable of collecting identifiable information.
            Aone Go Basket does not control the privacy of the external
            platforms.
          </p>
        </div>
      ),
    },
    {
      id: "security",
      title: "Security",
      content: (
        <div className="space-y-4">
          <p>
            The Company has adequate technical, administrative, and operating
            controls to ensure that retailer information is not accessed,
            misused, or lost by an unauthorized individual. Only authorized
            staff can have access to sensitive business information to process
            orders and to manage the services.
          </p>
          <p className="text-brand-green font-medium">
            It is important to note that Aone Go Basket will not seek
            confidential financial information via email or telecommunication
            platforms, including passwords, OTPs, and banking information.
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
          src="/images/return-policy.webp"
          alt="Privacy Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-10 text-center">
          <h1 className="text-xl md:text-4xl font-bold text-gray-900 mb-2">
            Privacy Policy
          </h1>
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

export default PrivacyPolicy;
