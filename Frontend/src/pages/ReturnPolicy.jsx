import React from "react";
import { Link } from "react-router-dom";

const ReturnPolicy = () => {
  const sections = [
    {
      id: "personal-info",
      title: "Personal Information",
      content: (
        <div className="space-y-4">
          <p>
            "A One Go Basket" is a trademark of A One Go Basket Private Limited
            ("Company")...
          </p>
          <p>
            If you are a California resident, the information below also applies
            to you (CCPA).
          </p>
        </div>
      ),
    },
    {
      id: "snap",
      title: "Snap",
      content: (
        <div className="space-y-4">
          <p>
            Customer are advised to read and understand our Privacy Policy
            carefully...
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
            We may automatically track certain information about you based upon
            your behavior on the website...
          </p>
          <p className="font-semibold text-gray-900 bg-gray-50 p-3 border-l-4 border-brand-green">
            We may also share your Mobile IP/Device IP with third party(ies)...
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
            Our website/app may link to other websites that may collect
            personally identifiable information...
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
            To protect against the loss, misuse and alteration of the
            information under its control...
          </p>
          <p className="text-brand-green font-medium">
            Please note that the Company will not ask you to share any sensitive
            data via email or telephone.
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
    <div className="min-h-screen bg-white mt-15 text-gray-700">
      {/* HEADER */}
      <div className="relative w-full h-44 md:h-56 overflow-hidden flex flex-col items-center justify-center border-b border-gray-100">
        <img
          src="/images/Banner-bg-2.jpg"
          alt="Privacy Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/70"></div>

        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Return Policy
          </h1>
          <div className="flex items-center justify-center text-sm text-gray-500">
            <Link to={"/"} className="hover:text-brand-green">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Privacy</span>
          </div>
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
              Be safe, be secure!!
            </h3>
            <p className="text-sm text-gray-600 max-w-3xl mx-auto mb-8">
              A One Go Basket is leading the charge in transforming India's
              vast, unorganized grocery landscape.
            </p>
            <p className="text-base md:text-lg font-semibold">
              Media enquiries:{" "}
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

export default ReturnPolicy;
