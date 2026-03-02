import React from "react";
import { Link } from "react-router-dom";

const ReturnPolicy = () => {
  const sections = [
    {
      id: "personal-info",
      title: " Inspection at Delivery",
      content: (
        <div className="space-y-4">
          <p>
            Fresh off the truck, items need a quick check by store staff. Should
            something seem off - missing pieces, dents, scratches - a note goes
            straight to the driver on site. Mistakes caught then stay documented
            right away. Problems left unmentioned at drop-off lose their voice
            later. The clock starts ticking once the vehicle pulls up.
          </p>
        </div>
      ),
    },
    {
      id: "snap",
      title: "Eligible Returns",
      content: (
        <div className="space-y-4">
          <p>
            When something arrives broken, flawed, or wrong, it might qualify
            for return - if noticed right when delivered. Only items showing
            issues upon arrival can be sent back. Problems must show up the
            moment the package is opened. If it's damaged or not what was
            ordered, there's a chance to send it back immediately. A product
            needs clear faults visible at handover to count. Returns happen
            solely when defects appear on delivery day.
          </p>
        </div>
      ),
    },
    {
      id: "other-info",
      title: "Non-Returnable Items",
      content: (
        <div className="space-y-4">
          <p>
            A fresh batch of products might head back only if problems show up
            later. When something arrives with no note about condition, it stays
            put unless flaws appear clear. Quality checks decide the fate of
            groceries and similar things.
          </p>
        </div>
      ),
    },
    {
      id: "links",
      title: "Return Approval Process",
      content: (
        <div className="space-y-4">
          <p>
            Each request to send something back must pass a quick check inside
            the system. When accepted, you might get a new item instead, an
            account update, or your money back - depends on how things are set
            up.
          </p>
        </div>
      ),
    },
    {
      id: "security",
      title: "Final Decision",
      content: (
        <div className="space-y-4">
          <p>
            Aone Go Basket gets to look over every return request before
            deciding what happens next. The call on whether a return works out
            comes solely from them after their review.
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
        {/* <div className="absolute inset-0 bg-white/70"></div> */}

        <div className="relative z-10 text-center">
          <h1 className="text-xl md:text-4xl font-bold text-gray-900 mb-2">
            Return Policy
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

export default ReturnPolicy;
